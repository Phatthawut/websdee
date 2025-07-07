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
          <p class="mb-4">
            This website is not intended for children under 13 years of age and
            we do not knowingly collect data relating to children under 13.
          </p>
          <p>
            By using our website, you consent to the collection and use of
            information in accordance with this policy.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.dataController.title") || "Data Controller"
            }}
          </h2>
          <p class="mb-4">
            WebsDee is the data controller and responsible for your personal
            data. We are responsible for overseeing questions in relation to
            this privacy policy.
          </p>
          <p>
            <strong>Contact Details:</strong><br />
            Email:
            <a
              href="mailto:support@websdee.com"
              class="text-blue-600 hover:text-blue-800"
              >support@websdee.com</a
            ><br />
            Website:
            <a
              href="https://websdee.com"
              class="text-blue-600 hover:text-blue-800"
              >https://websdee.com</a
            >
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
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Identity Data:</strong> includes first name, last name,
              username, profile picture, and similar identifier.
            </li>
            <li>
              <strong>Contact Data:</strong> includes email address, phone
              numbers, and billing address.
            </li>
            <li>
              <strong>Financial Data:</strong> includes payment card details,
              bank account information, and transaction history (processed
              securely by Stripe).
            </li>
            <li>
              <strong>Technical Data:</strong> includes internet protocol (IP)
              address, browser type and version, time zone setting and location,
              browser plug-in types and versions, operating system and platform,
              and other technology on the devices you use to access this
              website.
            </li>
            <li>
              <strong>Usage Data:</strong> includes information about how you
              use our website, products, and services, including page views,
              time spent on pages, and navigation patterns.
            </li>
            <li>
              <strong>Marketing and Communications Data:</strong> includes your
              preferences in receiving marketing from us and our third parties
              and your communication preferences.
            </li>
            <li>
              <strong>Content Data:</strong> includes information and content
              that you post, upload, or submit to our website, including
              comments, reviews, and user-generated content.
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
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Contract Performance:</strong> Where we need to perform
              the contract we are about to enter into or have entered into with
              you.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Where it is necessary for
              our legitimate interests (or those of a third party) and your
              interests and fundamental rights do not override those interests.
            </li>
            <li>
              <strong>Legal Obligation:</strong> Where we need to comply with a
              legal obligation.
            </li>
            <li>
              <strong>Consent:</strong> Where you have given us consent to do
              so.
            </li>
          </ul>

          <h3 class="text-xl font-semibold mb-3 text-gray-700">
            Purposes for which we will use your personal data:
          </h3>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>To provide and maintain our website and services</li>
            <li>To process and complete transactions</li>
            <li>
              To send you technical notices, updates, security alerts, and
              support messages
            </li>
            <li>
              To respond to your comments, questions, and customer service
              requests
            </li>
            <li>
              To communicate with you about products, services, offers, and
              events
            </li>
            <li>
              To monitor and analyze trends, usage, and activities in connection
              with our services
            </li>
            <li>
              To detect, investigate, and prevent fraudulent transactions and
              other illegal activities
            </li>
            <li>
              To comply with legal obligations and enforce our terms of service
            </li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.dataSharing.title") ||
              "Data Sharing and Third Parties"
            }}
          </h2>
          <p class="mb-4">
            We may share your personal data with the following categories of
            third parties:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Service Providers:</strong> We use trusted third-party
              service providers to help us operate our business and provide
              services to you, including:
              <ul class="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Firebase (Google):</strong> For authentication,
                  database, and hosting services
                </li>
                <li>
                  <strong>Stripe:</strong> For payment processing and financial
                  transactions
                </li>
                <li>
                  <strong>Google Analytics:</strong> For website analytics and
                  performance monitoring
                </li>
                <li>
                  <strong>Vercel/Netlify:</strong> For website hosting and
                  deployment
                </li>
              </ul>
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required to do so by law or in response to valid
              requests by public authorities.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your personal data may be
              transferred as part of that transaction.
            </li>
            <li>
              <strong>Protection of Rights:</strong> We may disclose your
              information to protect our rights, property, or safety, or that of
              our users or the public.
            </li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.dataSecurity.title") || "Data Security" }}
          </h2>
          <p class="mb-4">
            We have implemented appropriate security measures to protect your
            personal data against accidental loss, use, alteration, disclosure,
            or access. These measures include:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Secure payment processing through Stripe</li>
            <li>Firebase App Check for request validation</li>
            <li>Regular backups and disaster recovery procedures</li>
          </ul>
          <p>
            However, no method of transmission over the internet or electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your personal data, we cannot guarantee
            its absolute security.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.dataRetention.title") || "Data Retention" }}
          </h2>
          <p class="mb-4">
            We will retain your personal data only for as long as necessary to
            fulfill the purposes for which it was collected, including for the
            purposes of satisfying any legal, accounting, or reporting
            requirements.
          </p>
          <p class="mb-4">
            To determine the appropriate retention period for personal data, we
            consider the amount, nature, and sensitivity of the personal data,
            the potential risk of harm from unauthorized use or disclosure, the
            purposes for which we process your personal data, and applicable
            legal requirements.
          </p>
          <p>
            When we no longer need your personal data, we will securely delete
            or anonymize it.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.cookies.title") ||
              "Cookies and Tracking Technologies"
            }}
          </h2>
          <p class="mb-4">
            We use cookies and similar tracking technologies to track the
            activity on our service and we hold certain information. Cookies are
            files with a small amount of data which may include an anonymous
            unique identifier.
          </p>
          <p class="mb-4">
            For detailed information about the cookies we use and your choices
            regarding cookies, please see our
            <router-link
              to="/cookie-policy"
              class="text-blue-600 hover:text-blue-800"
              >Cookie Policy</router-link
            >.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our service.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.international.title") ||
              "International Data Transfers"
            }}
          </h2>
          <p class="mb-4">
            Your personal data may be transferred to and processed in countries
            other than your own. We ensure that such transfers comply with
            applicable data protection laws and that appropriate safeguards are
            in place to protect your personal data.
          </p>
          <p>
            For users in the European Economic Area (EEA), we ensure that
            transfers of personal data outside the EEA are protected by
            appropriate safeguards, such as standard contractual clauses
            approved by the European Commission.
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
            Depending on your location, you may have certain rights regarding
            your personal data. These rights may include:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Right of Access:</strong> Request access to your personal
              data
            </li>
            <li>
              <strong>Right of Rectification:</strong> Request correction of
              your personal data
            </li>
            <li>
              <strong>Right of Erasure:</strong> Request deletion of your
              personal data
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Request restriction
              of processing your personal data
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Request transfer of
              your personal data
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing of your
              personal data
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Withdraw consent where
              processing is based on consent
            </li>
            <li>
              <strong>Right to Lodge a Complaint:</strong> Lodge a complaint
              with a supervisory authority
            </li>
          </ul>
          <p class="mb-4">
            To exercise any of these rights, please contact us using the contact
            information provided below. We will respond to your request within
            30 days.
          </p>
          <p>
            <strong>Note:</strong> Some of these rights may be limited in
            certain circumstances, such as when we have a legal obligation to
            retain your data or when the data is necessary for the performance
            of a contract.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.children.title") || "Children's Privacy" }}
          </h2>
          <p class="mb-4">
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal data from children under 13. If
            you are a parent or guardian and you are aware that your child has
            provided us with personal data, please contact us.
          </p>
          <p>
            If we become aware that we have collected personal data from
            children without verification of parental consent, we take steps to
            remove that information from our servers.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.privacy.changes.title") ||
              "Changes to This Privacy Policy"
            }}
          </h2>
          <p class="mb-4">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "Last Updated" date.
          </p>
          <p>
            We encourage you to review this privacy policy periodically for any
            changes. Changes to this privacy policy are effective when they are
            posted on this page.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.privacy.contact.title") || "Contact Us" }}
          </h2>
          <p class="mb-4">
            If you have any questions about this privacy policy or our privacy
            practices, please contact us:
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
              privacy-related inquiries within 30 days.
            </p>
          </div>
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
