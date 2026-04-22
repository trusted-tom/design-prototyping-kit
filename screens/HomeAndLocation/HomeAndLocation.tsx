import { useNavigate } from 'react-router-dom'
import { FormInterstitial } from '../../components/FormInterstitial/FormInterstitial'

// ---------------------------------------------------------------------------
// Illustration
// ---------------------------------------------------------------------------

const HouseIllustration = () => (
  <div className="w-[327px] h-[327px] rounded-[var(--radius-xl)] bg-[var(--colour-primary-100)] flex items-center justify-center">
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className="text-colour-primary-900"
      aria-hidden="true"
    >
      <path
        d="M60 18L102 46V102H18V46L60 18Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M42 102V68H78V102"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect
        x="50"
        y="44"
        width="20"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  </div>
)

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export const HomeAndLocation: React.FC = () => {
  const navigate = useNavigate()

  return (
    <FormInterstitial
      showBack
      onBack={() => navigate('/')}
      showProgress
      segments={[
        { label: 'Home',   fillPercent: 25 },
        { label: 'Pets',   fillPercent: 0  },
        { label: 'About',  fillPercent: 0  },
        { label: 'Safety', fillPercent: 0  },
      ]}
      title="Home and location"
      description="Help sitters picture daily life! Describe your home and neighborhood."
      illustration={<HouseIllustration />}
      primaryLabel="Continue"
      onPrimary={() => {}}
      showSecondary
      secondaryLabel="Save & exit"
      onSecondary={() => {}}
    />
  )
}
