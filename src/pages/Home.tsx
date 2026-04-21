import React from 'react'
import { Link } from 'react-router-dom'
import { IconChevronRight } from '../icons/index'

interface NavCardProps {
  label: string
  to: string
}

const NavCard: React.FC<NavCardProps> = ({ label, to }) => (
  <Link
    to={to}
    className="flex items-center justify-between px-[var(--space-lg)] py-[var(--space-md)] bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] font-semibold text-colour-primary-700 no-underline hover:bg-[var(--colour-grey-50)]"
    style={{ fontSize: 'var(--font-size-base)', textDecoration: 'none' }}
  >
    <span>{label}</span>
    <IconChevronRight />
  </Link>
)

export const Home: React.FC = () => (
  <div className="min-h-screen p-[var(--space-xxl)]">
    <div className="max-w-[640px] mx-auto">

      <div className="mb-[var(--space-xxl)]">
        <h1 className="text-2xl font-bold text-colour-primary-700 m-0 mb-[var(--space-xxs)]">
          Design Prototyping Kit
        </h1>
        <p className="text-colour-grey-700 m-0" style={{ fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-6)' }}>
          Select a screen or prototype to preview
        </p>
      </div>

      <div className="flex flex-col gap-[var(--space-xxl)]">

        <section className="flex flex-col gap-[var(--space-md)]">
          <h2 className="text-colour-primary-700 font-semibold m-0" style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-7)' }}>
            Screens
          </h2>
          <NavCard label="Describe your home" to="/screens/describe-home" />
        </section>

        <section className="flex flex-col gap-[var(--space-md)]">
          <h2 className="text-colour-primary-700 font-semibold m-0" style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-7)' }}>
            Prototypes
          </h2>
          <NavCard label="Listing Description — AI Generate" to="/prototypes/listing-description-ai" />
        </section>

        <div className="pt-[var(--space-lg)] border-t border-[var(--color-border-subtle)]">
          <Link
            to="/reference"
            className="text-colour-grey-700 hover:text-colour-primary-700"
            style={{ fontSize: 'var(--font-size-sm)', textDecoration: 'none' }}
          >
            View component reference →
          </Link>
        </div>

      </div>
    </div>
  </div>
)
