'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Phone,
  BarChart3,
  BarChart2,
  Settings,
  PhoneIncoming,
  Bot,
  LogOut,
} from 'lucide-react'
import clsx from 'clsx'

export default function DashboardSidebar() {
  const pathname = usePathname()

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
        <button className="w-full flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
