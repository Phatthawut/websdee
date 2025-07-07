<template>
  <WithBanner
    title="Cookie Policy"
    subtitle="Learn about how we use cookies and similar technologies on our website."
  />
  <div class="bg-white">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">
        {{ $t("policies.cookies.title") || "Cookie Policy" }}
      </h1>

      <div class="prose prose-blue mx-auto">
        <p class="text-gray-600 mb-8">
          Last Updated: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.cookies.introduction.title") || "Introduction" }}
          </h2>
          <p class="mb-4">
            This Cookie Policy explains how WebsDee ("we", "us", or "our") uses
            cookies and similar technologies when you visit our website. It
            explains what these technologies are and why we use them, as well as
            your rights to control our use of them.
          </p>
          <p>
            By using our website, you consent to the use of cookies in
            accordance with this Cookie Policy.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.cookies.whatAreCookies.title") || "What Are Cookies?"
            }}
          </h2>
          <p class="mb-4">
            Cookies are small text files that are placed on your device
            (computer, tablet, or mobile phone) when you visit a website. They
            are widely used to make websites work more efficiently and to
            provide information to website owners.
          </p>
          <p class="mb-4">
            Cookies can be "persistent" or "session" cookies. Persistent cookies
            remain on your device when you go offline, while session cookies are
            deleted as soon as you close your web browser.
          </p>
          <p>
            We also use similar technologies such as web beacons, pixel tags,
            and local storage to collect and store information about your use of
            our website.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.cookies.types.title") || "Types of Cookies We Use"
            }}
          </h2>

          <div class="space-y-6">
            <div class="bg-blue-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-3 text-blue-800">
                Essential Cookies
              </h3>
              <p class="mb-3">
                These cookies are necessary for the website to function and
                cannot be switched off in our systems. They are usually only set
                in response to actions made by you which amount to a request for
                services, such as setting your privacy preferences, logging in,
                or filling in forms.
              </p>
              <ul class="list-disc pl-6 space-y-1">
                <li>
                  <strong>Authentication cookies:</strong> To keep you logged in
                  and maintain your session
                </li>
                <li>
                  <strong>Security cookies:</strong> To protect against fraud
                  and ensure secure transactions
                </li>
                <li>
                  <strong>Functionality cookies:</strong> To remember your
                  preferences and settings
                </li>
              </ul>
            </div>

            <div class="bg-green-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-3 text-green-800">
                Analytics Cookies
              </h3>
              <p class="mb-3">
                These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our site. They help
                us to know which pages are the most and least popular and see
                how visitors move around the site.
              </p>
              <ul class="list-disc pl-6 space-y-1">
                <li>
                  <strong>Google Analytics:</strong> To analyze website usage
                  and performance
                </li>
                <li>
                  <strong>Firebase Analytics:</strong> To understand user
                  behavior and app performance
                </li>
              </ul>
            </div>

            <div class="bg-yellow-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-3 text-yellow-800">
                Functional Cookies
              </h3>
              <p class="mb-3">
                These cookies enable the website to provide enhanced
                functionality and personalization. They may be set by us or by
                third-party providers whose services we have added to our pages.
              </p>
              <ul class="list-disc pl-6 space-y-1">
                <li>
                  <strong>Language preferences:</strong> To remember your
                  language choice
                </li>
                <li>
                  <strong>Theme preferences:</strong> To remember your display
                  preferences
                </li>
                <li>
                  <strong>Form data:</strong> To remember information you've
                  entered in forms
                </li>
              </ul>
            </div>

            <div class="bg-purple-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-3 text-purple-800">
                Third-Party Cookies
              </h3>
              <p class="mb-3">
                These cookies are set by third-party services that appear on our
                pages. We use these services to enhance your experience and
                provide additional functionality.
              </p>
              <ul class="list-disc pl-6 space-y-1">
                <li>
                  <strong>Stripe:</strong> For payment processing and fraud
                  prevention
                </li>
                <li>
                  <strong>Firebase:</strong> For authentication, database, and
                  hosting services
                </li>
                <li>
                  <strong>reCAPTCHA:</strong> For security and bot prevention
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.cookies.specificCookies.title") ||
              "Specific Cookies We Use"
            }}
          </h2>

          <div class="overflow-x-auto">
            <table
              class="min-w-full bg-white border border-gray-200 rounded-lg"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b"
                  >
                    Cookie Name
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b"
                  >
                    Purpose
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b"
                  >
                    Duration
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <!-- Google Analytics -->
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">_ga</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Distinguishes unique users
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">2 years</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Analytics</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">_ga_*</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Stores session state
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">2 years</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Analytics</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">_gid</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Distinguishes users
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">24 hours</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Analytics</td>
                </tr>

                <!-- Firebase -->
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">__session</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Firebase session management
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">Session</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Essential</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">
                    firebase:authUser
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Firebase authentication
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">1 year</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Essential</td>
                </tr>

                <!-- Stripe -->
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">__stripe_mid</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Stripe fraud prevention
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">1 year</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Third-party</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">__stripe_sid</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Stripe session management
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">30 minutes</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Third-party</td>
                </tr>

                <!-- reCAPTCHA -->
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">rc::a</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    reCAPTCHA security
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">Persistent</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Third-party</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">rc::b</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    reCAPTCHA security
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">Session</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Third-party</td>
                </tr>

                <!-- Our own cookies -->
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">
                    websdee_language
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Language preference
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">1 year</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Functional</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm text-gray-900">websdee_theme</td>
                  <td class="px-4 py-3 text-sm text-gray-700">
                    Theme preference
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-700">1 year</td>
                  <td class="px-4 py-3 text-sm text-gray-700">Functional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.cookies.control.title") || "How to Control Cookies"
            }}
          </h2>
          <p class="mb-4">You have several options for controlling cookies:</p>

          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2 text-gray-800">
                Browser Settings
              </h3>
              <p class="mb-2">
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience.
              </p>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and security →
                  Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Options → Privacy & Security →
                  Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Manage
                  Website Data
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions
                  → Cookies and site data
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2 text-gray-800">
                Third-Party Opt-Outs
              </h3>
              <ul class="list-disc pl-6 space-y-1">
                <li>
                  <strong>Google Analytics:</strong>
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800"
                    >Google Analytics Opt-out Browser Add-on</a
                  >
                </li>
                <li>
                  <strong>Google Ads:</strong>
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800"
                    >Google Ads Settings</a
                  >
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2 text-gray-800">
                Cookie Consent
              </h3>
              <p>
                When you first visit our website, you will see a cookie consent
                banner. You can change your preferences at any time by clicking
                the "Cookie Settings" link in our footer.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.cookies.impact.title") ||
              "Impact of Disabling Cookies"
            }}
          </h2>
          <p class="mb-4">
            If you choose to disable cookies, some features of our website may
            not function properly:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>You may need to log in repeatedly</li>
            <li>Your preferences and settings may not be saved</li>
            <li>Some interactive features may not work</li>
            <li>Payment processing may be affected</li>
            <li>We may not be able to provide personalized content</li>
          </ul>
          <p>
            Essential cookies cannot be disabled as they are necessary for the
            website to function properly.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.cookies.updates.title") ||
              "Updates to This Cookie Policy"
            }}
          </h2>
          <p class="mb-4">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons.
          </p>
          <p>
            We will notify you of any material changes by posting the new Cookie
            Policy on this page and updating the "Last Updated" date. We
            encourage you to review this Cookie Policy periodically.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.cookies.contact.title") || "Contact Us" }}
          </h2>
          <p class="mb-4">
            If you have any questions about our use of cookies or this Cookie
            Policy, please contact us:
          </p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="mb-2">
              <strong>Email:</strong>
              <a
                href="mailto:support@websdee.com"
                class="text-blue-600 hover:text-blue-800"
                >support@websdee.com</a
              >
            </p>
            <p class="mb-2">
              <strong>Website:</strong>
              <a
                href="https://websdee.com"
                class="text-blue-600 hover:text-blue-800"
                >https://websdee.com</a
              >
            </p>
            <p>
              <strong>Response Time:</strong> We aim to respond to all
              cookie-related inquiries within 30 days.
            </p>
          </div>
        </section>

        <section class="mb-10">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-800">
              Related Policies
            </h2>
            <p class="mb-4 text-blue-700">
              For more information about how we handle your personal data,
              please also review our:
            </p>
            <ul class="space-y-2">
              <li>
                <router-link
                  to="/privacy-policy"
                  class="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Privacy Policy
                </router-link>
              </li>
              <li>
                <router-link
                  to="/terms"
                  class="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Terms of Use
                </router-link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import WithBanner from "@/components/WithBanner.vue";
// Cookie Policy component
// You can add reactive data or methods here if needed
</script>

<style scoped>
/* Add custom styles for this page if needed */
</style>
