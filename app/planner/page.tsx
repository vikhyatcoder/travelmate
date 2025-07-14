"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  Clock,
  ArrowLeft,
  Plane,
  Hotel,
  Camera,
  Utensils,
} from "lucide-react"
import Link from "next/link"

interface TripPlan {
  destination: string
  duration: string
  budget: string
  travelers: string
  interests: string[]
  itinerary: {
    day: number
    title: string
    activities: string[]
    accommodation: string
    meals: string[]
    estimated_cost: string
  }[]
  total_estimated_cost: string
  best_time_to_visit: string
  travel_tips: string[]
}

export default function TripPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null)
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    budget: "",
    travelers: "",
    interests: "",
    additional_preferences: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateTripPlan = async () => {
    setIsGenerating(true)

    // Simulate AI trip planning
    setTimeout(() => {
      const mockPlan: TripPlan = {
        destination: formData.destination || "Tokyo, Japan",
        duration: formData.duration || "7 days",
        budget: formData.budget || "$2000-3000",
        travelers: formData.travelers || "2 people",
        interests: formData.interests
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean) || ["Culture", "Food", "Photography"],
        itinerary: [
          {
            day: 1,
            title: "Arrival & Tokyo Exploration",
            activities: [
              "Arrive at Narita Airport",
              "Check into hotel in Shibuya",
              "Visit Shibuya Crossing",
              "Explore Harajuku district",
            ],
            accommodation: "Hotel in Shibuya district",
            meals: ["Welcome dinner at local izakaya", "Try authentic ramen"],
            estimated_cost: "$150-200",
          },
          {
            day: 2,
            title: "Traditional Tokyo",
            activities: ["Visit Senso-ji Temple", "Explore Asakusa district", "Tokyo National Museum", "Ueno Park"],
            accommodation: "Same hotel",
            meals: ["Traditional Japanese breakfast", "Lunch at Tsukiji Market", "Dinner in Ginza"],
            estimated_cost: "$120-180",
          },
          {
            day: 3,
            title: "Modern Tokyo & Technology",
            activities: ["TeamLab Borderless", "Odaiba district", "Tokyo Skytree", "Akihabara electronics district"],
            accommodation: "Same hotel",
            meals: ["Breakfast at hotel", "Lunch in Odaiba", "Dinner in Akihabara"],
            estimated_cost: "$180-250",
          },
        ],
        total_estimated_cost: "$1800-2500 for 2 people",
        best_time_to_visit: "March-May (Spring) or September-November (Fall)",
        travel_tips: [
          "Get a JR Pass for unlimited train travel",
          "Download Google Translate app with camera feature",
          "Carry cash as many places don't accept cards",
          "Bow slightly when greeting people",
          "Remove shoes when entering homes or certain restaurants",
        ],
      }

      setTripPlan(mockPlan)
      setIsGenerating(false)
    }, 3000)
  }

  if (tripPlan) {
    return <TripPlanResult plan={tripPlan} onBack={() => setTripPlan(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#0D9488]" />
              <span className="text-lg font-semibold text-gray-900">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">AI Trip Planner</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-12 w-12 text-[#0D9488]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Trip Planner</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized travel itineraries created by advanced AI. Just tell us your preferences and let us plan
            your perfect trip!
          </p>
        </div>

        {/* Planning Form */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Plan Your Perfect Trip</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="destination" className="text-base font-semibold">
                  Destination
                </Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="destination"
                    placeholder="e.g., Tokyo, Japan"
                    value={formData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    className="pl-10 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration" className="text-base font-semibold">
                  Trip Duration
                </Label>
                <Select onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 days">3 days</SelectItem>
                    <SelectItem value="5 days">5 days</SelectItem>
                    <SelectItem value="7 days">1 week</SelectItem>
                    <SelectItem value="10 days">10 days</SelectItem>
                    <SelectItem value="14 days">2 weeks</SelectItem>
                    <SelectItem value="21 days">3 weeks</SelectItem>
                    <SelectItem value="30 days">1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget" className="text-base font-semibold">
                  Budget Range
                </Label>
                <Select onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$500-1000">$500-1000</SelectItem>
                    <SelectItem value="$1000-2000">$1000-2000</SelectItem>
                    <SelectItem value="$2000-3000">$2000-3000</SelectItem>
                    <SelectItem value="$3000-5000">$3000-5000</SelectItem>
                    <SelectItem value="$5000+">$5000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="travelers" className="text-base font-semibold">
                  Number of Travelers
                </Label>
                <Select onValueChange={(value) => handleInputChange("travelers", value)}>
                  <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]">
                    <SelectValue placeholder="Select travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 person">Solo traveler</SelectItem>
                    <SelectItem value="2 people">2 people</SelectItem>
                    <SelectItem value="3-4 people">3-4 people</SelectItem>
                    <SelectItem value="5-6 people">5-6 people</SelectItem>
                    <SelectItem value="7+ people">Large group (7+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="interests" className="text-base font-semibold">
                Interests & Activities
              </Label>
              <Input
                id="interests"
                placeholder="e.g., Culture, Food, Adventure, Photography, Museums"
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
                className="mt-2 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
              />
              <p className="text-sm text-gray-500 mt-1">Separate multiple interests with commas</p>
            </div>

            <div>
              <Label htmlFor="preferences" className="text-base font-semibold">
                Additional Preferences
              </Label>
              <Textarea
                id="preferences"
                placeholder="Any specific requirements, dietary restrictions, accessibility needs, or special requests..."
                value={formData.additional_preferences}
                onChange={(e) => handleInputChange("additional_preferences", e.target.value)}
                className="mt-2 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488] min-h-[100px]"
              />
            </div>

            <Button
              onClick={generateTripPlan}
              disabled={isGenerating || !formData.destination}
              className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl py-4 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Perfect Trip...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Trip Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-[#0D9488]" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI analyzes millions of travel data points to create personalized itineraries
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-[#0D9488]" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get detailed trip plans in seconds, not hours of manual research</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-[#0D9488]" />
              </div>
              <h3 className="font-semibold mb-2">Local Insights</h3>
              <p className="text-gray-600 text-sm">Discover hidden gems and local experiences that guidebooks miss</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function TripPlanResult({ plan, onBack }: { plan: TripPlan; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={onBack} className="flex items-center space-x-2 text-[#0D9488]">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-semibold">Back to Planner</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Your Trip Plan</h1>
            <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">Save Plan</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Overview */}
        <Card className="border-0 shadow-xl rounded-2xl mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{plan.destination}</CardTitle>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    {plan.budget}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {plan.travelers}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Estimated Cost</p>
                <p className="text-2xl font-bold text-[#0D9488]">{plan.total_estimated_cost}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Your Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {plan.interests.map((interest, index) => (
                    <Badge key={index} className="bg-[#0D9488]/10 text-[#0D9488]">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Best Time to Visit</h3>
                <p className="text-gray-700">{plan.best_time_to_visit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itinerary */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
            <div className="space-y-6">
              {plan.itinerary.map((day) => (
                <Card key={day.day} className="border-0 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 bg-[#0D9488] text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        {day.day}
                      </div>
                      {day.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Camera className="h-4 w-4 mr-2 text-[#0D9488]" />
                          Activities
                        </h4>
                        <ul className="space-y-1">
                          {day.activities.map((activity, index) => (
                            <li key={index} className="text-gray-700 text-sm">
                              • {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Hotel className="h-4 w-4 mr-2 text-[#0D9488]" />
                          Accommodation
                        </h4>
                        <p className="text-gray-700 text-sm">{day.accommodation}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Utensils className="h-4 w-4 mr-2 text-[#0D9488]" />
                          Meals
                        </h4>
                        <ul className="space-y-1">
                          {day.meals.map((meal, index) => (
                            <li key={index} className="text-gray-700 text-sm">
                              • {meal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-sm text-gray-600">Estimated daily cost:</span>
                        <Badge className="bg-green-100 text-green-800">{day.estimated_cost}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Travel Tips */}
          <div>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Travel Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.travel_tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#0D9488]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#0D9488] text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-2xl mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                  <Users className="mr-2 h-4 w-4" />
                  Share with Community
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl bg-transparent"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add to Wallet
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl bg-transparent"
                >
                  <Plane className="mr-2 h-4 w-4" />
                  Book Flights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
