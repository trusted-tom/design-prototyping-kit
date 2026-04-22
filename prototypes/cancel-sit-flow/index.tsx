import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormFlow } from '../../components/FormFlow/FormFlow'
import { Button } from '../../components/Button/Button'
import { Banner } from '../../components/Banner/Banner'
import { SingleSelectorButton } from '../../components/SingleSelectorButton/SingleSelectorButton'
import { IconChevronRight } from '../../src/icons/index'
import { SitSummaryCard } from './components/SitSummaryCard'
import { mockSit, cancellationReasons } from './data'

// ---------------------------------------------------------------------------
// Step 3 — Confirmation (no FormFlow, full-screen centred)
// ---------------------------------------------------------------------------

const CheckmarkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="text-colour-primary-700">
    <path
      d="M6 14L11 20L22 8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

interface ConfirmationScreenProps {
  sitterName: string
  startDate: string
  endDate: string
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ sitterName, startDate, endDate }) => {
  const navigate = useNavigate()
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[var(--color-bg-primary)] p-[var(--space-lg)]">
      <div className="flex flex-col items-center gap-[var(--space-md)] text-center">

        {/* Checkmark circle */}
        <div className="w-16 h-16 rounded-full bg-[var(--colour-primary-100)] flex items-center justify-center">
          <CheckmarkIcon />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-[var(--space-xxs)]">
          <h1 className="m-0 font-bold text-2xl leading-[var(--line-height-9)] text-colour-primary-700">
            Sit cancelled
          </h1>
          <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-primary-900 max-w-[280px]">
            We've notified {sitterName}. Your sit from {startDate} to {endDate} has been cancelled.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col w-full max-w-[327px] mt-[var(--space-xxl)]">
          <Button
            label="Find a new sitter"
            variant="primary"
            size="large"
            rightIcon={<IconChevronRight />}
            onClick={() => navigate('/')}
            className="w-full"
          />
          <Button
            label="Back to my sits"
            variant="subtle"
            size="large"
            onClick={() => navigate('/')}
            className="w-full mt-[var(--space-sm)]"
          />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 1 — Cancellation reason
// ---------------------------------------------------------------------------

interface Step1Props {
  selectedReason: string | null
  onSelectReason: (id: string) => void
  otherText: string
  onOtherTextChange: (v: string) => void
}

const Step1: React.FC<Step1Props> = ({ selectedReason, onSelectReason, otherText, onOtherTextChange }) => (
  <div className="flex flex-col gap-[var(--space-xxs)]">

    {/* Page heading */}
    <div className="flex flex-col gap-[var(--space-xxs)]">
      <h1 className="m-0 font-bold text-2xl leading-[var(--line-height-9)] text-colour-primary-700">
        Why do you need to cancel?
      </h1>
      <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-primary-900">
        Please let us know the reason. This helps us improve the experience for everyone.
      </p>
    </div>

    {/* Reason options */}
    <div className="flex flex-col gap-[var(--space-md)] mt-[var(--space-xl)]">
      {cancellationReasons.map(reason => (
        <SingleSelectorButton
          key={reason.id}
          label={reason.label}
          layout="detailed"
          selected={selectedReason === reason.id}
          onClick={() => onSelectReason(reason.id)}
        />
      ))}
    </div>

    {/* "Other" freetext input */}
    {selectedReason === 'other' && (
      <div className="flex flex-col gap-[var(--space-xs)] mt-[var(--space-md)]">
        <label className="font-semibold text-[var(--font-size-base)] leading-[var(--line-height-7)] text-colour-primary-700">
          Tell us more (optional)
        </label>
        <textarea
          value={otherText}
          onChange={e => onOtherTextChange(e.target.value)}
          placeholder="Add any extra detail..."
          className="w-full outline-none resize-none font-[family-name:var(--font-family-sans)] font-normal text-[var(--font-size-base)] leading-[var(--line-height-7)] text-colour-primary-900 placeholder:text-colour-grey-500 rounded-[var(--radius-lg)] border border-[var(--colour-grey-200)] p-[var(--space-md)] min-h-[120px] focus:border-2 focus:border-[var(--colour-primary-900)] transition-colors duration-150"
        />
      </div>
    )}
  </div>
)

// ---------------------------------------------------------------------------
// Step 2 — Policy warning
// ---------------------------------------------------------------------------

interface Step2Props {
  sit: typeof mockSit
}

const whatHappensNext = [
  'Your sitter will be notified immediately',
  'Your sit will be removed from their schedule',
  'You can rebook at any time',
]

const Step2: React.FC<Step2Props> = ({ sit }) => (
  <div className="flex flex-col gap-[var(--space-xxs)]">

    {/* Page heading */}
    <div className="flex flex-col gap-[var(--space-xxs)]">
      <h1 className="m-0 font-bold text-2xl leading-[var(--line-height-9)] text-colour-primary-700">
        Your cancellation policy
      </h1>
      <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-primary-900">
        Please review what happens when you cancel this sit.
      </p>
    </div>

    {/* Content blocks */}
    <div className="flex flex-col gap-[var(--space-xxl)] mt-[var(--space-xl)]">

      {/* Sit summary */}
      <SitSummaryCard
        sitterName={sit.sitterName}
        startDate={sit.startDate}
        endDate={sit.endDate}
        petNames={sit.petNames}
      />

      {/* Policy warning */}
      <Banner
        appearance="error"
        type="no-link"
        showIcon
        title={`Cancellation within ${sit.daysUntilStart} days`}
        description={`Based on your ${sit.cancellationPolicy} policy, cancelling now may affect your cancellation score and future booking visibility.`}
      />

      {/* What happens next */}
      <div className="flex flex-col gap-[var(--space-md)]">
        <p className="m-0 font-semibold text-[var(--font-size-base)] leading-[var(--line-height-7)] text-colour-primary-700">
          What happens next
        </p>
        <div className="flex flex-col gap-[var(--space-sm)]">
          {whatHappensNext.map((item, i) => (
            <div key={i} className="flex items-start gap-[var(--space-sm)]">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--colour-grey-200)] flex items-center justify-center text-[10px] font-semibold text-colour-primary-900 mt-[2px]">
                {i + 1}
              </span>
              <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-primary-900">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
)

// ---------------------------------------------------------------------------
// Root — flow controller
// ---------------------------------------------------------------------------

export default function CancelSitFlow() {
  const navigate = useNavigate()

  const [step, setStep]                     = useState<1 | 2 | 3>(1)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [otherText, setOtherText]           = useState('')

  const canContinueStep1 = selectedReason !== null

  if (step === 3) {
    return (
      <ConfirmationScreen
        sitterName={mockSit.sitterName}
        startDate={mockSit.startDate}
        endDate={mockSit.endDate}
      />
    )
  }

  return (
    <FormFlow
      showTitle
      title="Cancel sit"
      showBack
      onBack={step === 1 ? () => navigate(-1) : () => setStep(1)}
      primaryLabel={step === 1 ? 'Continue' : 'Confirm cancellation'}
      primaryVariant={step === 2 ? 'error' : 'primary'}
      primaryDisabled={step === 1 && !canContinueStep1}
      primaryRightIcon={step === 1 ? <IconChevronRight /> : undefined}
      onPrimary={step === 1 ? () => setStep(2) : () => setStep(3)}
      showSecondary={step === 2}
      secondaryLabel="Keep my sit"
      onSecondary={() => navigate(-1)}
    >
      {step === 1 && (
        <Step1
          selectedReason={selectedReason}
          onSelectReason={setSelectedReason}
          otherText={otherText}
          onOtherTextChange={setOtherText}
        />
      )}
      {step === 2 && <Step2 sit={mockSit} />}
    </FormFlow>
  )
}
