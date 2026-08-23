import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Home from '../pages/Home.jsx'
import Contact from '../pages/Contact.jsx'
import NotFound from '../pages/NotFound.jsx'
import Portafolio from '../pages/Portafolio/Portafolio.jsx'
import ProjectDetail from '../pages/Portafolio/ProjectDetail.jsx'
import AdminLogin from '../pages/admin/AdminLogin.jsx'
import AdminDashboard from '../pages/admin/AdminDashboard.jsx'
import AdminContent from '../pages/admin/AdminContent.jsx'
import AdminServices from '../pages/admin/AdminServices.jsx'
import AdminSectors from '../pages/admin/AdminSectors.jsx'
import AdminOffers from '../pages/admin/AdminOffers.jsx'
import AdminMedia from '../pages/admin/AdminMedia.jsx'
import AdminMessages from '../pages/admin/AdminMessages.jsx'
import AdminContact from '../pages/admin/AdminContact.jsx'
import AdminSettings from '../pages/admin/AdminSettings.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portafolio" element={<Portafolio />} />
        <Route path="/portafolio/:slug" element={<ProjectDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="contenido" element={<AdminContent />} />
        <Route path="servicios" element={<AdminServices />} />
        <Route path="sectores" element={<AdminSectors />} />
        <Route path="ofertas" element={<AdminOffers />} />
        <Route path="multimedia" element={<AdminMedia />} />
        <Route path="mensajes" element={<AdminMessages />} />
        <Route path="contacto" element={<AdminContact />} />
        <Route path="configuracion" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
