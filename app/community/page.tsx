"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Users, Calendar, DollarSign, Search, Plus, MessageCircle, ArrowLeft, Crown, User } from "lucide-react"
import Link from "next/link"

const communities = [
  {
    id: 1,
    name: "Backpacking Europe 2024",
    destination: "Europe",
    members: 12,
    maxMembers: 15,
    budget: "$2000-3000",
    startDate: "June 15, 2024",
    admin: "Sarah Johnson",
    description: "Join us for an epic backpacking adventure across Europe! We'll visit 8 countries in 3 weeks.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Backpacking", "Budget", "Adventure"],
  },
  {
    id: 2,
    name: "Japan Cherry Blossom Tour",
    destination: "Japan",
    members: 8,
    maxMembers: 10,
    budget: "$3000-4000",
    startDate: "March 20, 2024",
    admin: "Mike Chen",
    description: "Experience the magical cherry blossom season in Japan with fellow travelers.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Culture", "Photography", "Spring"],
  },
  {
    id: 3,
    name: "Southeast Asia Digital Nomads",
    destination: "Thailand, Vietnam, Indonesia",
    members: 15,
    maxMembers: 20,
    budget: "$1500-2500",
    startDate: "January 10, 2024",
    admin: "Emma Wilson",
    description: "Work remotely while exploring the best of Southeast Asia. Perfect for digital nomads!",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Digital Nomad", "Work Travel", "Long-term"],
  },
]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState<(typeof communities)[0] | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleJoinCommunity = (communityId: number) => {
    console.log("Joining community:", communityId)
    // In real app: POST /api/community/:id/join
  }

  const handleCreateCommunity = (formData: FormData) => {
    console.log("Creating community:", Object.fromEntries(formData))
    // In real app: POST /api/community/create
    setShowCreateDialog(false)
  }

  if (selectedCommunity) {
    return <CommunityDetail community={selectedCommunity} onBack={() => setSelectedCommunity(null)} />
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
            <h1 className="text-2xl font-bold text-gray-900">Travel Communities</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Travel Tribe</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join existing communities or create your own. Plan amazing trips together with like-minded travelers.
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search communities by destination or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
            />
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl px-6">
                <Plus className="mr-2 h-5 w-5" />
                Create Community
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Community</DialogTitle>
              </DialogHeader>
              <form action={handleCreateCommunity} className="space-y-4">
                <div>
                  <Label htmlFor="name">Community Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Backpacking Europe 2024" required />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" name="destination" placeholder="e.g., Europe, Japan, Thailand" required />
                </div>
                <div>
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Select name="maxMembers">
                    <SelectTrigger>
                      <SelectValue placeholder="Select max members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 members</SelectItem>
                      <SelectItem value="10">10 members</SelectItem>
                      <SelectItem value="15">15 members</SelectItem>
                      <SelectItem value="20">20 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select name="budget">
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000">$500-1000</SelectItem>
                      <SelectItem value="1000-2000">$1000-2000</SelectItem>
                      <SelectItem value="2000-3000">$2000-3000</SelectItem>
                      <SelectItem value="3000+">$3000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Describe your trip..." />
                </div>
                <Button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                  Create Community
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Communities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card
              key={community.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900">
                    {community.members}/{community.maxMembers} members
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{community.name}</CardTitle>
                <div className="flex items-center text-gray-600 space-x-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {community.destination}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {community.startDate}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {community.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {community.budget}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCommunity(community)}
                      className="rounded-lg"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleJoinCommunity(community.id)}
                      className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-lg"
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or create a new community</p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl"
            >
              Create Your Community
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function CommunityDetail({ community, onBack }: { community: (typeof communities)[0]; onBack: () => void }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, user: "Sarah Johnson", message: "Hey everyone! Excited for this trip!", time: "2:30 PM", isAdmin: true },
    {
      id: 2,
      user: "Mike Chen",
      message: "Same here! Should we start planning the itinerary?",
      time: "2:32 PM",
      isAdmin: false,
    },
    {
      id: 3,
      user: "Emma Wilson",
      message: "I created a poll for our first destination. Please vote!",
      time: "2:35 PM",
      isAdmin: false,
    },
  ])

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          message: message.trim(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAdmin: false,
        },
      ])
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={onBack} className="flex items-center space-x-2 text-[#0D9488]">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-semibold">Back to Communities</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">{community.name}</h1>
            <Link href="/dashboard">
              <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl mb-6">
              <CardHeader>
                <img
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <CardTitle className="text-2xl">{community.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Admin: {community.admin}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Members</span>
                    <Badge>
                      {community.members}/{community.maxMembers}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-semibold">{community.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-semibold">{community.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Destination</span>
                    <span className="font-semibold">{community.destination}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{community.description}</p>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Poll */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Quick Poll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Which city should we visit first?</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm">Paris</span>
                      <Badge>5 votes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm">Rome</span>
                      <Badge>3 votes</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm">Barcelona</span>
                      <Badge>4 votes</Badge>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-2xl h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Community Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {msg.isAdmin ? <Crown className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{msg.user}</span>
                          {msg.isAdmin && <Crown className="h-3 w-3 text-yellow-500" />}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 rounded-xl"
                  />
                  <Button onClick={sendMessage} className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
