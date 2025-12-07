'use client'

export const dynamic = 'force-dynamic'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

function PaymentConfirmContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = searchParams.get('type')
  const amount = searchParams.get('amount')
  const redirect = searchParams.get('redirect')
  const planId = searchParams.get('plan')

  const paymentType = type === 'subscription' ? 'Subscription' : 'Task Payment'

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 w-full">
        <Card className="border-green-200">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Your {paymentType.toLowerCase()} has been processed successfully.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Type:</span>
                  <span className="font-semibold">{paymentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">{formatCurrency(parseFloat(amount || '0'))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">Completed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs">TXN{Date.now()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push(redirect || (type === 'subscription' ? '/dashboard' : '/dashboard/user'))}
                size="lg"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>

            {type === 'subscription' && (
              <p className="mt-6 text-sm text-gray-600">
                Your subscription is now active. You can start booking helpers immediately.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PaymentConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    }>
      <PaymentConfirmContent />
    </Suspense>
  )
}









