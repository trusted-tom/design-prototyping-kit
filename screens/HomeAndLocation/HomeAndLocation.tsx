import { useNavigate } from 'react-router-dom'
import { FormInterstitial } from '../../components/FormInterstitial/FormInterstitial'
import homeCat from '../../src/assets/home-cat.png'

// ---------------------------------------------------------------------------
// Illustration
// ---------------------------------------------------------------------------

const HouseIllustration = () => (
  <img
    src={homeCat}
    alt=""
    className="w-full max-w-[327px] aspect-square object-contain"
  />
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
