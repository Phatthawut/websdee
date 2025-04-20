<template>
  <WithBanner
    title="Terms of Use"
    subtitle="These terms and conditions outline the rules and regulations for the use of WebsDee's website."
  />
  <div class="bg-white">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">
        {{ $t("policies.terms.title") || "Terms of Use" }}
      </h1>

      <div class="prose prose-blue mx-auto">
        <p class="text-gray-600 mb-8">
          Last Updated: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.terms.introduction.title") || "Introduction" }}
          </h2>
          <p class="mb-4">
            These terms and conditions outline the rules and regulations for the
            use of WebsDee's website. By accessing this website, we assume you
            accept these terms and conditions in full. Do not continue to use
            WebsDee's website if you do not accept all of the terms and
            conditions stated on this page.
          </p>
          <p>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and any or all Agreements:
            "Client", "You" and "Your" refers to you, the person accessing this
            website and accepting the Company's terms and conditions. "The
            Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
            "Party", "Parties", or "Us", refers to both the Client and
            ourselves, or either the Client or ourselves.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.terms.license.title") || "License" }}
          </h2>
          <p class="mb-4">
            Unless otherwise stated, WebsDee and/or its licensors own the
            intellectual property rights for all material on WebsDee. All
            intellectual property rights are reserved. You may view and/or print
            pages from the website for your own personal use subject to
            restrictions set in these terms and conditions.
          </p>
          <p class="mb-4">You must not:</p>
          <ul class="list-disc pl-6 mb-4">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>
              Redistribute content from WebsDee (unless content is specifically
              made for redistribution)
            </li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.terms.userComments.title") || "User Comments" }}
          </h2>
          <p class="mb-4">
            Certain parts of this website offer the opportunity for users to
            post and exchange opinions, information, material, and data. WebsDee
            does not screen, edit, publish or review Comments prior to their
            appearance on the website and Comments do not reflect the views or
            opinions of WebsDee, its agents or affiliates. Comments reflect the
            view and opinion of the person who posts such view or opinion.
          </p>
          <p class="mb-4">
            WebsDee reserves the right to monitor all Comments and to remove any
            Comments which it considers in its absolute discretion to be
            inappropriate, offensive or otherwise in breach of these Terms and
            Conditions.
          </p>
          <p class="mb-4">You warrant and represent that:</p>
          <ul class="list-disc pl-6 mb-4">
            <li>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so
            </li>
            <li>
              The Comments do not infringe any intellectual property right,
              including without limitation copyright, patent or trademark, or
              other proprietary right of any third party
            </li>
            <li>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material or material which is an
              invasion of privacy
            </li>
            <li>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity
            </li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{
              $t("policies.terms.hyperlinking.title") ||
              "Hyperlinking to our Content"
            }}
          </h2>
          <p class="mb-4">
            The following organizations may link to our website without prior
            written approval:
          </p>
          <ul class="list-disc pl-6 mb-4">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>
              Online directory distributors when they list us in the directory
              may link to our website in the same manner as they hyperlink to
              the websites of other listed businesses
            </li>
          </ul>
          <p>
            These organizations may link to our home page, to publications, or
            to other website information so long as the link: (a) is not in any
            way misleading; (b) does not falsely imply sponsorship, endorsement,
            or approval of the linking party and its products or services; and
            (c) fits within the context of the linking party's site.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.terms.liability.title") || "Liability" }}
          </h2>
          <p class="mb-4">
            The materials on WebsDee's website are provided on an 'as is' basis.
            WebsDee makes no warranties, expressed or implied, and hereby
            disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
          <p>
            In no event shall WebsDee or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use the materials on WebsDee's website, even if WebsDee or a
            WebsDee authorized representative has been notified orally or in
            writing of the possibility of such damage.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.terms.changes.title") || "Changes to Terms" }}
          </h2>
          <p class="mb-4">
            WebsDee reserves the right, at its sole discretion, to modify or
            replace these Terms at any time. If a revision is material, we will
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            the Service.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ $t("policies.terms.contact.title") || "Contact Us" }}
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at
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
// Terms of Use component
// You can add reactive data or methods here if needed
</script>

<style scoped>
/* Add custom styles for this page if needed */
</style>
