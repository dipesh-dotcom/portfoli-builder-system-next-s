"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Carousel } from "./Carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Zap,
  Shield,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Eye,
  TrendingUp,
} from "lucide-react";

// Mock data for most viewed portfolios
const mostViewedPortfolios = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Computer Science Student",
    views: 1250,
    rating: 4.8,
    image: "/api/placeholder/300/200",
    skills: ["React", "Node.js", "Python"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Data Science Graduate",
    views: 980,
    rating: 4.9,
    image: "/api/placeholder/300/200",
    skills: ["Machine Learning", "SQL", "Tableau"],
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    title: "UX/UI Designer",
    views: 1450,
    rating: 4.7,
    image: "/api/placeholder/300/200",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
];

const features = [
  {
    icon: Palette,
    title: "Customizable Templates",
    description:
      "Choose from professionally designed templates and customize them to match your style.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern technologies for optimal performance and user experience.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security and privacy measures.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join a community of students and professionals sharing their success stories.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Basic portfolio template",
      "Up to 3 projects",
      "Basic customization",
      "Mobile responsive",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "month",
    description: "For serious portfolio builders",
    features: [
      "All templates unlocked",
      "Unlimited projects",
      "Advanced customization",
      "Custom domain support",
      "Analytics dashboard",
      "Priority support",
    ],
    buttonText: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label solution",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Build Your Student Portfolio{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                in Minutes
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Create a professional online portfolio to highlight your
              education, achievements, and experience — all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3">
                View Demo
              </Button>
            </motion.div>
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Carousel />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to create a stunning portfolio that showcases
              your skills and achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Viewed Portfolios Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Most Viewed Portfolios
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get inspired by successful portfolios from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostViewedPortfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <CardContainer className="inter-var h-full">
                  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      {portfolio.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                      {portfolio.title}
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      className="w-full mt-4 flex-grow"
                    >
                      <div className="aspect-video bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900 dark:to-pink-900 rounded-xl flex items-center justify-center">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          <Users className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Portfolio Preview</p>
                        </div>
                      </div>
                    </CardItem>
                    <div className="flex justify-between items-center mt-4">
                      <CardItem
                        translateZ={20}
                        as="div"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current mr-1" />
                          <span>{portfolio.rating}</span>
                        </div>
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as="div"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      >
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{portfolio.views} views</span>
                        </div>
                      </CardItem>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {portfolio.skills.map((skill) => (
                        <CardItem
                          key={skill}
                          translateZ={20}
                          as="span"
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full"
                        >
                          {skill}
                        </CardItem>
                      ))}
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular ? "border-indigo-500 shadow-lg" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {plan.price}
                      <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                        /{plan.period}
                      </span>
                    </div>
                    <CardDescription className="text-center">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About PortScore
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to help students and graduates create
              professional portfolios that open doors to their dream careers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering the Next Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                PortScore was founded with the belief that every student
                deserves a platform to showcase their talents and achievements.
                Our platform combines modern design with powerful features to
                help you stand out in today's competitive job market.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of students who have already created stunning
                portfolios and landed their dream jobs with our easy-to-use
                platform.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    500+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Portfolios Created
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    95%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    User Satisfaction
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900 dark:to-pink-900 rounded-2xl p-8 text-center"
            >
              <div className="text-6xl mb-4">🚀</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Get Started?
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create your professional portfolio in minutes and start
                showcasing your achievements to the world.
              </p>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Create Your Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
