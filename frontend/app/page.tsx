'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  MapPin,
  Camera,
  HeartHandshake,
  Truck,
  Star,
  ArrowRight,
  Lock,
  Clock,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  Award,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const featuredHelpers = [
    {
      id: 1,
      name: "Premium City Guide",
      rating: 4.8,
      price: "₹2,499",
      period: "per month",
      features: ["Verified KYC", "24/7 Support", "Priority Booking", "Expert Assistance"],
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Standard Helper Package",
      rating: 4.6,
      price: "₹1,799",
      period: "per month",
      features: ["Verified KYC", "Business Hours Support", "Standard Booking", "Reliable Service"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Essential Support Plan",
      rating: 4.5,
      price: "₹1,299",
      period: "per month",
      features: ["Verified KYC", "Email Support", "Basic Booking", "Core Services"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    },
  ];

  const services = [
    {
      icon: MapPin,
      title: "Property Visits",
      description: "Comprehensive property inspections with detailed reports and visual documentation for informed decisions.",
    },
    {
      icon: Camera,
      title: "Documentation Services",
      description: "Professional photo and video documentation of properties and important documents for your records.",
    },
    {
      icon: HeartHandshake,
      title: "Negotiation Support",
      description: "Expert assistance in price negotiations and contract discussions to secure the best deals.",
    },
    {
      icon: Truck,
      title: "Logistics Assistance",
      description: "Reliable pickup and delivery services for essential items during your city transition.",
    },
    {
      icon: Users,
      title: "Local Guidance",
      description: "Personalized on-ground assistance and local insights to help you settle in smoothly.",
    },
    {
      icon: Shield,
      title: "Safety & Verification",
      description: "Thorough background checks and KYC verification ensuring secure and trustworthy connections.",
    },
  ];

  const whyChooseUs = [
    {
      number: "1",
      title: "Verified Professional Helpers",
      description: "All helpers undergo comprehensive background verification and KYC checks for your peace of mind.",
    },
    {
      number: "2",
      title: "Transparent Pricing & Secure Payments",
      description: "Clear pricing with no hidden fees. Payments secured through escrow until task completion.",
    },
    {
      number: "3",
      title: "Rapid Response Service",
      description: "Quick turnaround times with helpers responding within hours to address your urgent needs.",
    },
    {
      number: "4",
      title: "Comprehensive Service Portfolio",
      description: "Wide range of services from property visits to logistics, all in one convenient platform.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 4.5,
      text: "UrbanBuddy made my move to Mumbai seamless. The property visit service was thorough and the helper provided detailed reports that helped me make the right decision. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Rahul Kapoor",
      location: "Bangalore",
      rating: 4.5,
      text: "The negotiation support I received was exceptional. The helper helped me secure a better rental deal and saved me significant money. The platform is trustworthy and the service quality is outstanding.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Delhi",
      rating: 4.5,
      text: "Moving to a new city was overwhelming, but UrbanBuddy's local guidance service made everything easier. The helper was knowledgeable, responsive, and went above and beyond to help me settle in.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="flex flex-col bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
            alt="City skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight font-playfair">
            Your Trusted Partner for Seamless City Transitions
            </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl md:text-2xl text-gray-200 leading-relaxed font-light tracking-wide">
            Connect with verified local helpers who make your move effortless. From property visits to settling in, we&apos;ve got you covered.
            </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                className="text-base px-10 py-7 bg-white text-black hover:bg-gray-100 shadow-2xl hover:shadow-white/30 transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                >
                Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/search">
                <Button 
                  variant="outline" 
                  size="lg" 
                className="text-base px-10 py-7 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-300 font-semibold"
                >
                Explore Services
                </Button>
              </Link>
          </div>
        </div>
      </section>

      {/* Fleet / Featured Helpers Section */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-wide mb-2">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We have a network of over 500 verified helpers ready to assist you.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredHelpers.map((helper) => (
              <Card key={helper.id} className="group overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={helper.image}
                    alt={helper.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <CardHeader className="bg-gray-900/50">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl font-bold text-white">{helper.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-300">{helper.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">{helper.price}</span>
                    <span className="text-sm text-gray-400">/ {helper.period}</span>
                </div>
                  <ul className="space-y-2 mb-6">
                    {helper.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-primary-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardHeader>
                <CardContent className="bg-gray-900/50">
                  <Link href="/register">
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white border-0 shadow-lg hover:shadow-primary-500/50">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wide mb-2">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                We make sure that your every transition is smooth and supported
            </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                UrbanBuddy was founded with a vision to eliminate the stress and uncertainty of moving to a new city. 
                We understand that relocating involves numerous challenges, from finding the right property to understanding 
                local processes and building connections.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Our platform connects you with carefully vetted local helpers who provide personalized assistance, 
                ensuring you have reliable support every step of the way. We prioritize trust, transparency, and 
                quality in every interaction.
              </p>
              <Link href="/about">
                <Button variant="outline" size="lg" className="font-semibold border-gray-700 text-white hover:bg-gray-800 hover:border-primary-500">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
          </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-wide mb-2">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We offer comprehensive assistance services for city transitions and relocations.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 group">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary-600/20 border border-primary-500/30 group-hover:bg-primary-600 group-hover:border-primary-500 transition-all duration-300">
                      <Icon className="h-7 w-7 text-primary-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>
                    <Link href="/search" className="text-primary-400 hover:text-primary-300 font-medium text-sm inline-flex items-center transition-colors">
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-wide mb-2">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore our trusted network of verified helpers and comprehensive support services.
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              UrbanBuddy provides a seamless platform connecting you with verified local helpers. 
              Our commitment to quality, security, and customer satisfaction ensures you receive 
              reliable assistance throughout your city transition journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white text-2xl font-bold shadow-lg shadow-primary-500/30">
                    {item.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Testimonials</h2>
            <div className="flex items-center justify-center gap-1 mb-8">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold text-white">4.5</span>
              <span className="text-gray-400">/5</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(testimonial.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-700'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-300">{testimonial.rating}/5</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">{testimonial.text}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary-500/50">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Taking you anywhere you need support.
          </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Not only for property visits, documentation, and negotiations, but for any assistance you need in your new city.
          </p>
            <Link href="/register">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 bg-white text-black hover:bg-gray-100 shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300 font-semibold mb-12"
              >
                Get Started Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Or give us a call:</p>
              <a href="tel:+916376506645" className="text-3xl font-bold hover:text-primary-400 transition-colors">
                +91 6376506645
              </a>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 border-t border-gray-800 pt-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <p className="text-gray-300 mb-2">Patel Nagar,</p>
              <p className="text-gray-300 mb-4">Patna, Bihar 800001</p>
              <a href="mailto:abhinavashissh@gmail.com" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2 transition-colors">
                <Mail className="h-4 w-4" />
                abhinavashissh@gmail.com
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>– Property Visit Services</li>
                <li>– Documentation Assistance</li>
                <li>– Negotiation Support</li>
                <li>– Logistics & Delivery</li>
                <li>– Local Guidance</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-white">Get Started</h3>
              <p className="text-2xl font-bold mb-2">+91 6376506645</p>
              <p className="text-sm text-gray-400">Available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
