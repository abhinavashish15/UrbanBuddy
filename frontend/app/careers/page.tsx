import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, Clock } from 'lucide-react'

export default function CareersPage() {
  const openings = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Mumbai / Remote',
      type: 'Full-time',
    },
    {
      id: '2',
      title: 'Product Designer',
      department: 'Design',
      location: 'Bangalore / Remote',
      type: 'Full-time',
    },
    {
      id: '3',
      title: 'Customer Success Manager',
      department: 'Operations',
      location: 'Delhi',
      type: 'Full-time',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600">
            Help us build the future of city transitions
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Work at UrbanBuddy?</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Mission-driven work that makes a real impact</li>
              <li>• Flexible work arrangements and remote options</li>
              <li>• Competitive compensation and equity</li>
              <li>• Growth opportunities and learning budget</li>
              <li>• Collaborative and inclusive culture</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((opening) => (
              <Card key={opening.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{opening.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {opening.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {opening.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {opening.type}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Apply</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don&apos;t see a role that fits?
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Button variant="outline">Send General Application</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}






