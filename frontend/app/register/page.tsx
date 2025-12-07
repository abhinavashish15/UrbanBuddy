/** @format */

"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CITIES } from "@/lib/constants";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const { register, user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: roleParam || "user",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Redirect if already logged in
  if (user && !isLoading) {
    if (user.role === "helper") {
      router.push("/dashboard/helper");
    } else if (user.role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
    return null;
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setPasswordStrength(calculatePasswordStrength(password));

    if (password.length > 0 && password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters",
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors.password;
      setErrors(newErrors);
    }
  };

  const getPasswordStrengthLabel = (strength: number) => {
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return labels[strength] || "Very Weak";
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!formData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      setErrors({ phone: "Please enter a valid phone number" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (formData.password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" });
      return;
    }

    if (formData.role === "helper" && !formData.city) {
      setErrors({ city: "Please select your city" });
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        role: formData.role as "user" | "helper",
        ...(formData.role === "helper" && { city: formData.city }),
      });

      if (result.success && result.user) {
        toast({
          title: "Account created successfully!",
          description:
            formData.role === "helper"
              ? "Welcome to UrbanBuddy! Complete your helper profile to get started."
              : "Welcome to UrbanBuddy! Subscribe to start booking helpers.",
        });

        setTimeout(() => {
          if (formData.role === "helper" || result.user?.role === "helper") {
            router.push("/dashboard/helper");
          } else {
            router.push("/payments/subscribe?redirect=/dashboard/user");
          }
        }, 1500);
      } else {
        setErrors({ submit: result.error || "Registration failed" });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "An error occurred. Please try again." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Create your account
          </h2>
          <p className="text-gray-400">
            Join thousands of users connecting with verified helpers
          </p>
        </div>

        <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-white">Get started</CardTitle>
            <CardDescription className="text-gray-400">
              Choose your role and create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "user" })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.role === "user"
                        ? "border-primary-500 bg-primary-500/10 text-white"
                        : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <div className="text-center">
                      <User className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-semibold">Hire Helpers</div>
                      <div className="text-xs mt-1">Find assistance</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "helper" })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.role === "helper"
                        ? "border-primary-500 bg-primary-500/10 text-white"
                        : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <div className="text-center">
                      <Shield className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-semibold">Become a Helper</div>
                      <div className="text-xs mt-1">Offer services</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="register-name"
                  className="text-sm font-semibold text-white mb-2 block"
                >
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        const newErrors = { ...errors };
                        delete newErrors.name;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="register-email"
                  className="text-sm font-semibold text-white mb-2 block"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        const newErrors = { ...errors };
                        delete newErrors.email;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="register-phone"
                  className="text-sm font-semibold text-white mb-2 block"
                >
                  Phone number{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="register-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) {
                        const newErrors = { ...errors };
                        delete newErrors.phone;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* City (for helpers) */}
              {formData.role === "helper" && (
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    City <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
                    <Select
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) {
                          const newErrors = { ...errors };
                          delete newErrors.city;
                          setErrors(newErrors);
                        }
                      }}
                      className={`pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-primary-500 ${
                        errors.city ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option value="" className="bg-gray-800">
                        Select your city
                      </option>
                      {CITIES.map((city) => (
                        <option
                          key={city.id}
                          value={city.name}
                          className="bg-gray-800"
                        >
                          {city.name}, {city.state}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      {errors.city}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">
                        Password strength
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          passwordStrength <= 1
                            ? "text-red-400"
                            : passwordStrength === 2
                            ? "text-orange-400"
                            : passwordStrength === 3
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {getPasswordStrengthLabel(passwordStrength)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor(
                          passwordStrength
                        )}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                      if (errors.confirmPassword) {
                        const newErrors = { ...errors };
                        delete newErrors.confirmPassword;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="mt-1 text-sm text-green-400 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Passwords match
                    </p>
                  )}
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 mt-0.5 rounded border-gray-600 bg-gray-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-gray-900"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-300 leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary-400 hover:text-primary-300 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-400 hover:text-primary-300 underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900/50 px-2 text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Sign in to your account
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="h-8 w-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
