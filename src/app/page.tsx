'use client'

import { Skeleton } from '@/components/skeleton'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl/8 font-bold text-zinc-900 dark:text-white">XtremeX Copy Trading</div>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800">
                {user.photo_url && (
                  <img src={user.photo_url} alt={user.first_name} className="h-full w-full rounded-full object-cover" />
                )}
              </div>
              <div className="text-sm/6 font-medium text-zinc-900 dark:text-white">
                {`${user.first_name} ${user.last_name || ''}`}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Login
            </Link>
          )}
        </div>
        <div className="text-sm/6 text-zinc-500 dark:text-zinc-400">
          Automated cryptocurrency trading platform with advanced copy trading features
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl/8 font-semibold text-zinc-900 dark:text-white">Welcome to XtremeX Copy Trading</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Our platform allows you to automatically copy trades from experienced traders and maximize your profits in
            the cryptocurrency market.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="font-medium text-zinc-900 dark:text-white">Automated Trading</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Set up your account once and let our system handle all trading operations automatically.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="font-medium text-zinc-900 dark:text-white">Copy Expert Traders</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Follow and copy trades from our network of verified expert traders with proven track records.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="font-medium text-zinc-900 dark:text-white">Real-time Analytics</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Monitor your performance with comprehensive real-time statistics and reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="col-span-1 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">Active Traders</div>
              <div className="text-sm/6 font-medium text-emerald-500">+23%</div>
            </div>
            <div className="mt-3 text-3xl/8 font-semibold text-zinc-900 dark:text-white">1,256</div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Join our growing community of traders from around the world.
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">Average Monthly Profit</div>
              <div className="text-sm/6 font-medium text-emerald-500">+15%</div>
            </div>
            <div className="mt-3 text-3xl/8 font-semibold text-zinc-900 dark:text-white">15.7%</div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Our top traders consistently outperform the market.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl/8 font-semibold text-zinc-900 dark:text-white">
            Ready to start your trading journey?
          </h2>
          <p className="max-w-2xl text-zinc-500 dark:text-zinc-400">
            Join thousands of traders who are already using XtremeX Copy Trading to automate their cryptocurrency
            investments.
          </p>
          <Link
            href="/login"
            className="mt-2 rounded-md bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  )
}
