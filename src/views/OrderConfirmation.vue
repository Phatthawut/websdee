<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Success Header -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ getSuccessTitle() }}
        </h1>

        <p class="text-gray-600">
          {{ getSuccessMessage() }}
        </p>

        <!-- Reference Number -->
        <div v-if="referenceNumber" class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>{{ $t("payment.reference") }}:</strong>
            <span class="font-mono ml-2">{{ referenceNumber }}</span>
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="mt-4 flex justify-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbc646]"
          ></div>
        </div>
      </div>

      <!-- Order Summary -->
      <div
        v-if="orderDetails"
        class="bg-white rounded-lg shadow-lg mb-6 overflow-hidden"
      >
        <div class="bg-[#051d40] text-white p-4">
          <h2 class="text-lg font-semibold">
            {{ $t("orderConfirmation.orderSummary") }}
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Customer Information -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">
                {{ $t("orderConfirmation.customerInfo") }}
              </h3>
              <div class="space-y-2 text-sm">
                <div v-if="orderDetails.customer?.name">
                  <strong>{{ $t("payment.form.name") }}:</strong>
                  {{ orderDetails.customer.name }}
                </div>
                <div v-if="orderDetails.customer?.email">
                  <strong>{{ $t("payment.form.email") }}:</strong>
                  {{ orderDetails.customer.email }}
                </div>
                <div v-if="orderDetails.customer?.phone">
                  <strong>{{ $t("payment.form.phone") }}:</strong>
                  {{ orderDetails.customer.phone }}
                </div>
                <div v-if="orderDetails.customer?.company">
                  <strong>{{ $t("payment.form.company") }}:</strong>
                  {{ orderDetails.customer.company }}
                </div>
              </div>
            </div>

            <!-- Package Information -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">
                {{ $t("orderConfirmation.packageInfo") }}
              </h3>
              <div class="space-y-2 text-sm">
                <div v-if="orderDetails.order?.package_name">
                  <strong>{{ $t("payment.package") }}:</strong>
                  {{ orderDetails.order.package_name }}
                </div>
                <div v-if="orderDetails.order?.payment_type">
                  <strong>{{ $t("orderConfirmation.paymentType") }}:</strong>
                  {{ getPaymentTypeText(orderDetails.order.payment_type) }}
                </div>
                <div
                  v-if="orderDetails.order?.final_amount || orderDetails.amount"
                >
                  <strong>{{ $t("payment.amount") }}:</strong>
                  {{
                    formatCurrency(
                      orderDetails.order?.final_amount || orderDetails.amount
                    )
                  }}
                </div>
                <div
                  v-if="
                    orderDetails.order?.addons_selected &&
                    orderDetails.order.addons_selected.length > 0
                  "
                >
                  <strong>{{ $t("orderConfirmation.addons") }}:</strong>
                  {{
                    Array.isArray(orderDetails.order.addons_selected)
                      ? orderDetails.order.addons_selected.join(", ")
                      : orderDetails.order.addons_selected
                  }}
                </div>
                <div v-if="orderDetails.customer?.requirements" class="mt-3">
                  <strong>{{ $t("payment.form.requirements") }}:</strong>
                  <p class="mt-1 text-gray-600">
                    {{ orderDetails.customer.requirements }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method Specific Content -->

      <!-- Stripe Payment Success -->
      <div
        v-if="isStripePayment"
        class="bg-white rounded-lg shadow-lg mb-6 p-6"
      >
        <div class="text-center">
          <div
            class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ $t("orderConfirmation.paymentCompleted") }}
          </h3>
          <p class="text-gray-600">
            {{ $t("orderConfirmation.stripeSuccess") }}
          </p>
        </div>
      </div>

      <!-- Bank Transfer Instructions -->
      <div
        v-if="isBankTransfer"
        class="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
      >
        <!-- Amount Section -->
        <div class="bg-[#051d40] text-white p-6 text-center">
          <h2 class="text-lg font-semibold mb-2">
            {{ $t("bankTransfer.amountToTransfer") }}
          </h2>
          <div class="text-3xl font-bold">
            {{ formatCurrency(getTransferAmount()) }}
          </div>
          <p class="text-sm opacity-80 mt-1">
            {{ $t("bankTransfer.thai") }}
          </p>
        </div>

        <!-- Bank Details Section -->
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ $t("bankTransfer.bankAccountDetails") }}
          </h3>

          <div class="space-y-4">
            <!-- Bank Name -->
            <div class="flex items-start">
              <span class="text-gray-600 w-24 flex-shrink-0 text-sm">
                {{ $t("bankTransfer.bank") }}:
              </span>
              <div class="flex-1">
                <p class="font-medium text-gray-900">
                  {{
                    locale === "th" ? bankDetails.nameTH : bankDetails.nameEN
                  }}
                </p>
                <p class="text-sm text-gray-600">
                  {{
                    locale === "th"
                      ? bankDetails.branchTH
                      : bankDetails.branchEN
                  }}
                </p>
              </div>
            </div>

            <!-- Account Name -->
            <div class="flex items-center">
              <span class="text-gray-600 w-24 flex-shrink-0 text-sm">
                {{ $t("bankTransfer.accountName") }}:
              </span>
              <p class="font-medium text-gray-900">
                {{
                  locale === "th"
                    ? bankDetails.accountNameTH
                    : bankDetails.accountNameEN
                }}
              </p>
            </div>

            <!-- Account Number -->
            <div class="flex items-center">
              <span class="text-gray-600 w-24 flex-shrink-0 text-sm">
                {{ $t("bankTransfer.accountNumber") }}:
              </span>
              <div class="flex-1 flex items-center">
                <p class="font-mono text-xl font-bold text-[#051d40] mr-3">
                  {{ bankDetails.accountNumber }}
                </p>
                <button
                  @click="copyToClipboard(bankDetails.accountNumber)"
                  class="p-2 text-gray-400 hover:text-[#051d40] transition-colors rounded"
                  :title="$t('bankTransfer.copy')"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions Section -->
        <div class="px-6 pb-6">
          <h4 class="font-semibold text-gray-900 mb-3">
            {{ $t("bankTransfer.transferInstructions") }}
          </h4>
          <div class="space-y-3">
            <div class="flex items-start">
              <span
                class="bg-[#051d40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0"
              >
                1
              </span>
              <p class="text-gray-700">
                {{ getTransferInstruction(1) }}
              </p>
            </div>
            <div class="flex items-start">
              <span
                class="bg-[#051d40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0"
              >
                2
              </span>
              <p class="text-gray-700">
                {{ getTransferInstruction(2) }}
              </p>
            </div>
            <div class="flex items-start">
              <span
                class="bg-[#051d40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0"
              >
                3
              </span>
              <p class="text-gray-700">
                {{ getTransferInstruction(3) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="bg-blue-50 p-6">
          <h4 class="font-semibold text-blue-900 mb-3">
            📱 {{ $t("bankTransfer.sendTransferSlip") }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center">
              <span class="text-blue-800 font-medium mr-2">📧 Email:</span>
              <a
                href="mailto:payment@websdee.com"
                class="text-blue-600 hover:text-blue-800"
              >
                payment@websdee.com
              </a>
            </div>
            <div class="flex items-center">
              <span class="text-blue-800 font-medium mr-2">📱 Line:</span>
              <a
                href="https://lin.ee/2CKfvTq"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 underline"
              >
                @298zsfkg
              </a>
            </div>
          </div>
          <div class="mt-3 p-3 bg-white rounded border-l-4 border-blue-400">
            <p class="text-sm text-blue-800">
              <strong>{{ $t("orderConfirmation.includeInMessage") }}:</strong>
              {{ getPackageInfo() }}
            </p>
          </div>
        </div>

        <!-- Important Notice -->
        <div class="bg-yellow-50 border-t border-yellow-200 p-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-yellow-800">
                {{ $t("bankTransfer.important") }}
              </h4>
              <p class="mt-1 text-sm text-yellow-700">
                {{ $t("orderConfirmation.workStartNotice") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="space-y-3">
          <!-- Save Instructions (Bank Transfer Only) -->
          <div v-if="isBankTransfer" class="space-y-2">
            <!-- Primary Action: Download PDF -->
            <button
              @click="downloadPDF"
              class="w-full bg-[#fbc646] text-[#051d40] font-semibold py-3 px-4 rounded-lg hover:bg-[#fbc646]/90 transition-colors"
            >
              📄 {{ $t("orderConfirmation.downloadPDF") }}
            </button>

            <!-- Secondary Actions -->
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="downloadTextFile"
                class="bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                📝 {{ $t("orderConfirmation.downloadText") }}
              </button>
              <button
                @click="copyAllDetails"
                class="bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                📋 {{ $t("orderConfirmation.copyAll") }}
              </button>
            </div>
          </div>

          <!-- Return Home -->
          <router-link
            to="/"
            class="block w-full bg-[#051d40] text-white text-center py-3 px-4 rounded-lg hover:bg-[#051d40]/90 transition-colors"
          >
            {{ $t("payment.returnHome") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLanguage } from "@/composables/useLanguage";
import { usePaymentStore } from "@/stores/paymentStore";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { locale: currentLocale } = useLanguage();
const paymentStore = usePaymentStore();

const isLoading = ref(true);

// Determine payment method from URL or payment store
const paymentMethod = computed(() => {
  // Check URL parameters first
  if (route.query.payment_method) {
    return route.query.payment_method;
  }

  // Check for Stripe session_id
  if (route.query.session_id) {
    return "stripe";
  }

  // Check payment store
  if (paymentStore.currentPaymentDetails?.payment_method) {
    return paymentStore.currentPaymentDetails.payment_method;
  }

  // Default based on available data
  return route.query.amount ? "bank_transfer" : "stripe";
});

const isStripePayment = computed(() => paymentMethod.value === "stripe");
const isBankTransfer = computed(() => paymentMethod.value === "bank_transfer");

// Get order details from payment store or URL
const orderDetails = computed(() => {
  if (paymentStore.currentPaymentDetails) {
    return paymentStore.currentPaymentDetails;
  }

  // Fallback to URL parameters for bank transfer
  if (isBankTransfer.value && route.query.amount) {
    return {
      amount: parseInt(route.query.amount),
      order: {
        package_name: route.query.package || "Website Package",
        payment_type: route.query.type || "full",
        final_amount: parseInt(route.query.amount),
      },
      customer: {},
      payment_method: "bank_transfer",
    };
  }

  return null;
});

// Reference number
const referenceNumber = computed(() => {
  if (route.query.reference) {
    return route.query.reference;
  }

  if (paymentStore.currentPaymentDetails?.reference_number) {
    return paymentStore.currentPaymentDetails.reference_number;
  }

  if (paymentStore.currentPaymentDetails?.id) {
    return generateShortReferenceId(paymentStore.currentPaymentDetails.id);
  }

  return null;
});

// Bank details
const bankDetails = {
  nameTH: "ธนาคารทหารไทยธนชาต (TMB Bank)",
  nameEN: "TMB Bank (Thanachart Bank)",
  accountNumber: "621-2-54406-5",
  accountNameTH: "น.ส. พัชรีรัตน์ จันทวงศ์",
  accountNameEN: "Ms. Patchareeran Jantawong",
  branchTH: "เซ็นทรัลพลาซ่า เชียงใหม่ แอร์พอร์ต",
  branchEN: "Central Plaza Chiang Mai Airport",
};

// Methods
function getSuccessTitle() {
  if (isStripePayment.value) {
    return t("payment.successTitle");
  } else {
    return t("bankTransfer.transferComplete");
  }
}

function getSuccessMessage() {
  if (isStripePayment.value) {
    return t("payment.successMessage");
  } else {
    return t("bankTransfer.transferCompleteMessage");
  }
}

function getPaymentTypeText(paymentType) {
  if (paymentType === "full") {
    return locale.value === "th"
      ? "จ่ายเต็มจำนวน (ส่วนลด 5%)"
      : "Full Payment (5% Discount)";
  } else {
    return locale.value === "th" ? "มัดจำ 50%" : "50% Deposit";
  }
}

function getTransferAmount() {
  return (
    orderDetails.value?.amount || orderDetails.value?.order?.final_amount || 0
  );
}

function getTransferInstruction(step) {
  const amount = formatCurrency(getTransferAmount());

  switch (step) {
    case 1:
      return locale.value === "th"
        ? `โอนเงินจำนวน ${amount} ไปยังบัญชีข้างต้น`
        : `Transfer ${amount} to the above account`;
    case 2:
      return locale.value === "th"
        ? "ถ่ายรูปสลิปการโอนเงินหรือบันทึกหน้าจอ"
        : "Take a photo of the transfer slip or screenshot";
    case 3:
      return locale.value === "th"
        ? "ส่งสลิปพร้อมระบุชื่อแพ็กเกจมาที่เรา"
        : "Send the slip with package name to us";
    default:
      return "";
  }
}

function getPackageInfo() {
  const packageName =
    orderDetails.value?.order?.package_name ||
    route.query.package ||
    "Website Package";
  const paymentType =
    orderDetails.value?.order?.payment_type || route.query.type || "full";
  const paymentText = getPaymentTypeText(paymentType);

  return `${packageName} (${paymentText})`;
}

function generateShortReferenceId(fullId) {
  if (!fullId) return "";

  const prefix = fullId.substring(0, 4);
  const suffix = fullId.substring(fullId.length - 6);

  return `${prefix}-${suffix}`;
}

function formatCurrency(amount) {
  // Handle Stripe format (cents to whole units)
  const formattedAmount = amount > 10000 ? amount / 100 : amount;

  return new Intl.NumberFormat(locale.value === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(formattedAmount);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy:", err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

// Generate formatted text for all save functions
function generateInstructionsText() {
  const amount = formatCurrency(getTransferAmount());
  const packageInfo = getPackageInfo();
  const refNumber = referenceNumber.value || "N/A";

  return {
    title:
      locale.value === "th"
        ? "ข้อมูลการโอนเงิน WebsDee"
        : "WebsDee Bank Transfer Details",
    content: `
${
  locale.value === "th"
    ? "ข้อมูลการโอนเงิน WebsDee"
    : "WebsDee Bank Transfer Details"
}
${"=".repeat(50)}

${locale.value === "th" ? "หมายเลขอ้างอิง" : "Reference Number"}: ${refNumber}
${locale.value === "th" ? "แพ็กเกจ" : "Package"}: ${packageInfo}
${locale.value === "th" ? "จำนวนเงิน" : "Amount"}: ${amount}

${locale.value === "th" ? "ข้อมูลบัญชีปลายทาง" : "Bank Account Details"}:
${"-".repeat(30)}
${locale.value === "th" ? "ธนาคาร" : "Bank"}: ${
      locale.value === "th" ? bankDetails.nameTH : bankDetails.nameEN
    }
${locale.value === "th" ? "ชื่อบัญชี" : "Account Name"}: ${
      locale.value === "th"
        ? bankDetails.accountNameTH
        : bankDetails.accountNameEN
    }
${locale.value === "th" ? "เลขบัญชี" : "Account Number"}: ${
      bankDetails.accountNumber
    }
${locale.value === "th" ? "สาขา" : "Branch"}: ${
      locale.value === "th" ? bankDetails.branchTH : bankDetails.branchEN
    }

${locale.value === "th" ? "วิธีการโอนเงิน" : "Transfer Instructions"}:
${"-".repeat(30)}
1. ${getTransferInstruction(1)}
2. ${getTransferInstruction(2)}
3. ${getTransferInstruction(3)}

${locale.value === "th" ? "ส่งสลิปการโอนมาที่" : "Send transfer slip to"}:
📧 Email: payment@websdee.com
📱 Line: @298zsfkg

${locale.value === "th" ? "หมายเหตุ" : "Note"}: ${
      locale.value === "th"
        ? "เราจะเริ่มงานภายใน 24 ชั่วโมงหลังได้รับการยืนยันการชำระเงิน"
        : "We will start work within 24 hours after payment confirmation"
    }
`.trim(),
  };
}

// Download as PDF
function downloadPDF() {
  try {
    const instructionsData = generateInstructionsText();

    // Create a new window for PDF content
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${instructionsData.title}</title>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            line-height: 1.6;
          }
          h1 { 
            color: #051d40; 
            border-bottom: 2px solid #fbc646;
            padding-bottom: 10px;
          }
          .highlight { 
            background: #fbc646; 
            padding: 2px 6px; 
            border-radius: 3px;
            font-weight: bold;
          }
          .section { 
            margin: 20px 0; 
            padding: 15px;
            border-left: 4px solid #051d40;
            background: #f9f9f9;
          }
          .contact { 
            background: #e3f2fd; 
            padding: 15px; 
            border-radius: 5px;
            margin: 20px 0;
          }
          pre { 
            white-space: pre-wrap; 
            font-family: inherit;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${instructionsData.title}</h1>
        <div class="section">
          <pre>${instructionsData.content}</pre>
        </div>
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="background: #fbc646; color: #051d40; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px;">
            📄 ${
              locale.value === "th"
                ? "พิมพ์ / บันทึก PDF"
                : "Print / Save as PDF"
            }
          </button>
          <button onclick="window.close()" style="background: #051d40; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; margin-left: 10px;">
            ${locale.value === "th" ? "ปิด" : "Close"}
          </button>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();

    // Auto-trigger print dialog after content loads
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  } catch (error) {
    console.error("Error creating PDF:", error);
    // Fallback to text download
    downloadTextFile();
  }
}

// Download as text file
function downloadTextFile() {
  try {
    const instructionsData = generateInstructionsText();
    const blob = new Blob([instructionsData.content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `websdee-transfer-details-${
      referenceNumber.value || Date.now()
    }.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading text file:", error);
    // Fallback to copy to clipboard
    copyAllDetails();
  }
}

// Copy all details to clipboard
function copyAllDetails() {
  try {
    const instructionsData = generateInstructionsText();
    copyToClipboard(instructionsData.content);

    // Show visual feedback (you can enhance this with a toast notification)
    console.log("Bank transfer details copied to clipboard");
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
}

// Initialize page data
onMounted(async () => {
  try {
    if (isStripePayment.value) {
      // Handle Stripe payment
      const sessionId = route.query.session_id;

      if (sessionId) {
        paymentStore.paymentStatus = "succeeded";

        // Create initial payment details
        const orderData = {
          status: "succeeded",
          amount: 0,
          currency: "thb",
          id: sessionId,
          payment_method: "stripe",
          customer: { name: "", email: "", phone: "" },
          order: { payment_type: "", package_name: "" },
          metadata: {},
        };

        paymentStore.setCurrentPaymentDetails(orderData);

        // Try to retrieve session details
        try {
          const sessionDetails = await paymentStore.retrieveSessionDetails(
            sessionId
          );

          if (sessionDetails) {
            const updatedOrderData = {
              ...orderData,
              amount: sessionDetails.amount_total || 0,
              customer: {
                name: sessionDetails.metadata?.customer_name || "",
                email: sessionDetails.metadata?.customer_email || "",
                phone: sessionDetails.metadata?.customer_phone || "",
              },
              order: {
                payment_type: sessionDetails.metadata?.payment_type || "",
                package_name: sessionDetails.metadata?.package_name || "",
                final_amount: sessionDetails.amount_total || 0,
              },
              metadata: sessionDetails.metadata || {},
            };

            paymentStore.setCurrentPaymentDetails(updatedOrderData);
          }
        } catch (error) {
          console.error("Error retrieving session details:", error);
        }

        // Store payment data in Firestore
        await paymentStore.storePaymentData(
          sessionId,
          null,
          paymentStore.currentPaymentDetails
        );
      }
    } else if (isBankTransfer.value) {
      // Bank transfer is already handled by the payment store
      // Data should already be in currentPaymentDetails
    }
  } catch (error) {
    console.error("Error initializing order confirmation:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
