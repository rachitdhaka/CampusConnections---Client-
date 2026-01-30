"use client";

import React from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Users,
  Radar,
  Globe2,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Github,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import bgDark from "@/public/bgDark.webp";
import bgLight from "@/public/bgLight.webp";
import { Globe } from "@/components/ui/globe";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ============================================================================
// DATA
// ============================================================================

const features = [
  {
    icon: Radar,
    title: "Live Radar",
    description:
      "Real-time geospatial visualization of your network. No noise, just signal.",
  },
  {
    icon: MapPin,
    title: "Drop Your Pin",
    description:
      "Mark your location and instantly discover alumni in your city or neighborhood.",
  },
  {
    icon: Users,
    title: "Find Your People",
    description:
      "Reconnect with batchmates, seniors, and mentors scattered across the globe.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "You control your visibility. Share only what you want, with who you want.",
  },
];

const stats = [
  { value: "10+", label: "Alumni Connected" },
  { value: "5+", label: "Cities Mapped" },
 
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const Navbar = () => {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl"
    >
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/30">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-bold text-lg tracking-tight text-neutral-900 dark:text-white"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-chart-5 to-amber-500 flex items-center justify-center">
            <Radar className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif">Orbit</span>
        </a>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <a
              href="/sign-in"
              className="hidden sm:block text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Sign in
            </a>
            <a
              href="/sign-up"
              className="text-sm px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </SignedOut>
          <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />
          <AnimatedThemeToggler />
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />

      {/* Decorative orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-chart-5/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div  className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50">
              <Sparkles className="w-3.5 h-3.5 text-chart-5" />
              The signal for the scattered
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter font-bold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 block font-serif ">
            Reconnect <span className="text-chart-5">Rediscover</span> Reunite
          </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Orbit replaces the noise of social feeds with a{" "}
            <span className="text-neutral-900 dark:text-white font-medium">
              live geospatial radar
            </span>
            , helping you locate batchmates, mentors, and friends hidden in your
            new city.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/dashboard"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:scale-105 transition-transform duration-300 shadow-xl shadow-neutral-900/20 dark:shadow-white/20"
            >
              <MapPin className="w-4 h-4" />
              Drop your pin
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors duration-300"
            >
              See how it works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-neutral-200/50 dark:border-neutral-800/50"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const ScreenshotSection = () => {
  return (
    <section className="relative py-8 px-6">
      {/* Decorative lines */}
      <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-400/50 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-400/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mask-b-from-55% relative overflow-hidden">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl md:rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 p-2 md:p-4 shadow-2xl shadow-neutral-900/10 dark:shadow-black/30 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <Image
              className="aspect-[15/8] relative hidden rounded-lg md:rounded-xl dark:block w-full h-auto"
              src={bgDark}
              alt="Orbit map dashboard"
              width={2700}
              height={1440}
              priority
            />
            <Image
              className="aspect-[15/8] relative block rounded-lg md:rounded-xl dark:hidden w-full h-auto"
              src={bgLight}
              alt="Orbit map dashboard"
              width={2700}
              height={1440}
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-chart-5 mb-3 block">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Your network, <span className="font-serif italic">visualized</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Everything you need to stay connected with the people who matter,
            wherever life takes you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
             
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm hover:border-chart-5/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-chart-5/10 transition-colors w-fit mb-5">
                <feature.icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-chart-5 transition-colors" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Create your profile",
      description:
        "Sign up with your campus email. Add your graduation year, current city, and what brings you there.",
    },
    {
      step: "02",
      title: "Drop your pin",
      description:
        "Mark your location on the map. You control the precision — city level or neighborhood.",
    },
    {
      step: "03",
      title: "Discover & connect",
      description:
        "Explore the radar. See who's nearby. Reach out to old friends or make new connections.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-chart-5 mb-3 block">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Simple as <span className="font-serif italic">1-2-3</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-neutral-100 dark:text-neutral-800 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlobeSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              The best connections
              <br />
              <span className="font-serif italic text-chart-5">
                don't end at graduation
              </span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              Whether you're starting a new job in a new city, traveling for
              work, or just curious who's around — Orbit helps you find familiar
              faces in unfamiliar places.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:scale-105 transition-transform duration-300"
            >
              Join the network
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Globe */}
          <div className="relative flex items-center justify-center w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 p-8 pb-32 md:pb-40">
            <span className="font-serif pointer-events-none bg-gradient-to-b tracking-tight from-black to-gray-300/80 bg-clip-text text-center text-4xl md:text-6xl whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 z-10">
              Connect
            </span>
            <Globe className="top-28" />
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-700/50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-chart-5/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find your{" "}
              <span className="font-serif italic text-chart-5">orbit</span>?
            </h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
              Join thousands of alumni who are already reconnecting. Drop your
              pin and discover who's in your city.
            </p>
            <a
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-neutral-900 font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              <Zap className="w-4 h-4" />
              Get started — It's free
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-chart-5 to-amber-500 flex items-center justify-center">
              <Radar className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif">Orbit</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-500">
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Twitter className="w-4 h-4 text-neutral-500 dark:text-neutral-500" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-4 h-4 text-neutral-500 dark:text-neutral-500" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50 text-center text-sm text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} Orbit. Crafted with{" "}
          <span className="text-chart-5">♥</span> for the scattered.
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LandingPageNew() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-neutral-950 overflow-x-hidden">
      {/* Subtle grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <Navbar />
      <HeroSection />
      <ScreenshotSection />
      <FeaturesSection />
      <HowItWorksSection />
      <GlobeSection />
      <CTASection />
      <Footer />
    </main>
  );
}
