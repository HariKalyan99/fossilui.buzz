import Hero from '../components/sections/Hero'
import BrandStatement from '../components/sections/BrandStatement'
import ProgramsSection from '../components/sections/ProgramsSection'
import Philosophy from '../components/sections/Philosophy'
import Facilities from '../components/sections/Facilities'
import Coaches from '../components/sections/Coaches'
import MembershipSection from '../components/sections/MembershipSection'
import Community from '../components/sections/Community'
import FinalCTA from '../components/sections/FinalCTA'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <BrandStatement />
      <ProgramsSection />
      <Philosophy />
      <Facilities />
      <Coaches />
      <MembershipSection />
      <Community />
      <FinalCTA />
    </>
  )
}
