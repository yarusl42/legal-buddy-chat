import { BackButton } from "@/components/BackButton";

const Privacy = () => {
  return (
    <div className="relative">
      <BackButton />
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Personal information (name, email address, phone number)</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Legal consultation history</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Process your transactions</li>
              <li>Send you important updates and notifications</li>
              <li>Maintain the security of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell or rent your personal information to third parties. We
              may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
              <li>Legal professionals you choose to connect with</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              experience on our platform. You can control cookie preferences through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us
              at privacy@legal-buddy.com
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

export default Privacy;
