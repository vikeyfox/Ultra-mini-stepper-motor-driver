import {
  BookOpen, CalendarDays, Clock, Flame, Globe2, Headphones, MessageSquare,
  Mountain, Rocket, Target, Trophy, Zap
} from 'lucide-react';

const ICONS = {
  rocket: Rocket,
  flame: Flame,
  calendar: CalendarDays,
  zap: Zap,
  trophy: Trophy,
  globe: Globe2,
  target: Target,
  message: MessageSquare,
  book: BookOpen,
  headphones: Headphones,
  mountain: Mountain,
  clock: Clock
};

export default function AchievementIcon({ name = 'rocket', size = 22 }) {
  const Component = ICONS[name] || Rocket;
  return <Component size={size} />;
}
