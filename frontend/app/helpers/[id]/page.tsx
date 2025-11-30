'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Award, 
  MessageCircle,
  Camera,
  Shield,
  Calendar,
  DollarSign,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { helpersApi } from '@/lib/api/helpers'
import { reviewsApi } from '@/lib/api/reviews'
import type { Helper, Review } from '@/types'

export default function HelperProfilePage() {
  const params = useParams()
  const helperId = params.id as string
  const [selectedService, setSelectedService] = useState('')
  const [helper, setHelper] = useState<Helper | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (helperId) {
      loadHelper()
      loadReviews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helperId])

  const loadHelper = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await helpersApi.getHelperById(helperId)
      if (response.success && response.data) {
        setHelper(response.data)
      } else {
        setError(response.error || 'Helper not found')
      }
    } catch (err) {
      setError('Failed to load helper profile')
    } finally {
      setLoading(false)
    }
  }

  const loadReviews = async () => {
    try {
      const response = await reviewsApi.getReviewsByHelper(helperId)
      if (response.success && response.data) {
        setReviews(response.data)
      }
    } catch (err) {
      console.error('Failed to load reviews:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading helper profile...</p>
        </div>
      </div>
    )
  }

  if (error || !helper) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-red-600 mb-4">{error || 'Helper not found'}</p>
              <Link href="/search">
                <Button>Back to Search</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl font-semibold text-gray-600">
                        {helper.user?.name?.charAt(0) || 'H'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-2xl">{helper.user?.name || 'Helper'}</CardTitle>
                        {helper.verified && (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {helper.city || 'City not specified'}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold">{helper.rating || 0}</span>
                          <span className="text-gray-600 ml-1">({helper.totalReviews || 0} reviews)</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Award className="h-5 w-5 mr-1" />
                          {helper.totalTasks || 0} tasks completed
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={helper.kycStatus === 'verified' ? 'default' : 'outline'}>
                    {helper.kycStatus === 'verified' ? 'KYC Verified' : 'Pending Verification'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {helper.bio && <p className="text-gray-700">{helper.bio}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {helper.responseTime && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      Responds {helper.responseTime}
                    </div>
                  )}
                  {helper.createdAt && (
                    <div className="flex items-center text-sm text-gray-600 ml-4">
                      <Shield className="h-4 w-4 mr-1" />
                      Member since {new Date(helper.createdAt).getFullYear()}
                    </div>
                  )}
                </div>
                {helper.languages && helper.languages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {helper.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services */}
            {helper.services && helper.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                  <CardDescription>Select a service to book</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {helper.services.map((service, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService === service
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div>
                        <p className="font-semibold">{service}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(helper.hourlyRate || 0)}/hour
                        </p>
                      </div>
                      <Badge variant={selectedService === service ? 'default' : 'outline'}>
                        {selectedService === service ? 'Selected' : 'Select'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Portfolio */}
            {helper.portfolio && helper.portfolio.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {helper.portfolio.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center"
                      >
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({helper.totalReviews || 0})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No reviews yet</p>
                ) : (
                  <>
                    {reviews.map((review) => (
                      <div key={review._id || review.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.createdAt && (
                            <p className="text-sm text-gray-600">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Helper</CardTitle>
                <CardDescription>
                  {formatCurrency(helper.hourlyRate || 0)}/hour
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!selectedService && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please select a service to continue
                    </p>
                  </div>
                )}

                {selectedService && (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">Selected Service</p>
                      <p className="text-sm text-gray-600">{selectedService}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Estimated Duration
                      </label>
                      <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                        <option>2 hours</option>
                        <option>4 hours</option>
                        <option>6 hours</option>
                        <option>Full day (8 hours)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold">Escrow Protection</p>
                          <p>Payment held securely until task completion</p>
                        </div>
                      </div>
                    </div>

                    <Link href={`/book?helperId=${helperId}&service=${encodeURIComponent(selectedService)}`} className="block">
                      <Button className="w-full" size="lg">
                        Continue to Booking
                      </Button>
                    </Link>
                  </>
                )}

                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Helper
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
