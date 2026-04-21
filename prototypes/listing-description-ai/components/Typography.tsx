import React from 'react'

export const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-2xl font-bold leading-[var(--line-height-9)] text-colour-primary-700 m-0">
    {children}
  </h1>
)

export const BodySmall: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] text-colour-primary-900 m-0">
    {children}
  </p>
)

export const BodySubtle: React.FC<{ children: React.ReactNode; error?: boolean }> = ({ children, error }) => (
  <p
    className="text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] m-0"
    style={{ color: error ? 'var(--colour-error-700)' : 'var(--colour-grey-700)' }}
  >
    {children}
  </p>
)

export const LabelBold: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[var(--font-size-base)] font-semibold leading-[var(--line-height-7)] text-colour-primary-700 m-0">
    {children}
  </p>
)
