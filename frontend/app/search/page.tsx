'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle, 
  Filter, 
  Map,
  List,
  Clock,
  Award,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { helpersApi } from '@/lib/api/helpers'
import type { Helper } from '@/types'

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [helpers, setHelpers] = useState<Helper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHelpers()
  }, [selectedCity, selectedService, priceRange])

  const loadHelpers = async () => {
    setLoading(true)
    setError(null)
    try {
      const params: any = {}
      if (selectedCity) params.city = selectedCity
      if (selectedService) params.services = [selectedService]
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(p => p.replace(/[^0-9]/g, ''))
        if (min) params.minRating = parseFloat(min) / 100
      }

      const response = await helpersApi.searchHelpers(params)
      if (response.success && response.data) {
        let filteredHelpers = response.data.helpers

        // Filter by search query
        if (searchQuery) {
          filteredHelpers = filteredHelpers.filter(helper => 
            helper.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            helper.city?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        setHelpers(filteredHelpers)
      } else {
        setError(response.error || 'Failed to load helpers')
      }
    } catch (err) {
      setError('An error occurred while loading helpers')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Verified Helpers</h1>
          
          {/* Search Filters */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  loadHelpers()
                }}
                className="pl-10"
              />
            </div>
            <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
            </Select>
            <Select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
              <option value="">All Services</option>
              <option value="Flat Visit & Inspection">Flat Visit & Inspection</option>
              <option value="Photo & Video Documentation">Photo & Video Documentation</option>
              <option value="Price Negotiation">Price Negotiation</option>
              <option value="Pickup & Delivery">Pickup & Delivery</option>
              <option value="On-Ground Assistance">On-Ground Assistance</option>
            </Select>
            <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">Any Price</option>
              <option value="0-500">₹0 - ₹500/hr</option>
              <option value="500-1000">₹500 - ₹1000/hr</option>
              <option value="1000+">₹1000+/hr</option>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {loading ? 'Loading...' : `Found ${helpers.length} verified helper${helpers.length !== 1 ? 's' : ''}`}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <span className="ml-3 text-gray-600">Loading helpers...</span>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-600">{error}</p>
              <Button onClick={loadHelpers} className="mt-4">Try Again</Button>
            </CardContent>
          </Card>
        ) : helpers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No helpers found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </CardContent>
          </Card>
        ) : viewMode === 'list' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {helpers.map((helper) => (
              <Card key={helper._id || helper.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-gray-600">
                          {helper.user?.name?.charAt(0) || 'H'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{helper.user?.name || 'Helper'}</CardTitle>
                          {helper.verified && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {helper.city || 'City not specified'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{helper.rating || 0}</span>
                      <span className="text-gray-600 ml-1">({helper.totalReviews || 0})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="h-4 w-4 mr-1" />
                      {helper.totalTasks || 0} tasks
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {formatCurrency(helper.hourlyRate || 0)}/hour
                    </div>
                    {helper.responseTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {helper.responseTime}
                      </div>
                    )}
                  </div>

                  {helper.services && helper.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {helper.services.slice(0, 2).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {helper.services.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{helper.services.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <Link href={`/helpers/${helper._id || helper.id}`}>
                    <Button className="w-full">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Map view coming soon</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Interactive map with helper locations will be available here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
