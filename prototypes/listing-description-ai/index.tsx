import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FormFlow } from '../../components/FormFlow/FormFlow'
import { Button } from '../../components/Button/Button'
import { PageTitle, BodySmall, BodySubtle, LabelBold } from './components/Typography'
import { MOCK_GENERATED_CONTENT, SUGGEST_ITEMS } from './data'
import { IconWriteWithAi, IconWarning, IconChevronRight, IconHouse, IconPin, IconBed } from '../../src/icons/index'

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
    generateState === 'error'   ? <IconWarning /> :
    <IconWriteWithAi />

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
      primaryRightIcon={<IconChevronRight />}
      onPrimary={() => {}}
    >
      <div className="flex flex-col gap-[var(--space-md)]">

        {/* Page heading */}
        <div className="flex flex-col gap-[var(--space-xxs)]">
          <PageTitle>Listing description</PageTitle>
          <BodySmall>
            Write a few sentences about your home, pets, and location so sitters know what to expect.
          </BodySmall>
        </div>

        {/* Textarea + AI button */}
        <div className="flex flex-col gap-[var(--space-xxl)]">

          {/* Textarea with character counter */}
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
                overflowY: 'hidden',
                resize: 'none',
                padding: 'var(--space-md)',
                paddingTop: '36px',
                backgroundColor: 'var(--colour-base-white)',
                opacity: isGenerating ? 0.5 : 1,
                ...textareaBorder,
              }}
            />
          {/* Helper text */}
          <BodySubtle error={textareaIsError}>Min 50 characters</BodySubtle>
          </div>

        </div>

        {/* You could mention... */}
        <div className="flex flex-col gap-[var(--space-md)] mt-[var(--space-xxl)]">
          <LabelBold>You could mention...</LabelBold>
          <div className="flex flex-col gap-[var(--space-md)]">
            {SUGGEST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-[var(--space-md)]">
                {item.icon === 'house' && <IconHouse className="shrink-0 text-colour-primary-900" />}
                {item.icon === 'pin'   && <IconPin   className="shrink-0 text-colour-primary-900" />}
                {item.icon === 'bed'   && <IconBed   className="shrink-0 text-colour-primary-900" />}
                <BodySubtle>{item.label}</BodySubtle>
              </div>
            ))}
          </div>
        </div>

      </div>
    </FormFlow>
  )
}
