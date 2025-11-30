'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export default function SubscribePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirect = searchParams.get('redirect')
  const [selectedPlan, setSelectedPlan] = useState('quarterly')

  const handleSubscribe = (planId: string) => {
    // Redirect to payment processing
    router.push(`/payments/process?type=subscription&plan=${planId}&redirect=${redirect || '/'}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href={redirect || '/'} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="mt-4 text-lg text-gray-600">
            Subscribe to access verified helpers and secure escrow protection
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? 'border-primary-600 border-2 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-600 ml-2">/{plan.duration} days</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.duration === 30 && 'Perfect for short-term needs'}
                  {plan.duration === 90 && 'Best value for regular users'}
                  {plan.duration === 365 && 'Maximum savings for long-term'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 max-w-3xl mx-auto border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Why Subscribe?</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Access to verified, KYC-checked helpers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Escrow protection for all payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Unlimited task postings</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}







