import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertTriangle, Lock, Users, Star } from 'lucide-react'

export default function SafetyPage() {
  const safetyTips = [
    {
      icon: Shield,
      title: 'Verify Before You Book',
      description: 'Always check helper verification badges, KYC status, and read reviews from previous users before booking.',
    },
    {
      icon: Lock,
      title: 'Use Escrow Protection',
      description: 'All payments are held in escrow until task completion. Never pay helpers directly outside the platform.',
    },
    {
      icon: Users,
      title: 'Communicate Through Platform',
      description: 'Keep all communication within UrbanBuddy\'s messaging system for your safety and dispute resolution.',
    },
    {
      icon: Star,
      title: 'Leave Honest Reviews',
      description: 'Help the community by leaving detailed reviews after task completion. This helps others make informed decisions.',
    },
    {
      icon: AlertTriangle,
      title: 'Report Issues Immediately',
      description: 'If you encounter any problems or suspicious behavior, report it to our support team immediately.',
    },
    {
      icon: CheckCircle,
      title: 'Verify Task Completion',
      description: 'Review photos, videos, and deliverables before releasing escrow payment. Only approve when satisfied.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety & Trust</h1>
          <p className="text-lg text-gray-600">
            Your safety is our priority. Learn how we protect you and what you can do to stay safe.
          </p>
        </div>

        {/* Trust Features */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">KYC Verified</h3>
              <p className="text-sm text-gray-600">
                All helpers undergo identity verification
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Escrow Protection</h3>
              <p className="text-sm text-gray-600">
                Payments held securely until completion
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Rated & Reviewed</h3>
              <p className="text-sm text-gray-600">
                Transparent ratings from real users
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Safety Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Safety Tips for Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {safetyTips.map((tip, idx) => {
                const Icon = tip.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* For Helpers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Safety Tips for Helpers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Before Accepting Tasks</h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>Review task details and requirements carefully</li>
                <li>Verify location and accessibility</li>
                <li>Confirm your availability and response time</li>
                <li>Ask clarifying questions if needed</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">During Task Execution</h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>Arrive on time and communicate delays</li>
                <li>Take photos/videos as documentation</li>
                <li>Keep all communication professional</li>
                <li>Complete tasks as described</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Payment & Disputes</h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>Payment is released only after user approval</li>
                <li>Document your work with photos/videos</li>
                <li>Respond to disputes promptly with evidence</li>
                <li>Contact support for assistance</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Reporting */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Report Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you encounter any safety concerns, suspicious behavior, or need to report an issue:
            </p>
            <div className="flex gap-4">
              <a href="/support" className="inline-block">
                <Badge variant="default" className="cursor-pointer">Contact Support</Badge>
              </a>
              <a href="mailto:safety@urbanbuddy.com" className="inline-block">
                <Badge variant="outline" className="cursor-pointer">Email Safety Team</Badge>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}






