import { useState } from 'react'
import { Button } from '../../../components/Button/Button'

// ---------------------------------------------------------------------------
// The SHA-256 hash of the password "trusted2024".
// To change the password, replace this constant — see instructions below.
// ---------------------------------------------------------------------------
const CORRECT_HASH = '4799be85336420550c9f03174197ff3e32200d0b93f43f0de4335e07580a7fc7'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PasswordGateProps {
  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// PasswordGate
// ---------------------------------------------------------------------------

export const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('proto_auth') === CORRECT_HASH
    } catch {
      return false
    }
  })
  const [password, setPassword]     = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [showError, setShowError]   = useState(false)

  if (isUnlocked) return <>{children}</>

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!password || isChecking) return
    setIsChecking(true)
    setShowError(false)
    const hash = await hashPassword(password)
    if (hash === CORRECT_HASH) {
      try { localStorage.setItem('proto_auth', hash) } catch { /* private browsing */ }
      setIsUnlocked(true)
    } else {
      setShowError(true)
      setIsChecking(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] px-[var(--space-lg)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-[var(--space-lg)] w-full max-w-[320px]"
      >
        {/* Logo placeholder */}
        <div className="w-[48px] h-[48px] rounded-[var(--radius-lg)] bg-[var(--colour-primary-900)]" />

        {/* Heading */}
        <div className="flex flex-col items-center gap-[var(--space-xxs)] text-center">
          <h1 className="m-0 font-bold text-[var(--font-size-2xl)] leading-[var(--line-height-9)] text-colour-primary-700">
            Design Prototyping Kit
          </h1>
          <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-grey-700">
            Enter the password to view prototypes
          </p>
        </div>

        {/* Input + error */}
        <div className="flex flex-col gap-[var(--space-xs)] w-full">
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setShowError(false) }}
            placeholder="Password"
            autoFocus
            className={[
              'w-full outline-none',
              'font-[family-name:var(--font-family-sans)] font-normal text-[var(--font-size-base)] leading-[var(--line-height-7)]',
              'text-colour-primary-900 placeholder:text-colour-grey-500',
              'rounded-[var(--radius-lg)]',
              'py-[var(--space-sm)] px-[var(--space-md)]',
              'transition-colors duration-150',
              showError
                ? 'border-[2px] border-[var(--colour-error-700)]'
                : 'border border-[var(--colour-grey-200)] focus:border-[2px] focus:border-[var(--colour-primary-900)]',
            ].join(' ')}
          />
          {showError && (
            <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-error-700">
              Incorrect password. Please try again.
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          label={isChecking ? 'Checking...' : 'Enter'}
          variant="primary"
          size="large"
          disabled={isChecking || !password}
          className="w-full"
        />
      </form>
    </div>
  )
}

// TO CHANGE THE PASSWORD:
// 1. Open your browser console on any page
// 2. Run:
//      await crypto.subtle.digest('SHA-256', new TextEncoder().encode('your-new-password'))
//        .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''))
// 3. Copy the output hash
// 4. Replace the CORRECT_HASH constant at the top of this file
// 5. Run: npm run deploy
