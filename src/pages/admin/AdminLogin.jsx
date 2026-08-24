import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { loginSchema } from '../../lib/validations.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import Logo from '../../components/ui/Logo.jsx'
import './AdminLogin.css'

function AdminLogin() {
  const { user, loading, login } = useAuth()
  const { brand } = useSiteContent()
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(loginSchema) })

  if (!loading && user) {
    return <Navigate to="/admin" replace />
  }

  async function onSubmit(values) {
    setFormError('')
    try {
      await login(values.email, values.password)
      navigate('/admin')
    } catch {
      setFormError('Correo o contraseña incorrectos.')
    }
  }

  return (
    <div className="admin-login">
      <Helmet>
        <title>Acceso administrador | XilotCode</title>
      </Helmet>

      <form className="admin-login-card" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Logo size={34} src={brand.logoAsset?.secureUrl} />
        <h1>Acceso administrador</h1>
        <p>Ingresa tus credenciales para gestionar XilotCode.</p>

        <div className="contact-field">
          <label htmlFor="email">Correo</label>
          <input id="email" type="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="contact-error">{errors.email.message}</span>}
        </div>

        <div className="contact-field">
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" {...register('password')} aria-invalid={Boolean(errors.password)} />
          {errors.password && <span className="contact-error">{errors.password.message}</span>}
        </div>

        {formError && <span className="contact-error">{formError}</span>}

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
