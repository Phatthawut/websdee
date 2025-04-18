<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Footer Top -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-4">
            <span class="text-xl font-bold text-white">WebsDee</span>
          </div>
          <p class="mb-4 pr-4">
            Providing innovative IT solutions for businesses of all sizes. Our
            expertise in technology helps drive your success.
          </p>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-blue-400 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a href="tel:0834755212" class="text-blue-300 hover:text-blue-200"
              >083 475 5212</a
            >
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Company</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/about"
                class="hover:text-white transition duration-300"
                >About Us</router-link
              >
            </li>
            <li>
              <router-link
                to="/page"
                class="hover:text-white transition duration-300"
                >Page</router-link
              >
            </li>
            <li>
              <router-link
                to="/careers"
                class="hover:text-white transition duration-300"
                >Careers</router-link
              >
            </li>
            <li>
              <router-link
                to="/partners"
                class="hover:text-white transition duration-300"
                >Partners</router-link
              >
            </li>
            <li>
              <router-link
                to="/blog"
                class="hover:text-white transition duration-300"
                >Blog</router-link
              >
            </li>
            <li>
              <router-link
                to="/case-studies"
                class="hover:text-white transition duration-300"
                >Case Studies</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Services</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/managed-it"
                class="hover:text-white transition duration-300"
                >Managed IT Services</router-link
              >
            </li>
            <li>
              <router-link
                to="/cloud"
                class="hover:text-white transition duration-300"
                >Cloud Computing</router-link
              >
            </li>
            <li>
              <router-link
                to="/cybersecurity"
                class="hover:text-white transition duration-300"
                >Cybersecurity Solutions</router-link
              >
            </li>
            <li>
              <router-link
                to="/consulting"
                class="hover:text-white transition duration-300"
                >IT Consulting</router-link
              >
            </li>
            <li>
              <router-link
                to="/software"
                class="hover:text-white transition duration-300"
                >Software Development</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Contact & Legal -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/privacy-policy"
                class="hover:text-white transition duration-300"
                >Privacy Policy</router-link
              >
            </li>
            <li>
              <router-link
                to="/terms"
                class="hover:text-white transition duration-300"
                >Terms of Use</router-link
              >
            </li>
            <li>
              <router-link
                to="/cookies"
                class="hover:text-white transition duration-300"
                >Cookie Policy</router-link
              >
            </li>
            <li>
              <router-link
                to="/sitemap"
                class="hover:text-white transition duration-300"
                >Sitemap</router-link
              >
            </li>
            <li>
              <router-link
                to="/contact"
                class="hover:text-white transition duration-300"
                >Contact Us</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="flex space-x-4 mb-8">
        <a
          href="#"
          class="text-gray-400 hover:text-white transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
            />
          </svg>
        </a>
        <a
          href="#"
          class="text-gray-400 hover:text-white transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            />
          </svg>
        </a>
        <a
          href="#"
          class="text-gray-400 hover:text-white transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
          </svg>
        </a>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 my-8"></div>

      <!-- Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p>
          &copy; {{ new Date().getFullYear() }} WebsDee. All rights reserved.
        </p>
        <p class="mt-4 md:mt-0">Designed by websdee.com</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional functionality needed for this component
</script>
