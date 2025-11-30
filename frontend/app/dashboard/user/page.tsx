/** @format */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Plus,
  Search,
  AlertCircle,
  Loader2,
  TrendingUp,
  User,
  MapPin,
  ArrowRight,
  Download,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { usersApi } from "@/lib/api/users";
import { paymentsApi } from "@/lib/api/payments";
import type { Task, Payment } from "@/types";

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "past" | "invoices" | "subscription"
  >("upcoming");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Load tasks
      const tasksResponse = await usersApi.getUserTasks();
      if (tasksResponse.success && tasksResponse.data) {
        setTasks(tasksResponse.data);
      }

      // Load payments
      const paymentsResponse = await usersApi.getUserPayments();
      if (paymentsResponse.success && paymentsResponse.data) {
        setPayments(paymentsResponse.data);
      }

      // Load subscription
      const subResponse = await paymentsApi.getActiveSubscription();
      if (subResponse.success && subResponse.data) {
        setSubscription(subResponse.data);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingTasks = tasks.filter(
    (t) =>
      t.status === "pending" ||
      t.status === "accepted" ||
      t.status === "in_progress"
  );
  const pastTasks = tasks.filter(
    (t) => t.status === "completed" || t.status === "cancelled"
  );

  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: {
        variant: "outline" as const,
        label: "Pending",
        className: "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
      },
      accepted: {
        variant: "default" as const,
        label: "Accepted",
        className: "border-blue-500/50 text-blue-400 bg-blue-500/10",
      },
      in_progress: {
        variant: "default" as const,
        label: "In Progress",
        className: "border-primary-500/50 text-primary-400 bg-primary-500/10",
      },
      completed: {
        variant: "default" as const,
        label: "Completed",
        className: "border-green-500/50 text-green-400 bg-green-500/10",
      },
      cancelled: {
        variant: "outline" as const,
        label: "Cancelled",
        className: "border-red-500/50 text-red-400 bg-red-500/10",
      },
    };
    const config =
      variants[status] ||
      ({ variant: "outline" as const, label: status, className: "" } as any);
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name}
              </h1>
              <p className="text-gray-400">
                Manage your tasks, subscriptions, and payments
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/search">
                <Button
                  variant="outline"
                  className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:border-gray-600"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Helpers
                </Button>
              </Link>
              <Link href="/book">
                <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Upcoming Tasks</p>
                  <p className="text-3xl font-bold text-white">
                    {upcomingTasks.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {upcomingTasks.filter((t) => t.status === "in_progress")
                      .length}{" "}
                    in progress
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Completed Tasks</p>
                  <p className="text-3xl font-bold text-white">
                    {pastTasks.filter((t) => t.status === "completed").length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {pastTasks.length} total
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-secondary-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(totalSpent)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {payments.filter((p) => p.status === "completed").length}{" "}
                    payments
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-secondary-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-secondary-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Subscription</p>
                  <p className="text-2xl font-bold text-white capitalize">
                    {subscription ? subscription.status : "None"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {subscription
                      ? subscription.planName || "Active"
                      : "Not subscribed"}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: "upcoming", label: "Upcoming Tasks", icon: Clock },
              { id: "past", label: "Past Tasks", icon: CheckCircle },
              { id: "invoices", label: "Invoices", icon: FileText },
              { id: "subscription", label: "Subscription", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-400 font-semibold"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingTasks.length === 0 ? (
              <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No upcoming tasks
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Start by finding and booking a helper for your needs
                  </p>
                  <Link href="/search">
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                      <Search className="h-4 w-4 mr-2" />
                      Find Helpers
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              upcomingTasks.map((task) => (
                <Card
                  key={task._id || task.id}
                  className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-white">
                            {task.title}
                          </h3>
                          {getStatusBadge(task.status)}
                        </div>
                        {task.helper?.user && (
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                            <User className="h-4 w-4" />
                            <span>Helper: {task.helper.user.name}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          {task.scheduledAt && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(task.scheduledAt)}</span>
                            </div>
                          )}
                          {task.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{task.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-white font-semibold">
                              {formatCurrency(task.budget || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:border-gray-600"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {task.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4">
            {pastTasks.length === 0 ? (
              <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No completed tasks
                  </h3>
                  <p className="text-gray-400">
                    Your completed tasks will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              pastTasks.map((task) => (
                <Card
                  key={task._id || task.id}
                  className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-white">
                            {task.title}
                          </h3>
                          {getStatusBadge(task.status)}
                        </div>
                        {task.helper?.user && (
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                            <User className="h-4 w-4" />
                            <span>Helper: {task.helper.user.name}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-2">
                          {task.completedAt && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span>Completed: {formatDate(task.completedAt)}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-white font-semibold">
                              {formatCurrency(task.budget || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:border-gray-600"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:border-gray-600"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === "invoices" && (
          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Payment History</CardTitle>
              <CardDescription className="text-gray-400">
                View and download your invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400">No invoices yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div
                      key={payment._id || payment.id}
                      className="flex items-center justify-between p-4 border border-gray-800 bg-gray-800/30 rounded-lg hover:border-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-white text-lg">
                            {formatCurrency(payment.amount || 0)}
                          </p>
                          <Badge
                            className={
                              payment.status === "completed"
                                ? "border-green-500/50 text-green-400 bg-green-500/10"
                                : "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 capitalize">
                          {payment.type}
                        </p>
                        {payment.createdAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(payment.createdAt)}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:border-gray-600"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "subscription" && (
          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Subscription Details</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!subscription ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No active subscription
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Subscribe to start booking helpers and access all features
                  </p>
                  <Link href="/payments/subscribe">
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Subscribe Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="p-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {subscription.planName || "Premium Plan"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Active subscription
                        </p>
                      </div>
                      <Badge className="border-green-500/50 text-green-400 bg-green-500/10 text-base px-4 py-1">
                        {subscription.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Expires on {formatDate(subscription.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/payments/subscribe">
                      <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Upgrade Plan
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="border-red-500/50 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
