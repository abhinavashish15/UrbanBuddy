import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Shield, Search, CreditCard, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Subscribe to Platform',
      description: 'Choose a subscription plan (Monthly, Quarterly, or Yearly) that fits your needs. Subscription gives you access to verified helpers and escrow protection.',
      icon: Shield,
    },
    {
      number: 2,
      title: 'Search & Select Helper',
      description: 'Browse verified helpers in your target city. Filter by services, ratings, and pricing. View detailed profiles with reviews and portfolios.',
      icon: Search,
    },
    {
      number: 3,
      title: 'Book & Pay via Escrow',
      description: 'Create a task request with details. Payment is held securely in escrow until task completion. You remain in control.',
      icon: CreditCard,
    },
    {
      number: 4,
      title: 'Task Completed & Review',
      description: 'Helper completes the task as described. Review photos, videos, and deliverables. Release payment when satisfied or raise a dispute if needed.',
      icon: Star,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, secure, and straightforward process to connect with verified local helpers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card key={step.number} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {step.number}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose UrbanBuddy?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                'KYC verified helpers for your safety',
                'Escrow protection for secure payments',
                'Transparent ratings and reviews',
                'Quick response times from helpers',
                'Support for multiple cities',
                'Dispute resolution by admin team',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/register">
            <Button size="lg" className="text-base">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}









