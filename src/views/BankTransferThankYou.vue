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
          {{ $t("bankTransfer.transferComplete") }}
        </h1>
        <p class="text-gray-600">
          {{ $t("bankTransfer.transferCompleteMessage") }}
        </p>
        <div
          v-if="route.query.reference"
          class="mt-4 p-3 bg-blue-50 rounded-lg"
        >
          <p class="text-sm text-blue-800">
            <strong
              >{{
                locale === "th" ? "หมายเลขอ้างอิง" : "Reference Number"
              }}:</strong
            >
            <span class="font-mono ml-2">{{ route.query.reference }}</span>
          </p>
        </div>
      </div>

      <!-- Order Summary -->
      <div
        v-if="orderDetails"
        class="bg-white rounded-lg shadow-lg mb-6 overflow-hidden"
      >
        <div class="bg-[#051d40] text-white p-4">
          <h2 class="text-lg font-semibold">
            {{ locale === "th" ? "รายละเอียดการสั่งซื้อ" : "Order Summary" }}
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Customer Information -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">
                {{ locale === "th" ? "ข้อมูลลูกค้า" : "Customer Information" }}
              </h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>{{ locale === "th" ? "ชื่อ" : "Name" }}:</strong>
                  {{ orderDetails.customer.name }}
                </div>
                <div>
                  <strong>{{ locale === "th" ? "อีเมล" : "Email" }}:</strong>
                  {{ orderDetails.customer.email }}
                </div>
                <div>
                  <strong>{{ locale === "th" ? "โทรศัพท์" : "Phone" }}:</strong>
                  {{ orderDetails.customer.phone }}
                </div>
                <div v-if="orderDetails.customer.company">
                  <strong>{{ locale === "th" ? "บริษัท" : "Company" }}:</strong>
                  {{ orderDetails.customer.company }}
                </div>
              </div>
            </div>

            <!-- Package Information -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">
                {{ locale === "th" ? "แพ็กเกจที่เลือก" : "Selected Package" }}
              </h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong
                    >{{ locale === "th" ? "แพ็กเกจ" : "Package" }}:</strong
                  >
                  {{ orderDetails.order.package_name }}
                </div>
                <div>
                  <strong
                    >{{
                      locale === "th" ? "ประเภทการชำระ" : "Payment Type"
                    }}:</strong
                  >
                  {{
                    orderDetails.order.payment_type === "full"
                      ? locale === "th"
                        ? "จ่ายเต็มจำนวน (ส่วนลด 5%)"
                        : "Full Payment (5% Discount)"
                      : locale === "th"
                      ? "มัดจำ 50%"
                      : "50% Deposit"
                  }}
                </div>
                <div
                  v-if="
                    orderDetails.order.addons_selected &&
                    orderDetails.order.addons_selected.length > 0
                  "
                >
                  <strong
                    >{{ locale === "th" ? "บริการเสริม" : "Add-ons" }}:</strong
                  >
                  {{ orderDetails.order.addons_selected.join(", ") }}
                </div>
                <div v-if="orderDetails.customer.requirements" class="mt-3">
                  <strong
                    >{{
                      locale === "th" ? "ความต้องการพิเศษ" : "Requirements"
                    }}:</strong
                  >
                  <p class="mt-1 text-gray-600">
                    {{ orderDetails.customer.requirements }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bank Transfer Instructions Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Amount Section -->
        <div class="bg-[#051d40] text-white p-6 text-center">
          <h2 class="text-lg font-semibold mb-2">
            {{ $t("bankTransfer.amountToTransfer") }}
          </h2>
          <div class="text-3xl font-bold">
            {{ formatCurrency(transferInfo.amount) }}
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
                    locale === "th"
                      ? transferInfo.bankName
                      : transferInfo.bankNameEN
                  }}
                </p>
                <p class="text-sm text-gray-600">
                  {{
                    locale === "th"
                      ? transferInfo.branch
                      : transferInfo.branchEN
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
                    ? transferInfo.accountName
                    : transferInfo.accountNameEN
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
                  {{ transferInfo.accountNumber }}
                </p>
                <button
                  @click="copyToClipboard(transferInfo.accountNumber)"
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
                {{
                  locale === "th"
                    ? `โอนเงินจำนวน ${formatCurrency(
                        transferInfo.amount
                      )} ไปยังบัญชีข้างต้น`
                    : `Transfer ${formatCurrency(
                        transferInfo.amount
                      )} to the above account`
                }}
              </p>
            </div>
            <div class="flex items-start">
              <span
                class="bg-[#051d40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0"
              >
                2
              </span>
              <p class="text-gray-700">
                {{
                  locale === "th"
                    ? "ถ่ายรูปสลิปการโอนเงินหรือบันทึกหน้าจอ"
                    : "Take a photo of the transfer slip or screenshot"
                }}
              </p>
            </div>
            <div class="flex items-start">
              <span
                class="bg-[#051d40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0"
              >
                3
              </span>
              <p class="text-gray-700">
                {{
                  locale === "th"
                    ? "ส่งสลิปพร้อมระบุชื่อแพ็กเกจมาที่เรา"
                    : "Send the slip with package name to us"
                }}
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
              <span class="text-blue-800">@websdee</span>
            </div>
          </div>
          <div class="mt-3 p-3 bg-white rounded border-l-4 border-blue-400">
            <p class="text-sm text-blue-800">
              <strong
                >{{
                  locale === "th" ? "ระบุในข้อความ" : "Include in message"
                }}:</strong
              >
              {{ transferInfo.packageName }}
              ({{
                transferInfo.paymentType === "full"
                  ? locale === "th"
                    ? "จ่ายเต็มจำนวน"
                    : "Full Payment"
                  : locale === "th"
                  ? "มัดจำ 50%"
                  : "50% Deposit"
              }})
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
                {{
                  locale === "th"
                    ? "เราจะเริ่มงานภายใน 24 ชั่วโมงหลังได้รับการยืนยันการชำระเงิน กรุณาเก็บสลิปการโอนเงินไว้เป็นหลักฐาน"
                    : "We will start work within 24 hours after payment confirmation. Please keep your transfer slip as proof of payment"
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="p-6 bg-gray-50 space-y-3">
          <button
            @click="saveInstructions"
            class="w-full bg-[#fbc646] text-[#051d40] font-semibold py-3 px-4 rounded-lg hover:bg-[#fbc646]/90 transition-colors"
          >
            📱 {{ $t("bankTransfer.saveToPhone") }}
          </button>

          <button
            @click="goHome"
            class="w-full bg-[#051d40] text-white py-3 px-4 rounded-lg hover:bg-[#051d40]/90 transition-colors"
          >
            {{ $t("payment.returnHome") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLanguage } from "@/composables/useLanguage";
import { usePaymentStore } from "@/stores/paymentStore";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { locale: currentLocale } = useLanguage();
const paymentStore = usePaymentStore();

// Get transfer information from route query params
const transferInfo = computed(() => {
  return {
    bankName: "ธนาคารทหารไทยธนชาต (TMB Bank)",
    bankNameEN: "TMB Bank (Thanachart Bank)",
    accountNumber: "621-2-54406-5",
    accountName: "น.ส. พัชรีรัตน์ จันทวงศ์",
    accountNameEN: "Ms. Patchareeran Jantawong",
    branch: "เซ็นทรัลพลาซ่า เชียงใหม่ แอร์พอร์ต",
    branchEN: "Central Plaza Chiang Mai Airport",
    amount: parseInt(route.query.amount) || 0,
    packageName: route.query.package || "Website Package",
    paymentType: route.query.type || "full",
  };
});

// Get order details from payment store
const orderDetails = computed(() => {
  return paymentStore.currentPaymentDetails;
});

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat(locale.value === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // You can add a toast notification here
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
};

// Save instructions to phone
const saveInstructions = () => {
  const text = `
${
  locale.value === "th"
    ? "ข้อมูลการโอนเงิน WebsDee"
    : "WebsDee Bank Transfer Details"
}

${locale.value === "th" ? "ธนาคาร" : "Bank"}: ${
    locale.value === "th"
      ? transferInfo.value.bankName
      : transferInfo.value.bankNameEN
  }
${locale.value === "th" ? "ชื่อบัญชี" : "Account Name"}: ${
    locale.value === "th"
      ? transferInfo.value.accountName
      : transferInfo.value.accountNameEN
  }
${locale.value === "th" ? "เลขบัญชี" : "Account Number"}: ${
    transferInfo.value.accountNumber
  }
${locale.value === "th" ? "จำนวนเงิน" : "Amount"}: ${formatCurrency(
    transferInfo.value.amount
  )}
${locale.value === "th" ? "แพ็กเกจ" : "Package"}: ${
    transferInfo.value.packageName
  }

${locale.value === "th" ? "ส่งสลิปมาที่" : "Send slip to"}:
📧 Email: payment@websdee.com
📱 Line: @websdee
  `.trim();

  // Try to use Web Share API if available (mobile devices)
  if (navigator.share) {
    navigator.share({
      title:
        locale.value === "th"
          ? "ข้อมูลการโอนเงิน WebsDee"
          : "WebsDee Bank Transfer Details",
      text: text,
    });
  } else {
    // Fallback: copy to clipboard
    copyToClipboard(text);
  }
};

// Go back to home
const goHome = () => {
  router.push("/");
};

// Redirect to home if no transfer info
onMounted(() => {
  if (!route.query.amount) {
    router.push("/");
  }
});
</script>
