import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre.'),
  business: z.string().trim().optional(),
  email: z.string().trim().email('Ingresa un correo válido.'),
  phone: z.string().trim().optional(),
  projectType: z.enum(['WEBSITE', 'ADMIN_SYSTEM', 'ONLINE_STORE', 'CUSTOM_APP', 'AUTOMATION', 'OTHER'], {
    errorMap: () => ({ message: 'Selecciona el tipo de proyecto.' })
  }),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Cuéntanos un poco más sobre tu proyecto.')
})

export const loginSchema = z.object({
  email: z.string().trim().email('Ingresa un correo válido.'),
  password: z.string().min(1, 'Ingresa tu contraseña.')
})

export const PROJECT_TYPE_LABELS = {
  WEBSITE: 'Sitio web',
  ADMIN_SYSTEM: 'Sistema administrativo',
  ONLINE_STORE: 'Tienda online',
  CUSTOM_APP: 'Aplicación personalizada',
  AUTOMATION: 'Automatización',
  OTHER: 'Otro'
}
