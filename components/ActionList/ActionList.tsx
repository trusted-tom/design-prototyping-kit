import React from 'react'
import { ActionRow } from '../ActionRow/ActionRow'

export interface ActionListItem {
  id: string
  label: string
  description?: string
  size?: 'small' | 'medium'
  type?: 'default' | 'subtle'
  leadingIcon?: React.ReactNode
  counter?: string
  showTag?: boolean
  tagLabel?: string
  onClick?: () => void
}

export interface ActionListProps {
  items: ActionListItem[]
  className?: string
}

export const ActionList: React.FC<ActionListProps> = ({ items, className = '' }) => {
  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {items.map(({ id, ...itemProps }) => (
        <ActionRow key={id} {...itemProps} />
      ))}
    </div>
  )
}
