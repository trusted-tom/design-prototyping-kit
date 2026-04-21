import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { ComponentReference } from './pages/ComponentReference'
import { DescribeHome } from '../screens/DescribeHome/DescribeHome'

function DescribeHomeRoute() {
  const navigate = useNavigate()
  return <DescribeHome onClose={() => navigate('/')} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/screens/describe-home" element={<DescribeHomeRoute />} />
      <Route path="/reference" element={<ComponentReference />} />
    </Routes>
  )
}
