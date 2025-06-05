<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
        <p class="text-gray-600">Manage user roles and permissions</p>
      </div>
      <div class="flex items-center space-x-2 text-sm text-gray-500">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Admin access required</span>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Total Users</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats.total }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Active Users</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats.active }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Pending</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats.pending }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Admins</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats.admins }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search Users</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or email..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Filter by Role</label
          >
          <select
            v-model="roleFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="loading" class="p-6">
        <div class="animate-pulse space-y-4">
          <div v-for="i in 5" :key="i" class="flex space-x-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredUsers.length === 0" class="p-12 text-center">
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p class="text-gray-500">No users match your search criteria.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Login
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Joined
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="user in filteredUsers"
              :key="user.uid"
              class="hover:bg-gray-50"
            >
              <!-- User Info -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-4">
                  <img
                    :src="user.photoURL || '/default-avatar.png'"
                    :alt="user.displayName"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">
                      {{ user.displayName || "No Name" }}
                    </h4>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getRoleClass(user.role)"
                >
                  {{ user.role || "pending" }}
                </span>
              </td>

              <!-- Last Login -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastLoginAt) }}
              </td>

              <!-- Joined Date -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <!-- Role Selector -->
                  <select
                    :value="user.role"
                    @change="updateUserRole(user, $event.target.value)"
                    :disabled="
                      user.uid === authStore.user?.uid ||
                      updatingUsers.includes(user.uid)
                    "
                    class="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="pending">Pending</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>

                  <!-- Loading indicator -->
                  <div v-if="updatingUsers.includes(user.uid)" class="w-4 h-4">
                    <div
                      class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"
                    ></div>
                  </div>

                  <!-- Current user indicator -->
                  <span
                    v-if="user.uid === authStore.user?.uid"
                    class="text-xs text-blue-600 font-medium"
                  >
                    (You)
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Info Card -->
    <div class="bg-blue-50 rounded-lg p-6">
      <div class="flex items-start">
        <svg
          class="w-5 h-5 text-blue-600 mr-3 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h4 class="text-sm font-medium text-blue-900 mb-1">
            User Role Management
          </h4>
          <div class="text-sm text-blue-700 space-y-1">
            <p>
              <strong>Pending:</strong> New users waiting for approval. They can
              sign in but cannot access admin features.
            </p>
            <p>
              <strong>Editor:</strong> Can create, edit, and manage articles.
              Cannot manage users.
            </p>
            <p>
              <strong>Admin:</strong> Full access to all features including user
              management.
            </p>
            <p class="mt-2 text-blue-600">
              <strong>Note:</strong> You cannot change your own role for
              security reasons.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase.js";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();
const loading = ref(true);
const users = ref([]);
const searchQuery = ref("");
const roleFilter = ref("");
const updatingUsers = ref([]);

const userStats = computed(() => {
  const total = users.value.length;
  const active = users.value.filter(
    (u) => u.role === "admin" || u.role === "editor"
  ).length;
  const pending = users.value.filter((u) => u.role === "pending").length;
  const admins = users.value.filter((u) => u.role === "admin").length;

  return { total, active, pending, admins };
});

const filteredUsers = computed(() => {
  let filtered = users.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.displayName?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
    );
  }

  // Role filter
  if (roleFilter.value) {
    filtered = filtered.filter((user) => user.role === roleFilter.value);
  }

  return filtered.sort((a, b) => {
    // Sort by role priority: admin, editor, pending, then by name
    const roleOrder = { admin: 0, editor: 1, pending: 2 };
    const aOrder = roleOrder[a.role] ?? 3;
    const bOrder = roleOrder[b.role] ?? 3;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return (a.displayName || a.email).localeCompare(b.displayName || b.email);
  });
});

const loadUsers = async () => {
  try {
    loading.value = true;
    const snapshot = await getDocs(collection(db, "users"));
    users.value = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading users:", error);
  } finally {
    loading.value = false;
  }
};

const updateUserRole = async (user, newRole) => {
  if (user.uid === authStore.user?.uid) {
    alert("You cannot change your own role for security reasons.");
    return;
  }

  if (!["pending", "editor", "admin"].includes(newRole)) {
    alert("Invalid role selected.");
    return;
  }

  try {
    updatingUsers.value.push(user.uid);

    const permissions = {
      pending: [],
      editor: ["read", "write"],
      admin: ["read", "write", "delete", "manage_users"],
    };

    await updateDoc(doc(db, "users", user.uid), {
      role: newRole,
      permissions: permissions[newRole],
      updatedAt: serverTimestamp(),
    });

    // Update local state
    const userIndex = users.value.findIndex((u) => u.uid === user.uid);
    if (userIndex !== -1) {
      users.value[userIndex].role = newRole;
      users.value[userIndex].permissions = permissions[newRole];
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    alert("Failed to update user role. Please try again.");
  } finally {
    updatingUsers.value = updatingUsers.value.filter((uid) => uid !== user.uid);
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Never";

  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getRoleClass = (role) => {
  const classes = {
    admin: "bg-purple-100 text-purple-800",
    editor: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  return classes[role] || classes.pending;
};

onMounted(() => {
  loadUsers();
});
</script>
