import Link from 'next/link'
import { Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary-400" />
            <span className="text-lg font-bold text-white">UrbanBuddy</span>
          </Link>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-primary-400 transition-colors">
              About Us
            </Link>
            <Link href="/search" className="hover:text-primary-400 transition-colors">
              Find Helpers
            </Link>
            <Link href="/contact" className="hover:text-primary-400 transition-colors">
              Contact
                  </Link>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">
              Terms
                  </Link>
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">
              Privacy
                  </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} UrbanBuddy | Powered by UrbanBuddy
          </p>
        </div>
      </div>
    </footer>
  )
}
