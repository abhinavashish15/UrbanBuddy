import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Refund Policy</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Subscription Refunds</h2>
              <p className="text-gray-700">
                Subscription fees are non-refundable once the subscription period has started. However, you may cancel your subscription at any time, and it will not renew at the end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Task Payment Refunds</h2>
              <p className="text-gray-700 mb-3">
                Task payments held in escrow can be refunded in the following scenarios:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Helper fails to complete the task as described</li>
                <li>Task is cancelled by user before helper starts work (full refund)</li>
                <li>Task is cancelled after helper starts work (partial refund based on work completed)</li>
                <li>Dispute resolved in favor of the user</li>
                <li>Helper does not respond or accept the task within 48 hours</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Refund Process</h2>
              <p className="text-gray-700">
                Refunds are processed within 5-7 business days to the original payment method. Platform fees are non-refundable unless the issue is due to a platform error.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Dispute Resolution</h2>
              <p className="text-gray-700">
                If you're not satisfied with a service, raise a dispute through your dashboard. Our admin team will review the case and determine appropriate refund amounts based on evidence provided by both parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Contact for Refunds</h2>
              <p className="text-gray-700">
                For refund requests or questions, contact us at refunds@urbanbuddy.com or through the support center.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}






