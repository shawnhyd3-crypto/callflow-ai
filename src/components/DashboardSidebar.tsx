'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  Phone,
  BarChart3,
  BarChart2,
  Settings,
  PhoneIncoming,
  Bot,
  ChevronDown,
} from 'lucide-react'
import clsx from 'clsx'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart2,
    },
    {
      name: 'Agents',
      href: '/dashboard/agents',
      icon: Bot,
    },
    {
      name: 'Calls',
      href: '/dashboard/calls',
      icon: PhoneIncoming,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ]

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Phone className="w-6 h-6 text-primary-500" />
          <span className="text-lg font-bold gradient-text">CallFlow AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-600/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div
          className="relative"
          tabIndex={0}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setMenuOpen(false)
            }
          }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center space-x-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-100">
                {session?.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? 'User'}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span>
                    {(session?.user?.name ?? session?.user?.email ?? 'U')[0]}
                  </span>
                )}
              </span>
              <span className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {session?.user?.name ?? 'Account'}
                </span>
                <span className="text-xs text-slate-500">
                  {session?.user?.email ?? 'View profile'}
                </span>
              </span>
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {menuOpen && (
            <div className="absolute bottom-12 left-0 right-0 z-20 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-xl">
              <Link
                href="/dashboard/profile"
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
              >
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
              >
                Org Settings
              </Link>
              <Link
                href="/dashboard/billing"
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
              >
                Billing
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="mt-1 flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
