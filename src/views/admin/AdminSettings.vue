<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600">
        Configure your website settings and preferences
      </p>
    </div>

    <!-- Coming Soon Card -->
    <div class="bg-white rounded-lg shadow p-8 text-center">
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Settings Coming Soon
      </h3>
      <p class="text-gray-500">
        Website settings and configuration options will be available here in
        future updates.
      </p>
    </div>

    <!-- Placeholder Feature Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6 opacity-60">
        <div class="flex items-center mb-4">
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
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
              ></path>
            </svg>
          </div>
          <h4 class="ml-3 text-lg font-medium text-gray-900">
            Site Configuration
          </h4>
        </div>
        <p class="text-gray-500">
          Manage site title, description, and basic settings.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6 opacity-60">
        <div class="flex items-center mb-4">
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
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-6v2m0-12V5a2 2 0 012-2h2"
              ></path>
            </svg>
          </div>
          <h4 class="ml-3 text-lg font-medium text-gray-900">Theme Settings</h4>
        </div>
        <p class="text-gray-500">
          Customize colors, fonts, and visual appearance.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6 opacity-60">
        <div class="flex items-center mb-4">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
          <h4 class="ml-3 text-lg font-medium text-gray-900">Security</h4>
        </div>
        <p class="text-gray-500">
          Manage authentication and security settings.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6 opacity-60">
        <div class="flex items-center mb-4">
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
                d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h4 class="ml-3 text-lg font-medium text-gray-900">Email Settings</h4>
        </div>
        <p class="text-gray-500">
          Configure email notifications and templates.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6 opacity-60">
        <div class="flex items-center mb-4">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <h4 class="ml-3 text-lg font-medium text-gray-900">Analytics</h4>
        </div>
        <p class="text-gray-500">
          View website traffic and performance metrics.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6 opacity-60">
        <div class="flex items-center mb-4">
          <div class="p-2 bg-indigo-100 rounded-lg">
            <svg
              class="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h4 class="ml-3 text-lg font-medium text-gray-900">
            Backup & Export
          </h4>
        </div>
        <p class="text-gray-500">Export data and manage backups.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Settings functionality will be implemented in future updates
</script>
