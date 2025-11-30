import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using UrbanBuddy, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Platform Services</h2>
              <p className="text-gray-700 mb-3">
                UrbanBuddy is a platform that connects users with verified local helpers for city transition services including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Flat visits and property inspections</li>
                <li>Photo and video documentation</li>
                <li>Price negotiation services</li>
                <li>Pickup and delivery of heavy items</li>
                <li>On-ground assistance and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-3">Users agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain an active subscription to use platform services</li>
                <li>Respect helpers and treat them with professionalism</li>
                <li>Release escrow payments upon satisfactory task completion</li>
                <li>Report any issues or disputes through proper channels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Helper Responsibilities</h2>
              <p className="text-gray-700 mb-3">Helpers agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Complete KYC verification before accepting tasks</li>
                <li>Provide accurate service descriptions and pricing</li>
                <li>Respond to requests in a timely manner</li>
                <li>Complete tasks as described and agreed upon</li>
                <li>Maintain professional conduct and quality service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Payments and Escrow</h2>
              <p className="text-gray-700">
                All task payments are held in escrow until completion. Platform fees apply. Refunds are processed according to our refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Dispute Resolution</h2>
              <p className="text-gray-700">
                Disputes are handled by our admin team. Both parties must provide evidence. UrbanBuddy&apos;s decision is final.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-700">
                UrbanBuddy acts as an intermediary platform. We are not responsible for the quality of services provided by helpers or outcomes of tasks.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}






