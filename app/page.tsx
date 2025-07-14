"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users,
  Plane,
  Star,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Heart,
  MessageCircle,
  MapPin,
  Calendar,
  Shield,
  Brain,
  LogIn,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const feedbacks = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York",
    rating: 5,
    comment:
      "Amazing experience! The community planning made our Europe trip unforgettable. The AI suggestions were spot-on!",
    avatar: "/placeholder.svg?height=40&width=40",
    tripDestination: "Europe",
    tripDate: "March 2024",
  },
  {
    id: 2,
    name: "Mike Chen",
    location: "San Francisco",
    rating: 5,
    comment:
      "The trip saver wallet helped me save systematically. Joined an amazing Japan community and made lifelong friends!",
    avatar: "/placeholder.svg?height=40&width=40",
    tripDestination: "Japan",
    tripDate: "April 2024",
  },
  {
    id: 3,
    name: "Emma Wilson",
    location: "London",
    rating: 5,
    comment:
      "Love the donation feature! Helped fund a trip for orphans to Disneyland. The community support was incredible!",
    avatar: "/placeholder.svg?height=40&width=40",
    tripDestination: "California",
    tripDate: "May 2024",
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Madrid",
    rating: 5,
    comment:
      "Connected with amazing travelers through the social features. The polling system made group decisions so easy!",
    avatar: "/placeholder.svg?height=40&width=40",
    tripDestination: "Thailand",
    tripDate: "June 2024",
  },
]

const communityStats = [
  { label: "Active Communities", value: "2,847", icon: Users },
  { label: "Trips Completed", value: "15,632", icon: Plane },
  { label: "Money Saved", value: "$2.4M", icon: Wallet },
  { label: "Lives Impacted", value: "8,921", icon: Heart },
]

