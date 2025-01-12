import { BackButton } from "@/components/BackButton";

const Terms = () => {
  return (
    <div className="relative">
      <BackButton />
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using Legal Buddy, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Use. If you do not
              agree with these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed">
              Legal Buddy provides an AI-powered legal consultation platform that
              connects users with legal professionals. Our service includes but is not
              limited to legal advice, document review, and general legal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not engage in any unauthorized use of the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content, features, and functionality of Legal Buddy, including but
              not limited to text, graphics, logos, and software, are the exclusive
              property of Legal Buddy and are protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Legal Buddy provides information and connections to legal professionals
              but does not guarantee the accuracy or completeness of any advice. We
              are not responsible for any actions taken based on the information
              provided through our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify
              users of any material changes. Your continued use of Legal Buddy after
              such modifications constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Last updated: January 12, 2025
        </div>
      </div>
    </div>
  );
};

export default Terms;
