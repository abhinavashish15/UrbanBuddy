import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, Target, Heart } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'KYC verification, escrow protection, and transparent reviews ensure a safe platform for everyone.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a community of verified helpers and users who support each other through city transitions.',
    },
    {
      icon: Target,
      title: 'Quality Service',
      description: 'We maintain high standards by verifying helpers and ensuring quality service delivery.',
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Your needs come first. We continuously improve based on user feedback and needs.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About UrbanBuddy</h1>
          <p className="text-lg text-gray-600">
            Making city transitions simple, secure, and stress-free
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              UrbanBuddy was born from the frustration of moving to a new city. Finding reliable local help for flat visits, documentation, and on-ground assistance was always a challenge.
            </p>
            <p className="text-gray-700">
              We built UrbanBuddy to connect people with verified, trustworthy local helpers. Our platform ensures safety through KYC verification, escrow protection, and transparent reviews - making city transitions smooth and stress-free.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Join Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Whether you're moving to a new city or looking to help others in your city, UrbanBuddy is the platform for you.
            </p>
            <div className="flex gap-4">
              <a href="/register" className="inline-block">
                <button className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Get Started as User
                </button>
              </a>
              <a href="/register?role=helper" className="inline-block">
                <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50">
                  Become a Helper
                </button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}






