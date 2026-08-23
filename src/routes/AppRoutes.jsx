import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Home from '../pages/Home.jsx'
import Projects from '../pages/Projects.jsx'
import Contact from '../pages/Contact.jsx'
import NotFound from '../pages/NotFound.jsx'
import AdminLogin from '../pages/admin/AdminLogin.jsx'
import AdminDashboard from '../pages/admin/AdminDashboard.jsx'
import AdminMessages from '../pages/admin/AdminMessages.jsx'
import AdminSettings from '../pages/admin/AdminSettings.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
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
        <Route path="mensajes" element={<AdminMessages />} />
        <Route path="configuracion" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
