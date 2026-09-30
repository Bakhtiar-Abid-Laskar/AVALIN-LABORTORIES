import type { Classification } from '@/content/types'
import { Badge } from '@/components/ui/Badge'

interface Props {
  classification: Classification
  size?: 'sm' | 'md'
}

export function ClassificationBadge({ classification, size = 'md' }: Props) {
  return <Badge classification={classification} size={size} />
}
