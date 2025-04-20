<template>
  <WithBanner
    title="Privacy Policy"
    subtitle="We respect your privacy and are committed to protecting your personal data."
  />
  <div class="bg-white">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">
        {{ $t("policies.privacy.title") || "Privacy Policy" }}
      </h1>

      <div class="prose prose-blue mx-auto">
        <p class="text-gray-600 mb-8">
          Last Updated: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.introduction.title") || "Introduction" }}
          </h2>
          <p class="mb-4">
            At WebsDee, we respect your privacy and are committed to protecting
            your personal data. This privacy policy will inform you about how we
            look after your personal data when you visit our website and tell
            you about your privacy rights and how the law protects you.
          </p>
          <p>
            This website is not intended for children and we do not knowingly
            collect data relating to children.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.dataCollection.title") ||
              "The Data We Collect About You"
            }}
          </h2>
          <p class="mb-4">
            Personal data, or personal information, means any information about
            an individual from which that person can be identified. It does not
            include data where the identity has been removed (anonymous data).
          </p>
          <p class="mb-4">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <ul class="list-disc pl-6 mb-4">
            <li>
              Identity Data includes first name, last name, username or similar
              identifier.
            </li>
            <li>Contact Data includes email address and telephone numbers.</li>
            <li>
              Technical Data includes internet protocol (IP) address, browser
              type and version, time zone setting and location, browser plug-in
              types and versions, operating system and platform, and other
              technology on the devices you use to access this website.
            </li>
            <li>
              Usage Data includes information about how you use our website and
              services.
            </li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.howWeUse.title") ||
              "How We Use Your Personal Data"
            }}
          </h2>
          <p class="mb-4">
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul class="list-disc pl-6 mb-4">
            <li>
              Where we need to perform the contract we are about to enter into
              or have entered into with you.
            </li>
            <li>
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.cookies.title") || "Cookies" }}
          </h2>
          <p class="mb-4">
            We use cookies and similar tracking technologies to track the
            activity on our service and we hold certain information. Cookies are
            files with a small amount of data which may include an anonymous
            unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our service.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.thirdParty.title") || "Third-Party Links" }}
          </h2>
          <p>
            This website may include links to third-party websites, plug-ins and
            applications. Clicking on those links or enabling those connections
            may allow third parties to collect or share data about you. We do
            not control these third-party websites and are not responsible for
            their privacy statements. When you leave our website, we encourage
            you to read the privacy policy of every website you visit.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.dataRights.title") ||
              "Your Data Protection Rights"
            }}
          </h2>
          <p class="mb-4">
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data. These include the right to:
          </p>
          <ul class="list-disc pl-6 mb-4">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
          <p>
            If you wish to exercise any of the rights set out above, please
            contact us.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.contact.title") || "Contact Us" }}
          </h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at
            <a
              href="mailto:support@websdee.com"
              class="text-blue-600 hover:text-blue-800"
              >support@websdee.com</a
            >.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import WithBanner from "@/components/WithBanner.vue";
// Privacy Policy component
// You can add reactive data or methods here if needed
</script>

<style scoped>
/* Add custom styles for this page if needed */
</style>
