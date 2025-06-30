<template>
  <div class="p-6">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Payment Management</h1>
      <div class="flex space-x-2">
        <button
          @click="refreshPayments"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          :disabled="isLoading"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Refresh</span>
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            v-model="filters.status"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Payment Type
          </label>
          <select
            v-model="filters.paymentType"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="full">Full Payment</option>
            <option value="deposit">Deposit</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            v-model="filters.dateRange"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search by name, email, reference..."
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="isLoading" class="p-6 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading payments...</p>
      </div>

      <div v-else-if="filteredPayments.length === 0" class="p-6 text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="mt-2 text-gray-600">No payments found</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Package
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reference
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in filteredPayments" :key="payment.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ payment.customer?.name || "N/A" }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ payment.customer?.email || "N/A" }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ payment.order?.package_name || "N/A" }}
                </div>
                <div class="text-sm text-gray-500">
                  {{
                    payment.order?.payment_type === "full"
                      ? "Full Payment"
                      : "Deposit"
                  }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(
                      payment.order?.final_amount || payment.amount
                    )
                  }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800':
                      payment.status === 'succeeded',
                    'bg-yellow-100 text-yellow-800':
                      payment.status === 'processing',
                    'bg-red-100 text-red-800': payment.status === 'failed',
                  }"
                >
                  {{ payment.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(payment.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  payment.shortReferenceId ||
                  generateShortReferenceId(payment.id)
                }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="viewPaymentDetails(payment)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Details Modal -->
    <div
      v-if="selectedPayment"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="selectedPayment = null"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">Payment Details</h3>
          <button
            @click="selectedPayment = null"
            class="text-gray-400 hover:text-gray-600"
          >
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Customer Information -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-700 mb-3">
              Customer Information
            </h4>
            <div class="space-y-2">
              <div>
                <span class="text-sm font-medium text-gray-500">Name:</span>
                <p class="text-gray-800">
                  {{ selectedPayment.customer?.name || "N/A" }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Email:</span>
                <p class="text-gray-800">
                  {{ selectedPayment.customer?.email || "N/A" }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Phone:</span>
                <p class="text-gray-800">
                  {{ selectedPayment.customer?.phone || "N/A" }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Company:</span>
                <p class="text-gray-800">
                  {{ selectedPayment.metadata?.customer_company || "N/A" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Order Information -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-700 mb-3">Order Information</h4>
            <div class="space-y-2">
              <div>
                <span class="text-sm font-medium text-gray-500">Package:</span>
                <p class="text-gray-800">
                  {{ selectedPayment.order?.package_name || "N/A" }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500"
                  >Payment Type:</span
                >
                <p class="text-gray-800">
                  {{
                    selectedPayment.order?.payment_type === "full"
                      ? "Full Payment"
                      : "Deposit"
                  }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Amount:</span>
                <p class="text-gray-800">
                  {{
                    formatCurrency(
                      selectedPayment.order?.final_amount ||
                        selectedPayment.amount
                    )
                  }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Status:</span>
                <p
                  :class="{
                    'text-green-600': selectedPayment.status === 'succeeded',
                    'text-yellow-600': selectedPayment.status === 'processing',
                    'text-red-600': selectedPayment.status === 'failed',
                  }"
                >
                  {{ selectedPayment.status }}
                </p>
              </div>
            </div>
          </div>

          <!-- Project Requirements -->
          <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <h4 class="font-semibold text-gray-700 mb-3">
              Project Requirements
            </h4>
            <p class="text-gray-800 whitespace-pre-wrap">
              {{
                selectedPayment.metadata?.project_requirements ||
                "No requirements specified"
              }}
            </p>
          </div>

          <!-- Payment Details -->
          <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <h4 class="font-semibold text-gray-700 mb-3">Payment Details</h4>
            <div class="space-y-2">
              <div>
                <span class="text-sm font-medium text-gray-500"
                  >Reference ID:</span
                >
                <p class="text-gray-800">
                  {{
                    selectedPayment.shortReferenceId ||
                    generateShortReferenceId(selectedPayment.id)
                  }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Full ID:</span>
                <p class="text-gray-800 text-xs break-all">
                  {{ selectedPayment.id }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Date:</span>
                <p class="text-gray-800">
                  {{ formatDate(selectedPayment.created_at) }}
                </p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500"
                  >Payment Method:</span
                >
                <p class="text-gray-800">
                  {{ selectedPayment.metadata?.payment_method_type || "N/A" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="selectedPayment = null"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// State
const payments = ref([]);
const isLoading = ref(true);
const selectedPayment = ref(null);
const filters = ref({
  status: "",
  paymentType: "",
  dateRange: "all",
  search: "",
});

// Generate a short reference ID for display
function generateShortReferenceId(fullId) {
  if (!fullId) return "N/A";

  // Take first 4 characters and last 6 characters
  const prefix = fullId.substring(0, 4);
  const suffix = fullId.substring(fullId.length - 6);

  // Create a reference code in format XXX-XXXXXX
  return `${prefix}-${suffix}`;
}

// Format currency
function formatCurrency(amount) {
  if (!amount) return "฿0";

  // Check if amount is in cents (Stripe format) and convert to whole units
  // If amount > 10000, assume it's in cents and needs to be divided by 100
  const formattedAmount = amount > 10000 ? amount / 100 : amount;

  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(formattedAmount);
}

// Format date
function formatDate(timestamp) {
  if (!timestamp) return "N/A";

  // If timestamp is a Firestore timestamp, convert to JS Date
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Fetch payments from Firestore
async function fetchPayments() {
  isLoading.value = true;

  try {
    const db = getFirestore();
    const paymentsCollection = collection(db, "payments");
    const q = query(paymentsCollection, orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);

    const paymentsList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      paymentsList.push({
        id: doc.id,
        ...data,
        shortReferenceId: generateShortReferenceId(doc.id),
      });
    });

    payments.value = paymentsList;
  } catch (error) {
    console.error("Error fetching payments:", error);
  } finally {
    isLoading.value = false;
  }
}

// Refresh payments
function refreshPayments() {
  fetchPayments();
}

// View payment details
function viewPaymentDetails(payment) {
  selectedPayment.value = payment;
}

// Filter payments based on filters
const filteredPayments = computed(() => {
  let result = [...payments.value];

  // Filter by status
  if (filters.value.status) {
    result = result.filter((p) => p.status === filters.value.status);
  }

  // Filter by payment type
  if (filters.value.paymentType) {
    result = result.filter(
      (p) => p.order?.payment_type === filters.value.paymentType
    );
  }

  // Filter by date range
  if (filters.value.dateRange !== "all") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    result = result.filter((p) => {
      if (!p.created_at) return false;

      const paymentDate = p.created_at.toDate
        ? p.created_at.toDate()
        : new Date(p.created_at);

      switch (filters.value.dateRange) {
        case "today":
          return paymentDate >= today;
        case "week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return paymentDate >= weekStart;
        case "month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          return paymentDate >= monthStart;
        case "year":
          const yearStart = new Date(today.getFullYear(), 0, 1);
          return paymentDate >= yearStart;
        default:
          return true;
      }
    });
  }

  // Filter by search term
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    result = result.filter(
      (p) =>
        (p.customer?.name || "").toLowerCase().includes(searchTerm) ||
        (p.customer?.email || "").toLowerCase().includes(searchTerm) ||
        (p.id || "").toLowerCase().includes(searchTerm) ||
        (p.shortReferenceId || "").toLowerCase().includes(searchTerm) ||
        (p.order?.package_name || "").toLowerCase().includes(searchTerm)
    );
  }

  return result;
});

// Fetch payments on component mount
onMounted(() => {
  fetchPayments();
});
</script>
