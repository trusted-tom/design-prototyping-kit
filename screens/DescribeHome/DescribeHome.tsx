import React, { useState } from 'react'
import { FormFlow } from '../../components/FormFlow/FormFlow'
import { SingleSelectorButton } from '../../components/SingleSelectorButton/SingleSelectorButton'
import { IconHouse, IconApartment } from '../../src/icons/index'

interface DescribeHomeProps {
  onClose?: () => void
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export const DescribeHome: React.FC<DescribeHomeProps> = ({ onClose }) => {
  const [propertyType, setPropertyType] = useState<string | null>(null)
  const [stepFree, setStepFree] = useState<string | null>(null)

  return (
    <FormFlow
      showTitle
      title="Step 1 of 3"
      showClose
      onClose={onClose}
      showRightIconAction1
      primaryLabel="Continue"
      primaryVariant="primary"
    >
      {/*
        Outer gap = 32px (--space-xl): page heading → first field group
        Inner gap = 48px (--space-xxl): between field groups
        Field group internal gap = 16px (--space-md): field title → field
      */}
      <div className="flex flex-col gap-[var(--space-xl)]">

        {/* Page heading */}
        <div className="flex flex-col gap-[var(--space-xxs)]">
          <h1 className="text-2xl font-bold leading-[var(--line-height-9)] text-colour-primary-700 m-0">
            Describe your home
          </h1>
          <p className="text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] text-colour-primary-900 m-0">
            Select the type of home you live in and if it has step-free access.
          </p>
        </div>

        {/* Field groups */}
        <div className="flex flex-col gap-[var(--space-xxl)]">

          {/* Field group 1 — Property type (compact row) */}
          <div className="flex flex-col gap-[var(--space-md)]">
            <h2 className="text-[var(--font-size-base)] font-semibold leading-[var(--line-height-7)] text-colour-primary-700 m-0">
              Property type
            </h2>
            <div className="flex gap-[var(--space-md)]">
              <SingleSelectorButton
                layout="compact"
                label="House"
                icon={<IconHouse />}
                selected={propertyType === 'house'}
                onClick={() => setPropertyType('house')}
              />
              <SingleSelectorButton
                layout="compact"
                label="Apartment"
                icon={<IconApartment />}
                selected={propertyType === 'apartment'}
                onClick={() => setPropertyType('apartment')}
              />
            </div>
          </div>

          {/* Field group 2 — Step-free access (detailed stack) */}
          <div className="flex flex-col gap-[var(--space-md)]">
            <h2 className="text-[var(--font-size-base)] font-semibold leading-[var(--line-height-7)] text-colour-primary-700 m-0">
              Is your home step free?
            </h2>
            <div className="flex flex-col gap-[var(--space-md)]">
              <SingleSelectorButton
                layout="detailed"
                label="Yes"
                description="Step-free access and no internal stairs"
                selected={stepFree === 'yes'}
                onClick={() => setStepFree('yes')}
              />
              <SingleSelectorButton
                layout="detailed"
                label="No"
                description="Stairs or other barriers to access"
                selected={stepFree === 'no'}
                onClick={() => setStepFree('no')}
              />
            </div>
          </div>

        </div>
      </div>
    </FormFlow>
  )
}

export default DescribeHome
