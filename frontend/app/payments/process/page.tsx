'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Lock, Loader2 } from 'lucide-react'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export default function PaymentProcessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = searchParams.get('type')
  const planId = searchParams.get('plan')
  const redirect = searchParams.get('redirect') || '/'
  const amount = searchParams.get('amount')

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  })
  const [processing, setProcessing] = useState(false)

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === planId)
  const paymentAmount = type === 'subscription' 
    ? selectedPlan?.price || 0 
    : parseFloat(amount || '0')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to confirmation
    if (type === 'subscription') {
      router.push(`/payments/confirm?type=subscription&plan=${planId}&amount=${paymentAmount}&redirect=${redirect}`)
    } else {
      router.push(`/payments/confirm?type=task&amount=${paymentAmount}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              Complete Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {type === 'subscription' ? 'Subscription Plan' : 'Task Payment'}
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(paymentAmount)}
                </span>
              </div>
              {type === 'subscription' && selectedPlan && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedPlan.name} - {selectedPlan.duration} days
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  Card Number *
                </label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  maxLength={19}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  Cardholder Name *
                </label>
                <Input
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Expiry Date *
                  </label>
                  <Input
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    CVV *
                  </label>
                  <Input
                    type="password"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Lock className="h-5 w-5 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Your payment is processed securely. We never store your full card details.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay {formatCurrency(paymentAmount)}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}







