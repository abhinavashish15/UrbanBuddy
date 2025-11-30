'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Loader2
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { helpersApi } from '@/lib/api/helpers'
import { tasksApi } from '@/lib/api/tasks'
import type { Helper, Task } from '@/types'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'users' | 'helpers' | 'tasks' | 'disputes'>('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [helpers, setHelpers] = useState<Helper[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load helpers
      const helpersResponse = await helpersApi.searchHelpers({})
      if (helpersResponse.success && helpersResponse.data) {
        setHelpers(helpersResponse.data.helpers)
      }

      // Load tasks
      const tasksResponse = await tasksApi.searchTasks({})
      if (tasksResponse.success && tasksResponse.data) {
        setTasks(tasksResponse.data.tasks)
      }
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: { variant: 'default' as const },
      inactive: { variant: 'outline' as const },
      verified: { variant: 'default' as const },
      pending: { variant: 'outline' as const },
      completed: { variant: 'default' as const },
      in_progress: { variant: 'default' as const },
      open: { variant: 'outline' as const },
      resolved: { variant: 'default' as const },
    }
    const config = variants[status] || { variant: 'outline' as const }
    return <Badge variant={config.variant}>{status}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  const verifiedHelpers = helpers.filter(h => h.kycStatus === 'verified')
  const activeTasks = tasks.filter(t => t.status === 'in_progress' || t.status === 'accepted')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, helpers, tasks, and disputes</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Helpers</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{helpers.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified Helpers</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{verifiedHelpers.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{activeTasks.length}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{tasks.length}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-secondary-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-6">
            {[
              { id: 'helpers', label: 'Helpers', icon: UserCheck },
              { id: 'tasks', label: 'Tasks', icon: ClipboardList },
              { id: 'disputes', label: 'Disputes', icon: AlertTriangle },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
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
        {activeTab === 'helpers' && (
          <div className="space-y-4">
            {helpers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No helpers found</h3>
                  <p className="text-gray-600">Helpers will appear here once they register</p>
                </CardContent>
              </Card>
            ) : (
              helpers
                .filter(helper => 
                  !searchQuery || 
                  helper.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  helper.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((helper) => (
                  <Card key={helper._id || helper.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {helper.user?.name || 'Helper'}
                            </h3>
                            {getStatusBadge(helper.kycStatus || 'pending')}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{helper.user?.email}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>Rating: {helper.rating?.toFixed(1) || '0.0'}</div>
                            <div>Tasks: {helper.totalTasks || 0}</div>
                            <div>City: {helper.city || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-600">Tasks will appear here once users create them</p>
                </CardContent>
              </Card>
            ) : (
              tasks
                .filter(task =>
                  !searchQuery ||
                  task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  task.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((task) => (
                  <Card key={task._id || task.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                            {getStatusBadge(task.status)}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            {task.user && <div>User: {task.user.name}</div>}
                            {task.helper?.user && <div>Helper: {task.helper.user.name}</div>}
                            <div>{formatCurrency(task.budget || 0)}</div>
                          </div>
                          {task.createdAt && (
                            <p className="text-xs text-gray-500">Created: {formatDate(task.createdAt)}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        )}

        {activeTab === 'disputes' && (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No disputes</h3>
              <p className="text-gray-600">Disputes will appear here when raised</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
