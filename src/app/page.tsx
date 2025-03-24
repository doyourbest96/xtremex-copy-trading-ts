'use client'

import { Button } from '@/components/button'
import Link from 'next/link'
import { BiCookie } from 'react-icons/bi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FaBolt, FaChartLine, FaUsers } from 'react-icons/fa6'
import { HiBookOpen, HiCode, HiNewspaper } from 'react-icons/hi'
import { IoShieldCheckmark } from 'react-icons/io5'
import { MdBusiness, MdContactSupport, MdWorkHistory } from 'react-icons/md'

export default function Home() {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex lg:flex-1">
              <Link href="/" className="flex items-center gap-2">
                <FaBolt className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-zinc-900 dark:text-white">XtremeX</span>
              </Link>
            </div>
            <div className="flex gap-x-6">
              <Link href="/login" className="text-sm leading-6 font-semibold text-zinc-900 dark:text-white">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div className='text-center'>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
                Automated Crypto Trading Made Simple
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Copy successful traders automatically and maximize your profits in the cryptocurrency market. Join
                thousands of traders who trust XtremeX for their automated trading needs.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:gap-x-4">
                <Button href="/login" color="blue">
                  Get started for free
                </Button>
                <Button href="#features" plain>
                  Learn more <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base leading-7 font-semibold text-blue-600">Advanced Trading</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Everything you need to succeed in crypto trading
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Our platform combines advanced trading features with an intuitive interface to help you maximize your
              trading potential.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid gap-8 lg:grid-cols-3">
              <div className="relative rounded-2xl bg-white p-8 dark:bg-zinc-900/50">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-zinc-900 dark:text-white">
                  <FaBolt className="h-5 w-5 text-blue-600" />
                  Automated Trading
                </dt>
                <dd className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Set up your account once and let our system handle all trading operations automatically. Our advanced
                  algorithms work 24/7 to maximize your profits.
                </dd>
              </div>
              <div className="relative rounded-2xl bg-white p-8 dark:bg-zinc-900/50">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-zinc-900 dark:text-white">
                  <FaUsers className="h-5 w-5 text-blue-600" />
                  Copy Expert Traders
                </dt>
                <dd className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Follow and copy trades from our network of verified expert traders with proven track records. Learn
                  from the best and replicate their success.
                </dd>
              </div>
              <div className="relative rounded-2xl bg-white p-8 dark:bg-zinc-900/50">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-zinc-900 dark:text-white">
                  <FaChartLine className="h-5 w-5 text-blue-600" />
                  Real-time Analytics
                </dt>
                <dd className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Monitor your performance with comprehensive real-time statistics and reports. Make data-driven
                  decisions with our advanced analytics tools.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto text-center lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Trusted by traders worldwide
            </h2>
            <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Join our growing community of successful traders and take your crypto trading to the next level.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col gap-y-3 rounded-2xl bg-white p-6 dark:bg-zinc-900/50">
              <dt className="text-sm leading-6 font-semibold text-zinc-900 dark:text-white">Active Users</dt>
              <dd className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">10,000+</dd>
            </div>
            <div className="flex flex-col gap-y-3 rounded-2xl bg-white p-6 dark:bg-zinc-900/50">
              <dt className="text-sm leading-6 font-semibold text-zinc-900 dark:text-white">Total Trading Volume</dt>
              <dd className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">$500M+</dd>
            </div>
            <div className="flex flex-col gap-y-3 rounded-2xl bg-white p-6 dark:bg-zinc-900/50">
              <dt className="text-sm leading-6 font-semibold text-zinc-900 dark:text-white">Expert Traders</dt>
              <dd className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">100+</dd>
            </div>
          </dl>
        </div>

        {/* Testimonials section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto text-center lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              What our traders say
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Discover why thousands of traders choose XtremeX for their automated trading needs.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-3">
            {[
              {
                content:
                  "XtremeX's automated trading system has completely transformed my trading experience. The ability to copy expert traders has been invaluable.",
                author: 'Sarah Chen',
                role: 'Crypto Trader',
              },
              {
                content:
                  'The real-time analytics and performance tracking have helped me make better trading decisions. Highly recommended!',
                author: 'Marcus Rodriguez',
                role: 'Investment Analyst',
              },
              {
                content:
                  'As a busy professional, the automated trading features save me countless hours while maximizing my returns.',
                author: 'Jessica Thompson',
                role: 'Portfolio Manager',
              },
            ].map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between rounded-2xl bg-white p-6 dark:bg-zinc-900/50">
                <blockquote className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {testimonial.content}
                </blockquote>
                <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                  <div className="flex items-center gap-x-4">
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Ready to start trading?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Join XtremeX today and start your journey to successful crypto trading with our automated platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Button href="/login" color="blue">
                Get started
              </Button>
              <Button href="#" plain>
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Company</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <MdBusiness className="h-4 w-4" />
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <MdWorkHistory className="h-4 w-4" />
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <MdContactSupport className="h-4 w-4" />
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Resources</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <HiBookOpen className="h-4 w-4" />
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <HiCode className="h-4 w-4" />
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <HiNewspaper className="h-4 w-4" />
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Legal</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <IoShieldCheckmark className="h-4 w-4" />
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <IoShieldCheckmark className="h-4 w-4" />
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <BiCookie className="h-4 w-4" />
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Social</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <FaTwitter className="h-4 w-4" />
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <p className="flex justify-center text-sm text-zinc-600 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} XtremeX. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
