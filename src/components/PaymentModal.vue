<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-[#051d40]">
          {{ $t("payment.title") }}
        </h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Stripe Configuration Warning -->
      <div
        v-if="!isStripeConfigured"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-red-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-red-600">
            {{
              locale.value === "th"
                ? "ระบบการชำระเงินยังไม่พร้อมใช้งาน"
                : "Payment system is not configured"
            }}
          </span>
        </div>
      </div>

      <!-- Form Error Alert -->
      <div
        v-if="formHasErrors"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-red-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-red-600">
            {{
              locale.value === "th"
                ? "กรุณากรอกข้อมูลให้ครบถ้วน"
                : "Please fill in all required fields"
            }}
          </span>
        </div>
      </div>

      <!-- Customer Information Form -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 class="font-semibold text-[#051d40] mb-4">
          {{ $t("payment.customerInfo") }}
        </h4>

        <div class="space-y-3">
          <!-- Customer Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("payment.form.name") }} *
            </label>
            <input
              v-model="paymentStore.customerInfo.name"
              type="text"
              novalidate
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#fbc646]"
              :class="
                validationErrors.name ? 'border-red-500' : 'border-gray-300'
              "
              :placeholder="
                locale.value === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'
              "
              @blur="validateField('name')"
            />
            <p v-if="validationErrors.name" class="mt-1 text-sm text-red-600">
              {{ validationErrors.name }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("payment.form.email") }} *
            </label>
            <input
              v-model="paymentStore.customerInfo.email"
              type="email"
              novalidate
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#fbc646]"
              :class="
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              "
              :placeholder="locale.value === 'th' ? 'อีเมล' : 'Email Address'"
              @blur="validateField('email')"
            />
            <p v-if="validationErrors.email" class="mt-1 text-sm text-red-600">
              {{ validationErrors.email }}
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("payment.form.phone") }} *
            </label>
            <input
              v-model="paymentStore.customerInfo.phone"
              type="tel"
              novalidate
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#fbc646]"
              :class="
                validationErrors.phone ? 'border-red-500' : 'border-gray-300'
              "
              :placeholder="
                locale.value === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'
              "
              @blur="validateField('phone')"
            />
            <p v-if="validationErrors.phone" class="mt-1 text-sm text-red-600">
              {{ validationErrors.phone }}
            </p>
          </div>

          <!-- Company Name (Optional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("payment.form.company") }}
            </label>
            <input
              v-model="paymentStore.customerInfo.company"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fbc646]"
              :placeholder="
                locale.value === 'th'
                  ? 'ชื่อบริษัท (ถ้ามี)'
                  : 'Company Name (Optional)'
              "
            />
          </div>

          <!-- Project Requirements -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("payment.form.requirements") }}
            </label>
            <textarea
              v-model="paymentStore.customerInfo.requirements"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fbc646]"
              :placeholder="
                locale.value === 'th'
                  ? 'รายละเอียดโปรเจค ความต้องการพิเศษ'
                  : 'Project details, special requirements'
              "
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Package Info -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 class="font-semibold text-[#051d40] mb-2">
          {{ packageData.title }}
        </h4>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-[#fbc646]">
            {{ packageData.price }}
          </span>
          <span class="text-sm text-gray-600">
            {{ $t("packages.vatIncluded") }}
          </span>
        </div>
      </div>

      <!-- Payment Options -->
      <div class="mb-6">
        <h5 class="font-semibold mb-3">{{ $t("payment.options.full") }}</h5>

        <!-- Full Payment Option -->
        <div
          class="border-2 rounded-lg p-4 mb-3 cursor-pointer transition-colors"
          :class="
            paymentStore.paymentType === 'full'
              ? 'border-[#fbc646] bg-yellow-50'
              : 'border-gray-200'
          "
          @click="selectPaymentType('full')"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center">
                <input
                  type="radio"
                  :checked="paymentStore.paymentType === 'full'"
                  class="text-[#fbc646] mr-2"
                  readonly
                />
                <span class="font-medium">{{
                  $t("payment.options.full")
                }}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">
                {{ $t("payment.options.fullNote") }}
              </p>
            </div>
            <div class="text-right">
              <div class="font-bold text-lg">{{ fullPaymentAmount }}</div>
              <div class="text-xs text-gray-500 line-through">
                {{ originalAmount }}
              </div>
            </div>
          </div>
        </div>

        <!-- Deposit Payment Option -->
        <div
          class="border-2 rounded-lg p-4 mb-3 cursor-pointer transition-colors"
          :class="
            paymentStore.paymentType === 'deposit'
              ? 'border-[#fbc646] bg-yellow-50'
              : 'border-gray-200'
          "
          @click="selectPaymentType('deposit')"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center">
                <input
                  type="radio"
                  :checked="paymentStore.paymentType === 'deposit'"
                  class="text-[#fbc646] mr-2"
                  readonly
                />
                <span class="font-medium">{{
                  $t("payment.options.deposit")
                }}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">
                {{ $t("payment.options.depositNote") }}
              </p>
            </div>
            <div class="text-right">
              <div class="font-bold text-lg">{{ depositAmount }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add-ons Section -->
      <div v-if="paymentStore.availableAddons.length > 0" class="mb-6">
        <h5 class="font-semibold mb-3">{{ $t("addons.title") }}</h5>
        <div class="space-y-2">
          <div
            v-for="addon in paymentStore.availableAddons"
            :key="addon.id"
            class="flex items-center justify-between p-3 border rounded-lg"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :id="`addon-${addon.id}`"
                v-model="paymentStore.selectedAddons"
                :value="addon.id"
                class="text-[#fbc646] mr-3"
              />
              <div>
                <label
                  :for="`addon-${addon.id}`"
                  class="font-medium cursor-pointer"
                >
                  {{ addon.title }}
                </label>
                <p class="text-sm text-gray-600">{{ addon.description }}</p>
              </div>
            </div>
            <span class="font-semibold">{{ addon.price }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="mb-6">
        <h5 class="font-semibold mb-3">
          {{ $t("payment.methods.promptpay") }}
        </h5>
        <div class="grid grid-cols-1 gap-2">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            class="border-2 rounded-lg p-3 cursor-pointer transition-colors flex items-center"
            :class="
              paymentStore.paymentMethod === method.id
                ? 'border-[#fbc646] bg-yellow-50'
                : validationErrors.payment
                ? 'border-red-300'
                : 'border-gray-200'
            "
            @click="selectPaymentMethod(method.id)"
          >
            <span class="text-2xl mr-3">{{ method.icon }}</span>
            <div class="flex-1">
              <div class="font-medium">{{ getCurrentMethodName(method) }}</div>
              <div
                v-if="method.popular"
                class="text-sm text-[#fbc646] font-medium"
              >
                {{ locale.value === "th" ? "แนะนำ" : "Popular" }}
              </div>
            </div>
            <input
              type="radio"
              :checked="paymentStore.paymentMethod === method.id"
              class="text-[#fbc646]"
              readonly
            />
          </div>
        </div>
        <p v-if="validationErrors.payment" class="mt-1 text-sm text-red-600">
          {{ validationErrors.payment }}
        </p>
      </div>

      <!-- Total Amount with VAT Breakdown -->
      <div class="bg-[#051d40] text-white rounded-lg p-4 mb-6">
        <!-- Subtotal (Base + Add-ons) -->
        <div class="flex justify-between items-center text-sm mb-2">
          <span>{{ locale.value === "th" ? "ยอดรวม" : "Subtotal" }}:</span>
          <span>{{
            stripeService.formatCurrency(
              paymentStore.baseAmount + paymentStore.addonsTotal,
              "THB",
              locale.value === "th" ? "th-TH" : "en-US"
            )
          }}</span>
        </div>

        <!-- Discount (if applicable) -->
        <div
          v-if="paymentStore.paymentType === 'full'"
          class="flex justify-between items-center text-sm mb-2 text-green-300"
        >
          <span
            >{{ locale.value === "th" ? "ส่วนลด 5%" : "5% Discount" }}:</span
          >
          <span
            >-{{
              stripeService.formatCurrency(
                Math.round(
                  (paymentStore.baseAmount + paymentStore.addonsTotal) * 0.05
                ),
                "THB",
                locale.value === "th" ? "th-TH" : "en-US"
              )
            }}</span
          >
        </div>

        <!-- Subtotal after discount -->
        <div
          v-if="paymentStore.paymentType === 'full'"
          class="flex justify-between items-center text-sm mb-2"
        >
          <span
            >{{
              locale.value === "th" ? "ยอดหลังหักส่วนลด" : "After Discount"
            }}:</span
          >
          <span>{{
            stripeService.formatCurrency(
              Math.round(
                (paymentStore.baseAmount + paymentStore.addonsTotal) * 0.95
              ),
              "THB",
              locale.value === "th" ? "th-TH" : "en-US"
            )
          }}</span>
        </div>

        <!-- VAT (hidden since VAT is disabled) -->
        <!--
        <div class="flex justify-between items-center text-sm mb-2">
          <span
            >{{
              locale.value === "th" ? "ภาษีมูลค่าเพิ่ม 7%" : "VAT 7%"
            }}:</span
          >
          <span>{{
            stripeService.formatCurrency(
              paymentStore.vatAmount,
              "THB",
              locale.value === "th" ? "th-TH" : "en-US"
            )
          }}</span>
        </div>
        -->

        <!-- Divider -->
        <div class="border-t border-gray-400 my-2"></div>

        <!-- Final Total -->
        <div class="flex justify-between items-center">
          <span class="font-semibold">
            {{
              paymentStore.paymentType === "full"
                ? locale.value === "th"
                  ? "ยอดชำระทั้งหมด"
                  : "Total Payment"
                : locale.value === "th"
                ? "มัดจำ 50%"
                : "50% Deposit"
            }}:
          </span>
          <span class="text-xl font-bold">{{ totalAmount }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button
          @click.prevent="processPayment"
          :disabled="
            !paymentStore.paymentMethod ||
            paymentStore.isProcessing ||
            !isStripeConfigured
          "
          class="w-full bg-[#fbc646] text-[#051d40] font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="paymentStore.isProcessing">{{
            $t("payment.processing")
          }}</span>
          <span v-else>
            {{
              paymentStore.paymentType === "full"
                ? $t("packages.starter.payNow")
                : $t("packages.starter.payDeposit")
            }}
          </span>
        </button>

        <button
          @click="closeModal"
          class="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-300"
        >
          {{ $t("cancel") || "Cancel" }}
        </button>
      </div>

      <!-- Stripe Elements will be mounted here for card payments -->
      <div
        id="stripe-card-element"
        v-show="paymentStore.paymentMethod === 'card'"
        class="mt-4"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import stripeService from "@/services/stripeService";
import { usePaymentStore } from "@/stores/paymentStore";
import { useLanguage } from "@/composables/useLanguage";
import { trackEvent, trackPayment } from "@/utils/analyticsUtils";

const props = defineProps({
  isOpen: Boolean,
  packageData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "payment-success", "payment-error"]);

const { t, locale } = useI18n();
const router = useRouter();

// Use payment store
const paymentStore = usePaymentStore();

// Track if form has any errors (for displaying the error alert)
const formHasErrors = computed(() => {
  return Object.values(validationErrors).some((error) => error !== "");
});

// Watch for package data changes
watch(
  () => props.packageData,
  (newPackage) => {
    if (newPackage) {
      paymentStore.setSelectedPackage(newPackage);
    }
  },
  { immediate: true }
);

// Check Stripe configuration
const isStripeConfigured = computed(() => stripeService.isStripeConfigured());

// Payment methods
const paymentMethods = ref(stripeService.getThaiPaymentMethods());

// Available add-ons
const availableAddons = ref([
  {
    id: "domain",
    title: t("addons.domain.title"),
    description: t("addons.domain.description"),
    price: t("addons.domain.price"),
  },
  {
    id: "extraPage",
    title: t("addons.extraPage.title"),
    description: t("addons.extraPage.description"),
    price: t("addons.extraPage.price"),
  },
]);

// Computed values
const baseAmount = computed(() => {
  // Use basePrice from packageData if available, otherwise extract from price string
  if (props.packageData.basePrice) {
    return props.packageData.basePrice;
  }
  const priceStr = props.packageData.price.replace(/[฿,]/g, "");
  return parseInt(priceStr) || 0;
});

const fullPaymentAmount = computed(() => {
  return stripeService.formatCurrency(
    paymentStore.fullPaymentAmount,
    "THB",
    locale.value === "th" ? "th-TH" : "en-US"
  );
});

const depositAmount = computed(() => {
  return stripeService.formatCurrency(
    paymentStore.depositAmount,
    "THB",
    locale.value === "th" ? "th-TH" : "en-US"
  );
});

const addonsTotal = computed(() => {
  // Calculate total for selected add-ons (base prices)
  return paymentStore.selectedAddons.reduce((total, addonId) => {
    const addon = availableAddons.value.find((a) => a.id === addonId);
    if (addon) {
      const price = addon.price.replace(/[฿,\/ปีต่อหน้า]/g, "").split("/")[0];
      return total + parseInt(price);
    }
    return total;
  }, 0);
});

// VAT calculations for display (currently disabled)
const vatAmount = computed(() => {
  // VAT is currently disabled, return 0
  return 0;
});

const totalAmount = computed(() => {
  return stripeService.formatCurrency(
    paymentStore.totalAmount,
    "THB",
    locale.value === "th" ? "th-TH" : "en-US"
  );
});

const originalAmount = computed(() => {
  const baseTotal = paymentStore.baseAmount + paymentStore.addonsTotal;
  return stripeService.formatCurrency(
    baseTotal,
    "THB",
    locale.value === "th" ? "th-TH" : "en-US"
  );
});

// Methods
const selectPaymentType = (type) => {
  paymentStore.setPaymentType(type);
};

const selectPaymentMethod = (methodId) => {
  paymentStore.setPaymentMethod(methodId);
  // Clear payment method validation error when a method is selected
  validationErrors.payment = "";
};

const getCurrentMethodName = (method) => {
  return locale.value === "th" ? method.nameTH : method.nameEN;
};

const closeModal = () => {
  emit("close");
};

// Add validation state
const validationErrors = reactive({
  name: "",
  email: "",
  phone: "",
  payment: "",
});

// Validate a specific field
const validateField = (field) => {
  switch (field) {
    case "name":
      if (!paymentStore.customerInfo.name.trim()) {
        validationErrors.name =
          locale.value === "th" ? "กรุณากรอกชื่อ" : "Please enter your name";
      } else {
        validationErrors.name = "";
      }
      break;
    case "email":
      if (!paymentStore.customerInfo.email.trim()) {
        validationErrors.email =
          locale.value === "th" ? "กรุณากรอกอีเมล" : "Please enter your email";
      } else if (!isValidEmail(paymentStore.customerInfo.email)) {
        validationErrors.email =
          locale.value === "th"
            ? "รูปแบบอีเมลไม่ถูกต้อง"
            : "Invalid email format";
      } else {
        validationErrors.email = "";
      }
      break;
    case "phone":
      if (!paymentStore.customerInfo.phone.trim()) {
        validationErrors.phone =
          locale.value === "th"
            ? "กรุณากรอกเบอร์โทรศัพท์"
            : "Please enter your phone number";
      } else if (!isValidPhone(paymentStore.customerInfo.phone)) {
        validationErrors.phone =
          locale.value === "th"
            ? "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง"
            : "Invalid phone number format";
      } else {
        validationErrors.phone = "";
      }
      break;
    case "payment":
      if (!paymentStore.paymentMethod) {
        validationErrors.payment =
          locale.value === "th"
            ? "กรุณาเลือกวิธีการชำระเงิน"
            : "Please select a payment method";
      } else {
        validationErrors.payment = "";
      }
      break;
  }
};

// Add validation methods
const validateForm = () => {
  // Validate each field
  validateField("name");
  validateField("email");
  validateField("phone");
  validateField("payment");

  // Check if any field has an error
  return !formHasErrors.value;
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation helper
const isValidPhone = (phone) => {
  // Allow Thai phone formats: 0812345678, 081-234-5678, +66812345678, etc.
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{9,10}$/;
  return phoneRegex.test(phone.replace(/[- ]/g, ""));
};

// Process payment
const processPayment = async () => {
  // Validate form before processing payment
  if (!validateForm()) {
    // Form is invalid, don't proceed
    trackEvent("payment_validation_failed", {
      errors: Object.keys(validationErrors).filter(
        (key) => validationErrors[key]
      ),
    });
    return;
  }

  // Handle bank transfer separately
  if (paymentStore.paymentMethod === "bank_transfer") {
    handleBankTransfer();
    return;
  }

  // Check if Stripe is configured
  if (!stripeService.isStripeConfigured()) {
    trackEvent("payment_system_not_configured");
    emit("payment-error", {
      message:
        locale.value === "th"
          ? "ระบบการชำระเงินยังไม่พร้อมใช้งาน กรุณาติดต่อผู้ดูแล"
          : "Payment system is not available. Please contact administrator.",
    });
    return;
  }

  try {
    // Show loading state
    paymentStore.isProcessing = true;

    // Track payment attempt
    trackEvent("payment_attempt", {
      package: props.packageData.title,
      payment_type: paymentStore.paymentType,
      payment_method: paymentStore.paymentMethod,
      amount: paymentStore.totalAmount,
      currency: "THB",
    });

    // Process payment using the store
    await paymentStore.processPayment();

    // Track successful payment
    trackPayment({
      transactionId: `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`,
      value: paymentStore.totalAmount,
      currency: "THB",
      paymentMethod: paymentStore.paymentMethod,
      items: [
        {
          id: props.packageData.id || "custom-package",
          name: props.packageData.title,
          category: "Website Package",
          price: paymentStore.totalAmount,
          quantity: 1,
        },
      ],
    });

    // Note: If successful, Stripe will redirect to the success page
    // This code will only execute if there's no redirect
    emit("payment-success", {
      packageData: props.packageData,
      paymentType: paymentStore.paymentType,
      addons: paymentStore.selectedAddons,
      totalAmount: paymentStore.totalAmount,
      customerInfo: paymentStore.customerInfo,
    });
  } catch (error) {
    console.error("Payment processing error:", error);

    // Track payment error
    trackEvent("payment_error", {
      error_message: error.message || "Unknown payment error",
      payment_method: paymentStore.paymentMethod,
      package: props.packageData.title,
    });

    emit("payment-error", {
      message:
        locale.value === "th"
          ? "การชำระเงินล้มเหลว กรุณาลองใหม่อีกครั้ง"
          : "Payment failed. Please try again.",
      error: error.message,
    });
  } finally {
    paymentStore.isProcessing = false;
  }
};

// Handle bank transfer
const handleBankTransfer = async () => {
  try {
    // Track bank transfer selection
    trackEvent("bank_transfer_selected", {
      package: props.packageData.title,
      payment_type: paymentStore.paymentType,
      amount: paymentStore.totalAmount,
      currency: "THB",
    });

    // Store bank transfer data in Firestore
    const paymentDetails = await paymentStore.storeBankTransferData();

    // Close the payment modal
    emit("close");

    // Redirect to unified order confirmation page with payment details
    router.push({
      name: "OrderConfirmation",
      query: {
        payment_method: "bank_transfer",
        amount: paymentStore.totalAmount,
        package: props.packageData.title,
        type: paymentStore.paymentType,
        reference: paymentDetails.reference_number,
      },
    });
  } catch (error) {
    console.error("Bank transfer error:", error);
    trackEvent("bank_transfer_error", {
      error_message: error.message || "Unknown bank transfer error",
    });

    emit("payment-error", {
      message:
        locale.value === "th"
          ? "เกิดข้อผิดพลาดในการแสดงข้อมูลการโอนเงิน"
          : "Error displaying bank transfer information.",
    });
  }
};

// Watch for modal open/close
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      // Reset form when modal opens
      paymentStore.setPaymentType("full");
      paymentStore.setPaymentMethod("promptpay");
      paymentStore.setSelectedAddons([]);
      paymentStore.isProcessing = false;

      // Reset validation errors
      validationErrors.name = "";
      validationErrors.email = "";
      validationErrors.phone = "";
      validationErrors.payment = "";
    }
  }
);
</script>

<style scoped>
/* Additional styles for better payment UI */
.payment-option {
  transition: all 0.2s ease;
}

.payment-option:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
