"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none grid-background opacity-40 dark:opacity-20" />

      <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Build Your Perfect{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Portfolio
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Showcase your skills, projects, and achievements effortlessly. Connect
          your GitHub, track your growth, and generate professional reports and
          videos automatically.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link href={"/sign-up"}>Get Started</Link>
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </motion.div>

        {/* Features Highlights */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              GitHub Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Display your repositories, contributions, and activity stats
              automatically for a dynamic portfolio.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Skill & Project Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Organize your skills, projects, experiences, and achievements in
              one interactive dashboard.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Report & Video Generation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Generate PDF reports or short video summaries of your portfolio to
              impress recruiters.
            </p>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Why Choose Portfolio Builder?
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-1" />
                Automatic GitHub integration with real-time stats.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-1" />
                Create professional reports and shareable portfolio links.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-1" />
                Manage your skills, projects, experiences, and achievements
                easily.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-1" />
                Quick video summaries to impress clients or recruiters.
              </li>
            </ul>
          </div>
          {/* Video Preview */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-border bg-card glass-card">
            <video
              src="/assets/portfolio-demo.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {[
            {
              name: "Jane Doe",
              feedback:
                "This tool helped me organize my projects and impress recruiters with automated reports.",
              image: "/assets/testimonial1.jpg",
            },
            {
              name: "John Smith",
              feedback:
                "The GitHub integration and video summaries are game changers for showcasing my work.",
              image: "/assets/testimonial2.jpg",
            },
            {
              name: "Alice Johnson",
              feedback:
                "Portfolio Builder System made creating a professional portfolio effortless.",
              image: "/assets/testimonial3.jpg",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={60}
                height={60}
                className="rounded-full mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                "{t.feedback}"
              </p>
              <p className="text-indigo-600 font-semibold">{t.name}</p>
            </div>
          ))}
        </motion.div>

        {/* Newsletter / Early Access
        <motion.div
          className="mt-16 bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-white font-semibold text-lg">
            Get early access and updates directly in your inbox!
          </p>
          <Button className="bg-white text-indigo-600 hover:bg-gray-100">
            Subscribe
          </Button>
        </motion.div> */}

        {/* Final CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link href="/sign-up">Start Building Your Portfolio </Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
