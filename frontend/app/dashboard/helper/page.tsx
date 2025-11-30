'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Inbox, 
  DollarSign, 
  User, 
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MessageSquare,
  Settings,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { helpersApi } from '@/lib/api/helpers'
import type { Task } from '@/types'

export default function HelperDashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<'inbox' | 'earnings' | 'profile' | 'kyc'>('inbox')
  const [tasks, setTasks] = useState<Task[]>([])
  const [helper, setHelper] = useState<any>(null)
  const [earnings, setEarnings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if not authenticated or not a helper
    if (!authLoading) {
      if (!user) {
        router.push('/login')
        return
      }
      if (user.role !== 'helper') {
        router.push('/dashboard/user')
        return
      }
      // Load data if user is a helper
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router])

  const loadData = async () => {
    if (!user || user.role !== 'helper') return
    
    setLoading(true)
    setError(null)
    try {
      // Load helper profile
      const helperResponse = await helpersApi.getMyHelperProfile()
      if (helperResponse.success && helperResponse.data) {
        setHelper(helperResponse.data)
      } else {
        console.error('Failed to load helper profile:', helperResponse.error)
      }

      // Load tasks
      const tasksResponse = await helpersApi.getHelperTasks()
      if (tasksResponse.success && tasksResponse.data) {
        setTasks(tasksResponse.data)
      } else {
        console.error('Failed to load tasks:', tasksResponse.error)
      }

      // Load earnings
      const earningsResponse = await helpersApi.getHelperEarnings()
      if (earningsResponse.success && earningsResponse.data) {
        setEarnings(earningsResponse.data)
      } else {
        console.error('Failed to load earnings:', earningsResponse.error)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending')

  const handleAcceptRequest = async (taskId: string) => {
    try {
      // TODO: Implement accept task API call
      console.log('Accept request', taskId)
      await loadData()
    } catch (error) {
      console.error('Failed to accept request:', error)
    }
  }

  const handleRejectRequest = async (taskId: string) => {
    try {
      // TODO: Implement reject task API call
      console.log('Reject request', taskId)
      await loadData()
    } catch (error) {
      console.error('Failed to reject request:', error)
    }
  }

  // Show loading state while checking auth
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black py-8 flex items-center justify-center">
        <Card className="border border-red-500/30 bg-gray-900/50 max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={loadData}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Helper Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your requests, earnings, and profile</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border border-gray-800 bg-gray-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending Requests</p>
                  <p className="text-2xl font-bold text-white mt-1">{pendingTasks.length}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <Inbox className="h-6 w-6 text-primary-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-800 bg-gray-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Earnings</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {formatCurrency(earnings?.totalEarnings || 0)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-800 bg-gray-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed Tasks</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {tasks.filter(t => t.status === 'completed').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-800 bg-gray-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Rating</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {helper?.rating?.toFixed(1) || '0.0'}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex gap-6">
            {[
              { id: 'inbox', label: 'Request Inbox', icon: Inbox },
              { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
              { id: 'profile', label: 'Edit Profile', icon: User },
              { id: 'kyc', label: 'KYC Verification', icon: CheckCircle },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-400 text-primary-400 font-semibold'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            {pendingTasks.length === 0 ? (
              <Card className="border border-gray-800 bg-gray-900/50">
                <CardContent className="p-12 text-center">
                  <Inbox className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No pending requests</h3>
                  <p className="text-gray-400">New task requests will appear here</p>
                </CardContent>
              </Card>
            ) : (
              pendingTasks.map((task) => (
                <Card key={task._id || task.id} className="border border-gray-800 bg-gray-900/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                          <Badge variant="outline" className="border-gray-700 text-gray-300">
                            {task.status}
                          </Badge>
                        </div>
                        {task.user && (
                          <p className="text-sm text-gray-400 mb-2">From: {task.user.name}</p>
                        )}
                        {task.description && (
                          <p className="text-sm text-gray-300 mb-3">{task.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          {task.scheduledAt && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatDate(task.scheduledAt)}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {formatCurrency(task.budget || 0)}
                          </div>
                          {task.city && (
                            <div>{task.city}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => {
                            const taskId = task._id || task.id
                            if (taskId) handleAcceptRequest(taskId)
                          }}
                          className="bg-primary-600 hover:bg-primary-700"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const taskId = task._id || task.id
                            if (taskId) handleRejectRequest(taskId)
                          }}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Decline
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {earnings ? (
                  <>
                    <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <span className="text-gray-400">Total Earnings</span>
                      <span className="font-semibold text-white">{formatCurrency(earnings.totalEarnings || 0)}</span>
                    </div>
                    {earnings.earnings && earnings.earnings.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-white">Recent Earnings</p>
                        {earnings.earnings.slice(0, 5).map((earning: any) => (
                          <div key={earning._id || earning.id} className="flex justify-between p-2 bg-gray-800/50 rounded border border-gray-700">
                            <div>
                              <p className="text-sm font-medium text-white">{formatCurrency(earning.amount || 0)}</p>
                              {earning.task && (
                                <p className="text-xs text-gray-400">{earning.task.title}</p>
                              )}
                            </div>
                            {earning.createdAt && (
                              <p className="text-xs text-gray-500">{formatDate(earning.createdAt)}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400 text-center py-8">No earnings data available</p>
                )}
              </CardContent>
            </Card>
            <Card className="border border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Payout Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Bank Account
                  </label>
                  <Input 
                    placeholder="Enter account number" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    IFSC Code
                  </label>
                  <Input 
                    placeholder="Enter IFSC code" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700">Update Payout Details</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <Card className="border border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Edit Profile</CardTitle>
              <CardDescription className="text-gray-400">Update your helper profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Bio
                </label>
                <Textarea
                  placeholder="Tell users about yourself and your experience..."
                  rows={4}
                  defaultValue={helper?.bio || ''}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Hourly Rate (₹)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="500" 
                    defaultValue={helper?.hourlyRate || ''}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Response Time
                  </label>
                  <Input 
                    placeholder="Within 2 hours" 
                    defaultValue={helper?.responseTime || ''}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Services Offered
                </label>
                <div className="flex flex-wrap gap-2">
                  {helper?.services?.map((service: string, idx: number) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="cursor-pointer border-gray-700 text-gray-300 hover:border-primary-400 hover:text-primary-400"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="bg-primary-600 hover:bg-primary-700">Save Changes</Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'kyc' && (
          <Card className="border border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">KYC Verification</CardTitle>
              <CardDescription className="text-gray-400">Upload documents to verify your identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {helper?.kycStatus === 'pending' && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-400">Verification Pending</p>
                      <p className="text-sm text-yellow-300/80 mt-1">
                        Your KYC documents are under review. This usually takes 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {helper?.kycStatus === 'verified' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-400">Verified</p>
                      <p className="text-sm text-green-300/80 mt-1">
                        Your identity has been verified. You can now accept tasks.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Aadhaar Card / ID Proof
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Address Proof
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Selfie with ID
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <Button 
                disabled={helper?.kycStatus === 'verified'}
                className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
              >
                {helper?.kycStatus === 'verified' ? 'Verified' : 'Submit for Verification'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
