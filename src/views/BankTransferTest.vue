<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-8">Bank Transfer Test Page</h1>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Customer Information</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Name</label
          >
          <input
            v-model="customerInfo.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Your name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="customerInfo.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Your email"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Phone</label
          >
          <input
            v-model="customerInfo.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Your phone number"
          />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Package Selection</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="border rounded-lg p-4 cursor-pointer transition-colors"
          :class="
            selectedPackage?.id === pkg.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          "
          @click="selectPackage(pkg)"
        >
          <h3 class="font-bold text-lg">{{ pkg.title }}</h3>
          <p class="text-2xl font-bold text-blue-600">{{ pkg.price }}</p>
          <p class="text-sm text-gray-600">{{ pkg.description }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Payment Type</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="border rounded-lg p-4 cursor-pointer transition-colors"
          :class="
            paymentType === 'full'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          "
          @click="paymentType = 'full'"
        >
          <h3 class="font-bold">Full Payment</h3>
          <p class="text-sm text-gray-600">5% discount for full payment</p>
        </div>
        <div
          class="border rounded-lg p-4 cursor-pointer transition-colors"
          :class="
            paymentType === 'deposit'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          "
          @click="paymentType = 'deposit'"
        >
          <h3 class="font-bold">50% Deposit</h3>
          <p class="text-sm text-gray-600">Pay 50% now, 50% before delivery</p>
        </div>
      </div>
    </div>

    <div class="text-center space-y-4">
      <button
        @click="processBankTransfer"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        :disabled="!selectedPackage || isProcessing"
      >
        {{
          isProcessing ? "Processing..." : "Generate Bank Transfer Instructions"
        }}
      </button>

      <div class="pt-4">
        <p class="text-gray-600 mb-4">Or test the Thank You page directly:</p>
        <button
          @click="testThankYouPage"
          class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          :disabled="!selectedPackage"
        >
          Test Thank You Page
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePaymentStore } from "@/stores/paymentStore";

const router = useRouter();
const paymentStore = usePaymentStore();

// Customer information
const customerInfo = ref({
  name: "Test Customer",
  email: "test@example.com",
  phone: "0812345678",
});

// Available packages
const packages = ref([
  {
    id: "starter",
    title: "Starter Package",
    price: "฿3,000",
    basePrice: 3000,
    description: "Basic website with up to 5 pages",
  },
  {
    id: "ecommerce",
    title: "E-commerce Package",
    price: "฿4,500",
    basePrice: 4500,
    description: "Online store with product catalog",
  },
  {
    id: "premium",
    title: "Premium Package",
    price: "฿15,000",
    basePrice: 15000,
    description: "Full-featured website with custom design",
  },
]);

// Selected package and payment type
const selectedPackage = ref(null);
const paymentType = ref("full");
const isProcessing = ref(false);

// Select a package
const selectPackage = (pkg) => {
  selectedPackage.value = pkg;
};

// Process bank transfer
const processBankTransfer = async () => {
  if (!selectedPackage.value) return;

  isProcessing.value = true;

  try {
    // Update payment store with customer info and package
    paymentStore.setCustomerInfo(customerInfo.value);
    paymentStore.setSelectedPackage(selectedPackage.value);
    paymentStore.setPaymentType(paymentType.value);
    paymentStore.setPaymentMethod("bank_transfer");

    // Store bank transfer data in Firestore
    const paymentDetails = await paymentStore.storeBankTransferData();

    // Redirect to thank you page with payment details
    router.push({
      name: "BankTransferThankYou",
      query: {
        amount: paymentStore.totalAmount,
        package: selectedPackage.value.title,
        type: paymentType.value,
        reference: paymentDetails.reference_number,
      },
    });

    console.log("Bank transfer instructions generated successfully");
  } catch (error) {
    console.error("Error generating bank transfer instructions:", error);
  } finally {
    isProcessing.value = false;
  }
};

// Test thank you page directly
const testThankYouPage = () => {
  if (!selectedPackage.value) return;

  const amount =
    paymentType.value === "full"
      ? Math.round(selectedPackage.value.basePrice * 0.95) // 5% discount
      : Math.round(selectedPackage.value.basePrice * 0.5); // 50% deposit

  router.push({
    name: "BankTransferThankYou",
    query: {
      amount: amount,
      package: selectedPackage.value.title,
      type: paymentType.value,
    },
  });
};
</script>
