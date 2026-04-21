import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FormFlow } from '../../components/FormFlow/FormFlow'
import { Button } from '../../components/Button/Button'
import { PageTitle, BodySmall, BodySubtle, LabelBold } from './components/Typography'
import { MOCK_GENERATED_CONTENT, SUGGEST_ITEMS } from './data'

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2L11.8 7.2L17 9L11.8 10.8L10 16L8.2 10.8L3 9L8.2 7.2L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16 1L16.7 3.3L19 4L16.7 4.7L16 7L15.3 4.7L13 4L15.3 3.3L16 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
  </svg>
)

const SpinnerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className="animate-spin"
    style={{ animationDuration: '0.8s' }}
  >
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="22 22" strokeLinecap="round" />
  </svg>
)

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 9V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BulletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <circle cx="12" cy="12" r="3" fill="var(--colour-primary-900)" />
  </svg>
)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GenerateState = 'idle' | 'loading' | 'generated' | 'error'

// ---------------------------------------------------------------------------
// Prototype
// ---------------------------------------------------------------------------

export default function ListingDescriptionAI() {
  const navigate = useNavigate()
  const location = useLocation()

  const [textValue, setTextValue] = useState('')
  const [generateState, setGenerateState] = useState<GenerateState>('idle')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isErrorMode = new URLSearchParams(location.search).get('error') === 'true'
  const isGenerating = generateState === 'loading'
  const characterCount = textValue.length
  const isContinueEnabled = characterCount >= 50

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 420)}px`
  }, [textValue])

  useEffect(() => {
    if (generateState !== 'loading') return
    const timer = setTimeout(() => {
      if (isErrorMode) {
        setGenerateState('error')
      } else {
        setGenerateState('generated')
        setTextValue(MOCK_GENERATED_CONTENT)
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [generateState, isErrorMode])

  const handleGenerate = () => {
    if (isGenerating) return
    setGenerateState('loading')
  }

  const aiButtonLabel =
    generateState === 'loading'   ? 'Generating...'   :
    generateState === 'generated' ? 'Regenerate'      :
    generateState === 'error'     ? 'Try again'       :
    'Draft with AI'

  const aiButtonIcon =
    generateState === 'loading' ? <SpinnerIcon /> :
    generateState === 'error'   ? <WarningIcon /> :
    <SparkleIcon />

  const textareaIsError = !isFocused && generateState === 'error'

  const textareaBorder = isFocused
    ? { border: '2px solid var(--colour-primary-900)' }
    : generateState === 'error'
      ? { border: '2px solid var(--colour-error-700)' }
      : { border: '1px solid var(--colour-grey-200)' }

  return (
    <FormFlow
      showTitle
      title="About"
      showSubtext
      subtext="Step 1 of 4"
      showBack
      onBack={() => navigate('/')}
      progressPercent={25}
      primaryLabel="Continue"
      primaryVariant="primary"
      primaryDisabled={!isContinueEnabled}
      primaryRightIcon={<ChevronRightIcon />}
      onPrimary={() => {}}
    >
      <div className="flex flex-col gap-[var(--space-xl)]">

        {/* Page heading */}
        <div className="flex flex-col gap-[var(--space-xxs)]">
          <PageTitle>Listing description</PageTitle>
          <BodySmall>
            Write a few sentences about your home, pets, and location so sitters know what to expect.
          </BodySmall>
        </div>

        {/* Textarea + AI button */}
        <div className="flex flex-col gap-[var(--space-md)]">

          {/* Textarea with character counter */}
          <div className="relative">
            <span
              className="absolute top-[var(--space-sm)] right-[var(--space-md)] text-[var(--font-size-xs)] pointer-events-none z-10 leading-none"
              style={{ color: 'var(--colour-grey-700)' }}
            >
              {characterCount}
            </span>
            <textarea
              ref={textareaRef}
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isGenerating}
              placeholder="Tell sitters about your home..."
              className="w-full outline-none font-[family-name:var(--font-family-sans)] text-base leading-[var(--line-height-7)] text-colour-primary-900 placeholder:text-colour-grey-500 rounded-[var(--radius-lg)] transition-colors duration-150 disabled:cursor-not-allowed"
              style={{
                minHeight: '160px',
                maxHeight: '420px',
                overflowY: 'auto',
                resize: 'none',
                padding: 'var(--space-md)',
                paddingTop: '36px',
                backgroundColor: 'var(--colour-base-white)',
                opacity: isGenerating ? 0.5 : 1,
                ...textareaBorder,
              }}
            />
          </div>

          {/* Helper text */}
          <BodySubtle error={textareaIsError}>Min 50 characters</BodySubtle>

          {/* AI Generate button */}
          <Button
            variant="primary"
            size="small"
            label={aiButtonLabel}
            leftIcon={aiButtonIcon}
            disabled={isGenerating}
            onClick={handleGenerate}
            className="self-start"
          />

          {/* Error message */}
          {generateState === 'error' && (
            <BodySubtle error>Something went wrong. Please try again.</BodySubtle>
          )}

        </div>

        {/* You could mention... */}
        <div className="flex flex-col gap-[var(--space-md)]">
          <LabelBold>You could mention...</LabelBold>
          <div className="flex flex-col gap-[var(--space-md)]">
            {SUGGEST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-[var(--space-md)]">
                <BulletIcon />
                <BodySubtle>{item}</BodySubtle>
              </div>
            ))}
          </div>
        </div>

      </div>
    </FormFlow>
  )
}
