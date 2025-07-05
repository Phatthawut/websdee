import { defineStore } from "pinia";
import { ref, computed } from "vue";
import stripeService from "@/services/stripeService";
import { db } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";
import secureLogger from "@/utils/secureLogger";

export const usePaymentStore = defineStore("payment", () => {
  // State
  const customerInfo = ref({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirements: "",
  });
  const selectedPackage = ref(null);
  const paymentType = ref("full"); // 'full' or 'deposit'
  const selectedAddons = ref([]);
  const paymentMethod = ref("promptpay");
  const isProcessing = ref(false);
  const paymentStatus = ref("");
  const paymentHistory = ref([]);
  const currentPaymentDetails = ref(null);

  // Getters
  const baseAmount = computed(() => {
    if (!selectedPackage.value) return 0;
    return (
      selectedPackage.value.basePrice ||
      parseFloat(selectedPackage.value.price?.replace(/[฿,]/g, "")) ||
      0
    );
  });

  const addonsTotal = computed(() => {
    return selectedAddons.value.reduce((total, addonId) => {
      const addon = availableAddons.value.find((a) => a.id === addonId);
      if (addon) {
        const price = addon.price.replace(/[฿,\/ปีต่อหน้า]/g, "").split("/")[0];
        return total + parseInt(price);
      }
      return total;
    }, 0);
  });

  const vatAmount = computed(() => {
    // VAT is disabled, return 0
    return 0;
  });

  const totalAmount = computed(() => {
    let baseTotal = baseAmount.value + addonsTotal.value;

    // Apply discount for full payment
    if (paymentType.value === "full") {
      baseTotal = Math.round(baseTotal * 0.95); // 5% discount
      // No VAT calculation since VAT is disabled
      return baseTotal;
    } else {
      // For deposit, show 50% of total (no VAT)
      return Math.round(baseTotal * 0.5);
    }
  });

  const formattedTotalAmount = computed(() => {
    return stripeService.formatCurrency(totalAmount.value, "THB", "th-TH");
  });

  // Add a computed property specifically for deposit amount
  const depositAmount = computed(() => {
    const baseTotal = baseAmount.value + addonsTotal.value;
    return Math.round(baseTotal * 0.5); // 50% of base amount
  });

  // Add a computed property for full payment amount with discount
  const fullPaymentAmount = computed(() => {
    const baseTotal = baseAmount.value + addonsTotal.value;
    return Math.round(baseTotal * 0.95); // 5% discount
  });

  const availableAddons = ref([
    {
      id: "domain",
      title: "Domain Registration",
      description: "Get your custom domain (.com, .co.th)",
      price: "฿450/year",
    },
    {
      id: "extraPage",
      title: "Extra Page",
      description: "Additional page for your website",
      price: "฿590 each",
    },
  ]);

  // Actions
  function setCustomerInfo(info) {
    customerInfo.value = info;
  }

  function setSelectedPackage(pkg) {
    selectedPackage.value = pkg;
  }

  function setPaymentType(type) {
    paymentType.value = type;
  }

  function setPaymentMethod(method) {
    paymentMethod.value = method;
  }

  function toggleAddon(addonId) {
    const index = selectedAddons.value.indexOf(addonId);
    if (index >= 0) {
      selectedAddons.value.splice(index, 1);
    } else {
      selectedAddons.value.push(addonId);
    }
  }

  function setSelectedAddons(addons) {
    selectedAddons.value = addons;
  }

  async function processPayment() {
    isProcessing.value = true;

    try {
      // Create order metadata
      const orderMetadata = {
        // Customer Information
        customer_name: customerInfo.value.name,
        customer_email: customerInfo.value.email,
        customer_phone: customerInfo.value.phone,
        customer_company: customerInfo.value.company || "",
        project_requirements: customerInfo.value.requirements || "",

        // Order Details
        package_name: selectedPackage.value.title,
        package_type: selectedPackage.value.type || "web_development",
        payment_type: paymentType.value,
        base_amount: baseAmount.value,
        addons_total: addonsTotal.value,
        discount_applied: paymentType.value === "full" ? "5%" : "0%",
        vat_amount: vatAmount.value,
        final_amount: totalAmount.value,
        addons_selected: selectedAddons.value.join(","),

        // Business Information
        source: "websdee_website",
        region: "thailand",
        currency: "THB",
        order_date: new Date().toISOString(),

        // Order Status
        order_status:
          paymentType.value === "full" ? "paid_full" : "paid_deposit",
        delivery_status: "pending",
        project_status: "new",
      };

      // Process payment using stripeService
      await stripeService.processPayment({
        amount: totalAmount.value,
        currency: "thb",
        paymentType: paymentType.value,
        paymentMethodType: paymentMethod.value,
        metadata: orderMetadata,
      });

      // Note: Stripe will redirect to success page
      return true;
    } catch (error) {
      secureLogger.error("Payment processing failed", error);
      paymentStatus.value = "failed";
      throw error;
    } finally {
      isProcessing.value = false;
    }
  }

  async function storePaymentData(sessionId, paymentIntentId, orderData) {
    try {
      // Store payment data in Firestore via API
      const apiUrl =
        "https://asia-southeast1-websdee-blog.cloudfunctions.net/storePaymentData";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          paymentIntentId,
          orderData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to store payment data");
      }

      const result = await response.json();
      secureLogger.log("Payment data stored successfully", {
        status: "success",
      });
      return result;
    } catch (error) {
      secureLogger.error("Error storing payment data", error);
      throw error;
    }
  }

  async function storeBankTransferData() {
    try {
      // Generate a reference number
      const reference = `BT${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase()}`;

      // Create bank transfer record
      const bankTransferRecord = {
        // System information
        id: reference,
        reference_number: reference,
        payment_method: "bank_transfer",
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now

        // Transaction details
        amount: totalAmount.value,
        currency: "THB",
        payment_type: paymentType.value,
        vat_amount: vatAmount.value,
        vat_rate: "0%",
        base_amount: baseAmount.value,
        addons_total: addonsTotal.value,
        final_amount: totalAmount.value,
        discount_applied: paymentType.value === "full" ? "5%" : "0%",

        // Customer information
        customer: {
          name: customerInfo.value.name,
          email: customerInfo.value.email,
          phone: customerInfo.value.phone,
          company: customerInfo.value.company || "",
        },

        // Order information
        order: {
          package_name: selectedPackage.value.title,
          package_type: selectedPackage.value.type || "web_development",
          payment_type: paymentType.value,
          base_amount: baseAmount.value,
          addons_total: addonsTotal.value,
          discount_applied: paymentType.value === "full" ? "5%" : "0%",
          final_amount: totalAmount.value,
          addons_selected: selectedAddons.value,
          project_requirements: customerInfo.value.requirements || "",
          order_status: "pending_bank_transfer",
          delivery_status: "pending",
          project_status: "new",
        },

        // Bank transfer specific information
        bank_details: {
          bank_name: "ธนาคารทหารไทยธนชาต (TMB Bank)",
          account_name: "น.ส. พัชรีรัตน์ จันทวงศ์",
          account_number: "621-2-54406-5",
          branch: "เซ็นทรัลพลาซ่า เชียงใหม่ แอร์พอร์ต",
        },
      };

      // Store directly in Firestore payments collection
      const paymentRef = doc(db, "payments", reference);
      await setDoc(paymentRef, bankTransferRecord);

      // Create payment details for local storage
      const paymentDetails = {
        status: "pending",
        amount: totalAmount.value,
        currency: "THB",
        id: reference,
        reference_number: reference,
        payment_method: "bank_transfer",
        customer: {
          name: customerInfo.value.name,
          email: customerInfo.value.email,
          phone: customerInfo.value.phone,
          company: customerInfo.value.company,
          requirements: customerInfo.value.requirements,
        },
        order: {
          payment_type: paymentType.value,
          package_name: selectedPackage.value.title,
          final_amount: totalAmount.value,
          base_amount: baseAmount.value,
          addons_total: addonsTotal.value,
          addons_selected: selectedAddons.value,
        },
      };

      // Add to local payment history
      paymentHistory.value.push(paymentDetails);

      // Set current payment details
      currentPaymentDetails.value = paymentDetails;

      secureLogger.log("Bank transfer data stored successfully", { reference });
      return paymentDetails;
    } catch (error) {
      secureLogger.error("Error storing bank transfer data", error);
      throw error;
    }
  }

  // Generate a shorter reference ID from Stripe session ID or payment intent ID
  function generateShortReferenceId(fullId) {
    if (!fullId) return "";

    // Take first 4 characters and last 6 characters
    const prefix = fullId.substring(0, 4);
    const suffix = fullId.substring(fullId.length - 6);

    // Create a reference code in format XXX-XXXXXX
    return `${prefix}-${suffix}`;
  }

  async function retrieveSessionDetails(sessionId) {
    try {
      // For security reasons, we need to retrieve session details from our backend
      const apiUrl = `https://asia-southeast1-websdee-blog.cloudfunctions.net/getSessionDetails?session_id=${sessionId}`;

      secureLogger.logApiUrl("Retrieving session details from", apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        secureLogger.error("Failed to retrieve session details", {
          status: response.status,
          statusText: response.statusText,
        });
        throw new Error("Failed to retrieve session details");
      }

      const sessionDetails = await response.json();
      secureLogger.logPayment("Retrieved session details", sessionDetails);

      // Update current payment details
      if (sessionDetails) {
        const orderData = {
          status: "succeeded",
          amount: sessionDetails.amount_total,
          currency: sessionDetails.currency,
          id: sessionId,
          shortReferenceId: generateShortReferenceId(sessionId),
          customer: {
            name: sessionDetails.metadata?.customer_name || "",
            email: sessionDetails.metadata?.customer_email || "",
            phone: sessionDetails.metadata?.customer_phone || "",
          },
          order: {
            payment_type: sessionDetails.metadata?.payment_type || "",
            package_name: sessionDetails.metadata?.package_name || "",
            final_amount: sessionDetails.amount_total,
          },
          metadata: sessionDetails.metadata || {},
        };

        secureLogger.logPayment("Created order data from session", orderData);
        currentPaymentDetails.value = orderData;
        return orderData;
      }

      return null;
    } catch (error) {
      secureLogger.error("Error retrieving session details", error);
      return null;
    }
  }

  function reset() {
    customerInfo.value = {
      name: "",
      email: "",
      phone: "",
      company: "",
      requirements: "",
    };
    selectedPackage.value = null;
    paymentType.value = "full";
    selectedAddons.value = [];
    paymentMethod.value = "promptpay";
    isProcessing.value = false;
    paymentStatus.value = "";
  }

  function setCurrentPaymentDetails(details) {
    currentPaymentDetails.value = details;
  }

  return {
    // State
    customerInfo,
    selectedPackage,
    paymentType,
    selectedAddons,
    paymentMethod,
    isProcessing,
    paymentStatus,
    paymentHistory,
    currentPaymentDetails,
    availableAddons,

    // Getters
    baseAmount,
    addonsTotal,
    totalAmount,
    formattedTotalAmount,
    vatAmount,
    depositAmount,
    fullPaymentAmount,

    // Actions
    setCustomerInfo,
    setSelectedPackage,
    setPaymentType,
    setPaymentMethod,
    toggleAddon,
    setSelectedAddons,
    processPayment,
    storePaymentData,
    storeBankTransferData,
    retrieveSessionDetails,
    setCurrentPaymentDetails,
    reset,
  };
});
