import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import ScrollToHash from '../components/layout/ScrollToHash.jsx'
import WhatsAppButton from '../components/whatsapp/WhatsAppButton.jsx'

function PublicLayout() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default PublicLayout
