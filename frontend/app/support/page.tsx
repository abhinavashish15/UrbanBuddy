'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Mail, MessageSquare, Phone, Send } from 'lucide-react'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    message: '',
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const faqs = [
    {
      question: 'How do I subscribe to the platform?',
      answer: 'Click on "Get Started" or visit the subscription page to choose a plan that fits your needs. You can select monthly, quarterly, or yearly plans.',
    },
    {
      question: 'How does escrow protection work?',
      answer: 'When you book a helper, payment is held securely in escrow. It\'s only released to the helper after you confirm task completion and approve the work.',
    },
    {
      question: 'What is KYC verification for helpers?',
      answer: 'KYC (Know Your Customer) verification ensures all helpers are verified with government ID, address proof, and selfie. This helps maintain platform safety and trust.',
    },
    {
      question: 'How do I become a helper?',
      answer: 'Sign up as a helper, complete your profile, upload KYC documents, and start accepting task requests from users in your city.',
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'You can raise a dispute through your dashboard. Our admin team will review the case and help resolve the issue. Escrow protection ensures your payment is safe.',
    },
    {
      question: 'How do helpers get paid?',
      answer: 'Helpers receive payouts after task completion and user approval. Payments are processed to the bank account registered in payout settings.',
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Send className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-6">
                We've received your message and will get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">
            We're here to help. Find answers or contact our support team.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">support@urbanbuddy.com</p>
              <p className="text-xs text-gray-500">Response within 24 hours</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">+91 1800-XXX-XXXX</p>
              <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM IST</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Available in dashboard</p>
              <p className="text-xs text-gray-500">Instant responses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Send us a message and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="general">General Inquiry</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="technical">Technical Issue</option>
                    <option value="dispute">Dispute Resolution</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Subject
                  </label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Describe your issue in detail..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}






