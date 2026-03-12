export type UsageAlertLevel = 'info' | 'warning' | 'critical' | 'limit'

export type UsageAlert = {
  level: UsageAlertLevel
  percent: number
  threshold: number
  message: string
}

const ALERT_THRESHOLDS = [0.8, 0.9, 1]

export function getUsageAlert(minutesUsed: number, minutesLimit: number): UsageAlert | null {
  if (!minutesLimit || minutesLimit <= 0) return null

  const percent = minutesUsed / minutesLimit
  const normalized = Math.min(Math.round(percent * 100), 999)

  if (percent >= ALERT_THRESHOLDS[2]) {
    return {
      level: 'limit',
      percent: normalized,
      threshold: 100,
      message: 'You have reached your monthly minute limit. Upgrade to keep calls flowing.',
    }
  }

  if (percent >= ALERT_THRESHOLDS[1]) {
    return {
      level: 'critical',
      percent: normalized,
      threshold: 90,
      message: 'You are above 90% of your monthly minutes. Upgrade to avoid interruptions.',
    }
  }

  if (percent >= ALERT_THRESHOLDS[0]) {
    return {
      level: 'warning',
      percent: normalized,
      threshold: 80,
      message: 'You have used over 80% of your monthly minutes. Consider upgrading.',
    }
  }

  return null
}
