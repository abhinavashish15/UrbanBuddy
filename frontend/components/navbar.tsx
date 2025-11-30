/** @format */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Search, User, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const isDashboardPage = pathname?.startsWith("/dashboard");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getDashboardPath = () => {
    if (user?.role === "helper") return "/dashboard/helper";
    if (user?.role === "admin") return "/dashboard/admin";
    return "/dashboard/user";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Find Helpers" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  const navClassName = isHomePage
    ? "fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-300"
    : "sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-sm shadow-black/50 transition-all duration-300";

  const textClassName = isHomePage ? "text-white" : "text-white";

  const linkClassName = (href: string) => {
    const base = "px-4 py-2 text-sm font-medium transition-colors duration-200";
    if (isHomePage) {
      return `${base} ${
        isActive(href)
          ? "text-white border-b-2 border-white"
          : "text-white/90 hover:text-white"
      }`;
    }
    return `${base} ${
      isActive(href)
        ? "text-primary-400 border-b-2 border-primary-400"
        : "text-gray-300 hover:text-primary-400"
    }`;
  };

  return (
    <nav className={navClassName}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield
                className={`h-8 w-8 ${
                  isHomePage ? "text-white" : "text-primary-400"
                }`}
              />
              <span className={`text-xl font-bold ${textClassName}`}>
                UrbanBuddy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isDashboardPage && (
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClassName(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex md:items-center md:space-x-4">
            {loading ? (
              <div className="h-8 w-20 animate-pulse bg-gray-200 rounded"></div>
            ) : user ? (
              <>
                <Link href={getDashboardPath()}>
                  <Button
                    variant={isHomePage ? "outline" : "ghost"}
                    size="sm"
                    className={
                      isHomePage
                        ? "border-white/30 text-white hover:bg-white/10"
                        : ""
                    }
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className={
                    isHomePage
                      ? "border-white/30 text-white hover:bg-white/10"
                      : ""
                  }
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant={isHomePage ? "ghost" : "ghost"}
                    size="sm"
                    className={isHomePage ? "text-white hover:bg-white/10" : ""}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className={
                      isHomePage
                        ? "bg-white text-primary-600 hover:bg-white/90"
                        : ""
                    }
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isHomePage ? "text-white hover:bg-white/10" : ""}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {!isDashboardPage &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-primary-900/50 text-primary-400"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            <div className="mt-4 space-y-2 border-t border-gray-800 pt-4">
              {loading ? (
                <div className="h-10 w-full animate-pulse bg-gray-800 rounded"></div>
              ) : user ? (
                <>
                  <Link
                    href={getDashboardPath()}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-white hover:bg-gray-800"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-white hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-white hover:bg-gray-800"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
