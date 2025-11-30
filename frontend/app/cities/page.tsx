import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CITIES } from '@/lib/constants'

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cities We Serve</h1>
          <p className="text-lg text-gray-600">
            Find verified helpers in major cities across India
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {CITIES.map((city) => (
            <Card key={city.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <Badge variant="outline">{city.helperCount} helpers</Badge>
                </div>
                <CardTitle className="text-xl">{city.name}</CardTitle>
                <p className="text-sm text-gray-600">{city.state}</p>
              </CardHeader>
              <CardContent>
                <Link href={`/search?city=${city.name.toLowerCase()}`}>
                  <Button variant="outline" className="w-full">
                    Find Helpers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don&apos;t see your city?
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;re expanding rapidly! Let us know which city you&apos;d like us to add next.
            </p>
            <Link href="/support">
              <Button variant="outline">Request Your City</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}






