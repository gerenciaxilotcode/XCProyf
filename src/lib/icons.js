import {
  Globe, LayoutDashboard, ShoppingCart, Boxes, Workflow, Wrench,
  Target, Wallet, TrendingUp, Handshake, Sparkles, Rocket, ShieldCheck,
  Users, Clock, Star, Heart, Zap
} from 'lucide-react'

export const ICON_LIBRARY = {
  Globe, LayoutDashboard, ShoppingCart, Boxes, Workflow, Wrench,
  Target, Wallet, TrendingUp, Handshake, Sparkles, Rocket, ShieldCheck,
  Users, Clock, Star, Heart, Zap
}

export const ICON_KEYS = Object.keys(ICON_LIBRARY)

export function getIcon(key) {
  return ICON_LIBRARY[key] || Sparkles
}
