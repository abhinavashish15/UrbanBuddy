'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  AlertCircle, 
  Shield, 
  Calendar, 
  Clock, 
  MapPin,
  DollarSign,
  CheckCircle,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { helpersApi } from '@/lib/api/helpers'
import { paymentsApi } from '@/lib/api/payments'
import type { Helper } from '@/types'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const helperId = searchParams.get('helperId')
  const service = searchParams.get('service')

  const [formData, setFormData] = useState({
    serviceType: service || '',
    scheduledDate: '',
    scheduledTime: '',
    duration: '2',
    location: '',
    city: '',
    description: '',
    budget: '',
  })

  const [helper, setHelper] = useState<Helper | null>(null)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const escrowFee = 0.05 // 5% platform fee

  useEffect(() => {
    loadData()
  }, [helperId, user])

  useEffect(() => {
    if (helper) {
      const hours = parseInt(formData.duration) || 2
      const budget = formData.budget ? parseFloat(formData.budget) : (helper.hourlyRate || 0) * hours
      const fee = budget * escrowFee
      setEstimatedTotal(budget + fee)
    }
  }, [formData.duration, formData.budget, helper])

  const loadData = async () => {
    if (!helperId) return

    setLoading(true)
    try {
      // Load helper data
      const helperResponse = await helpersApi.getHelperById(helperId)
      if (helperResponse.success && helperResponse.data) {
        setHelper(helperResponse.data)
      }

      // Check subscription
      if (user) {
        const subResponse = await paymentsApi.getActiveSubscription()
        if (subResponse.success && subResponse.data) {
          setHasSubscription(true)
        }
      }
    } catch (error) {
      console.error('Failed to load booking data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasSubscription) {
      router.push('/payments/subscribe?redirect=/book')
      return
    }
    // Proceed to checkout
    router.push(`/checkout?helperId=${helperId}&service=${encodeURIComponent(formData.serviceType)}&duration=${formData.duration}&total=${estimatedTotal}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!helper) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Helper not found</h3>
              <p className="text-gray-600 mb-4">The helper you're looking for doesn't exist</p>
              <Link href="/search">
                <Button>Back to Search</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const hourlyRate = helper.hourlyRate || 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Book a Helper</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create your task request</p>
        </div>

        {!hasSubscription && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Subscription Required</h3>
                  <p className="text-sm text-red-800 mb-4">
                    You need an active subscription to book helpers on UrbanBuddy.
                  </p>
                  <Link href="/payments/subscribe?redirect=/book">
                    <Button variant="default">Subscribe Now</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Service Type *
                  </label>
                  <Select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    required
                  >
                    <option value="">Select a service</option>
                    {helper.services && helper.services.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                    <option value="other">Other</option>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 mb-2 block">
                      Scheduled Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 mb-2 block">
                      Scheduled Time *
                    </label>
                    <Input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Estimated Duration *
                  </label>
                  <Select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  >
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">Full day (8 hours)</option>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Location Address *
                  </label>
                  <Input
                    placeholder="Enter full address"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    City *
                  </label>
                  <Select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  >
                    <option value="">Select city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Task Description *
                  </label>
                  <Textarea
                    placeholder="Provide detailed information about what you need help with..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Budget (Optional)
                  </label>
                  <Input
                    type="number"
                    placeholder={`Default: ${formatCurrency(hourlyRate * (parseInt(formData.duration) || 2))}`}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use helper's hourly rate × duration
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Helper Rate</span>
                    <span className="font-semibold">{formatCurrency(hourlyRate)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{formData.duration} hours</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {formatCurrency(formData.budget ? parseFloat(formData.budget) : hourlyRate * (parseInt(formData.duration) || 2))}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Platform Fee (5%)</span>
                    <span>
                      {formatCurrency((formData.budget ? parseFloat(formData.budget) : hourlyRate * (parseInt(formData.duration) || 2)) * escrowFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(estimatedTotal)}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold">Escrow Protection</p>
                      <p className="text-xs mt-1">
                        Payment held securely until task completion. Released only after your approval.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!hasSubscription}>
                  {hasSubscription ? 'Proceed to Checkout' : 'Subscribe to Continue'}
                </Button>

                <p className="text-xs text-center text-gray-600">
                  By proceeding, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
