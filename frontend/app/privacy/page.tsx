import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="text-gray-700 mb-3">We collect information that you provide directly to us:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Name, email address, phone number</li>
                <li>Payment and billing information</li>
                <li>KYC documents for helper verification</li>
                <li>Task details and communication history</li>
                <li>Reviews and ratings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Verify helper identities through KYC</li>
                <li>Send administrative messages and updates</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
              <p className="text-gray-700">
                We do not sell your personal information. We may share your information only with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                <li>Helpers you engage with (limited contact information)</li>
                <li>Payment processors for transaction processing</li>
                <li>Service providers who assist in operations</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
              <p className="text-gray-700 mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
              <p className="text-gray-700">
                We use cookies to enhance your experience, analyze site usage, and assist in marketing efforts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
              <p className="text-gray-700">
                For questions about this Privacy Policy, please contact us at privacy@urbanbuddy.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}









