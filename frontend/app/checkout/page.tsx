'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Lock, 
  CreditCard,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

function CheckoutForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const helperId = searchParams.get('helperId')
  const service = searchParams.get('service')
  const duration = searchParams.get('duration')
  const total = parseFloat(searchParams.get('total') || '0')

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  })

  const subtotal = total / 1.05 // Remove 5% platform fee
  const platformFee = total - subtotal

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process payment and redirect to payment confirmation
    router.push(`/payments/confirm?type=task&amount=${total}&taskId=temp`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/book" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to booking
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review your booking and complete payment</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you&apos;d like to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold">UPI</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'wallet' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold">Wallet (Paytm, PhonePe)</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
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
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Input
                      placeholder="Enter UPI ID (e.g., yourname@paytm)"
                      required
                    />
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                      <option>Select wallet</option>
                      <option>Paytm</option>
                      <option>PhonePe</option>
                      <option>Google Pay</option>
                    </select>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Lock className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Secure Payment</h3>
                    <p className="text-sm text-green-800">
                      Your payment is processed securely through encrypted channels. 
                      We never store your full card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="font-semibold text-right max-w-[60%]">{service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{duration} hours</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Platform Fee</span>
                    <span>{formatCurrency(platformFee)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold">Escrow Protection</p>
                      <p className="text-xs mt-1">
                        Payment held in escrow until task completion
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Lock className="h-4 w-4 mr-2" />
                  Pay {formatCurrency(total)}
                </Button>

                <p className="text-xs text-center text-gray-600">
                  By completing payment, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  )
}