export default function HomePage() {
  const [currentFeedback, setCurrentFeedback] = useState(0)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  const nextFeedback = () => {
    setCurrentFeedback((prev) => (prev + 1) % feedbacks.length)
  }

  const prevFeedback = () => {
    setCurrentFeedback((prev) => (prev - 1 + feedbacks.length) % feedbacks.length)
  }

  useEffect(() => {
    const interval = setInterval(nextFeedback, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleGoogleAuth = async () => {
    // Simulate Google authentication
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: authMode }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        setIsAuthenticated(true)
        setShowAuthDialog(false)
      }
    } catch (error) {
      console.error("Authentication failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-[#0D9488]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#0D9488] to-purple-600 bg-clip-text text-transparent">
                TravelMate
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/go-for-trip" className="text-gray-700 hover:text-[#0D9488] transition">
                Go for Trip
              </Link>
              <Link href="/trip-planner" className="text-gray-700 hover:text-[#0D9488] transition">
                Trip Planner
              </Link>
              <Link href="/trip-saver" className="text-gray-700 hover:text-[#0D9488] transition">
                Trip Saver
              </Link>
              <Link href="/donate-trip" className="text-gray-700 hover:text-[#0D9488] transition">
                Donate Trip
              </Link>
              <Link href="/connecting" className="text-gray-700 hover:text-[#0D9488] transition">
                Connecting
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
              ) : (
                <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{authMode === "login" ? "Welcome Back" : "Join TravelMate"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Button
                          variant={authMode === "login" ? "default" : "outline"}
                          onClick={() => setAuthMode("login")}
                          className="flex-1"
                        >
                          Login
                        </Button>
                        <Button
                          variant={authMode === "signup" ? "default" : "outline"}
                          onClick={() => setAuthMode("signup")}
                          className="flex-1"
                        >
                          Sign Up
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                        {authMode === "signup" && (
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your full name" />
                          </div>
                        )}
                      </div>

                      <Button onClick={handleGoogleAuth} className="w-full bg-red-500 hover:bg-red-600 text-white">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </Button>

                      <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                        {authMode === "login" ? "Sign In" : "Create Account"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-[#0D9488] to-purple-600 text-white border-0">
              🌍 Plan, Connect, Travel – Together
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Your Travel
              <span className="block bg-gradient-to-r from-[#0D9488] to-purple-600 bg-clip-text text-transparent">
                Community Awaits
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join communities, plan trips with AI assistance, save money together, and make unforgettable memories.
              Connect with fellow travelers and explore the world safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/go-for-trip">
                <Button size="lg" className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl px-8 py-4 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Go for a Trip
                </Button>
              </Link>
              <Link href="/trip-planner">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl px-8 py-4 text-lg bg-transparent"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  AI Trip Planner
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg rounded-2xl text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-[#0D9488]" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Everything You Need for Perfect Trips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/go-for-trip">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-[#0D9488]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Go for a Trip</h3>
                    <p className="text-gray-600">
                      Join existing communities or create your own. Plan trips together with real-time chat and polling.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/trip-planner">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">AI Trip Planner</h3>
                    <p className="text-gray-600">
                      Get personalized recommendations and create perfect itineraries with our AI assistant.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/trip-saver">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Wallet className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Trip Saver</h3>
                    <p className="text-gray-600">
                      Save money systematically for your dream trips with our smart wallet system.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/donate-trip">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Heart className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Donate Trip</h3>
                    <p className="text-gray-600">
                      Help fund trips for orphans and special individuals. Make dreams come true.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/connecting">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Connecting</h3>
                    <p className="text-gray-600">
                      Connect with random travelers, share experiences, and build your travel network.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Safe & Secure</h3>
                  <p className="text-gray-600">
                    Travel with confidence knowing your payments and personal data are protected.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Feedback Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Our Community Says</h2>
          <div className="relative">
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#0D9488] to-purple-600 text-white p-12">
                <div className="flex items-center justify-between mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevFeedback}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <div className="flex space-x-2">
                    {feedbacks.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentFeedback ? "bg-white" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextFeedback}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                <motion.div
                  key={currentFeedback}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(feedbacks[currentFeedback].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl mb-6 italic">"{feedbacks[currentFeedback].comment}"</blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={feedbacks[currentFeedback].avatar || "/placeholder.svg"}
                      alt={feedbacks[currentFeedback].name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <p className="font-semibold">{feedbacks[currentFeedback].name}</p>
                      <p className="text-white/80">{feedbacks[currentFeedback].location}</p>
                      <div className="flex items-center space-x-2 text-sm text-white/70">
                        <MapPin className="h-3 w-3" />
                        <span>{feedbacks[currentFeedback].tripDestination}</span>
                        <Calendar className="h-3 w-3 ml-2" />
                        <span>{feedbacks[currentFeedback].tripDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0D9488] via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers who are already planning amazing trips together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/go-for-trip">
              <Button size="lg" className="bg-white text-[#0D9488] hover:bg-gray-100 rounded-xl px-8 py-4 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAuthDialog(true)}
              className="border-white text-white hover:bg-white hover:text-[#0D9488] rounded-xl px-8 py-4 text-lg bg-transparent"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-8 w-8 text-[#0D9488]" />
                <span className="text-2xl font-bold">TravelMate</span>
              </div>
              <p className="text-gray-400">
                Your trusted companion for community-based travel planning and unforgettable adventures.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/go-for-trip" className="hover:text-white transition">
                    Go for Trip
                  </Link>
                </li>
                <li>
                  <Link href="/trip-planner" className="hover:text-white transition">
                    Trip Planner
                  </Link>
                </li>
                <li>
                  <Link href="/trip-saver" className="hover:text-white transition">
                    Trip Saver
                  </Link>
                </li>
                <li>
                  <Link href="/donate-trip" className="hover:text-white transition">
                    Donate Trip
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/connecting" className="hover:text-white transition">
                    Connecting
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Travel Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TravelMate. Making travel dreams come true, together.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
