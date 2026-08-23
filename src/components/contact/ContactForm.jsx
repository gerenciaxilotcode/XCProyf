import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, PROJECT_TYPE_LABELS } from '../../lib/validations.js'
import { sendContactMessage } from '../../services/contactService.js'
import { useToast } from '../../hooks/useToast.js'
import './ContactForm.css'

function ContactForm() {
  const { showToast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(contactFormSchema) })

  async function onSubmit(values) {
    try {
      await sendContactMessage(values)
      showToast('Mensaje enviado correctamente. Te contactaremos pronto.', 'success')
      reset()
    } catch {
      showToast('No fue posible enviar tu mensaje. Intenta nuevamente.', 'error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="contact-field">
        <label htmlFor="name">Nombre</label>
        <input id="name" type="text" {...register('name')} aria-invalid={Boolean(errors.name)} />
        {errors.name && <span className="contact-error">{errors.name.message}</span>}
      </div>

      <div className="contact-field">
        <label htmlFor="business">Negocio</label>
        <input id="business" type="text" {...register('business')} />
      </div>

      <div className="contact-row">
        <div className="contact-field">
          <label htmlFor="email">Correo</label>
          <input id="email" type="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="contact-error">{errors.email.message}</span>}
        </div>

        <div className="contact-field">
          <label htmlFor="phone">Teléfono</label>
          <input id="phone" type="tel" {...register('phone')} />
        </div>
      </div>

      <div className="contact-row">
        <div className="contact-field">
          <label htmlFor="projectType">Tipo de proyecto</label>
          <select id="projectType" defaultValue="" {...register('projectType')} aria-invalid={Boolean(errors.projectType)}>
            <option value="" disabled>Selecciona una opción</option>
            {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.projectType && <span className="contact-error">{errors.projectType.message}</span>}
        </div>

        <div className="contact-field">
          <label htmlFor="budget">Presupuesto aproximado</label>
          <input id="budget" type="text" placeholder="Opcional" {...register('budget')} />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">Mensaje</label>
        <textarea id="message" rows={5} {...register('message')} aria-invalid={Boolean(errors.message)} />
        {errors.message && <span className="contact-error">{errors.message.message}</span>}
      </div>

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Solicitar proyecto'}
      </button>
    </form>
  )
}

export default ContactForm
