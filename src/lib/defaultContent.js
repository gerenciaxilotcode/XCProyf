export const DEFAULT_HERO = {
  eyebrow: 'Desarrollo de software para negocios reales',
  title: 'Software hecho para tu negocio.',
  subtitle:
    'Desarrollamos soluciones digitales a la medida para pequeños y medianos negocios, adaptadas a sus necesidades, procesos y presupuesto.',
  ctaPrimaryLabel: 'Quiero mi proyecto',
  ctaSecondaryLabel: 'Ver servicios',
  tagline: 'Automatiza. Optimiza. Crece.',
  imageAsset: null
}

export const DEFAULT_CTA = {
  title: '¿Tienes una idea para tu negocio?',
  description: 'Convirtámosla en software. Sin compromiso, podemos platicarlo en una llamada o videollamada.',
  buttonLabel: 'Hablar por WhatsApp'
}

export const DEFAULT_BRAND = {
  name: 'XilotCode',
  tagline: 'Automatiza. Optimiza. Crece.',
  description: 'Desarrollamos software a la medida para pequeños y medianos negocios.',
  logoAsset: null,
  faviconAsset: null
}

export const DEFAULT_CONTACT = {
  phone: null,
  email: null,
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '524421319153',
  whatsappMessage: 'Hola, me llamo ',
  address: null,
  schedule: null,
  instagramUrl: null,
  facebookUrl: null,
  linkedinUrl: null
}

export const DEFAULT_PROCESS_STEPS = [
  { key: 'analizamos', title: 'Analizamos', description: 'Conocemos tu negocio y entendemos qué necesitas.' },
  { key: 'disenamos', title: 'Diseñamos', description: 'Convertimos tus necesidades en una experiencia digital clara.' },
  { key: 'desarrollamos', title: 'Desarrollamos', description: 'Construimos el sistema utilizando tecnologías modernas.' },
  { key: 'probamos', title: 'Probamos', description: 'Validamos funcionalidades, seguridad y experiencia.' },
  { key: 'entregamos', title: 'Entregamos', description: 'Ponemos tu solución en funcionamiento y te acompañamos.' }
]

export const DEFAULT_SERVICES = [
  { key: 'sitios-web', title: 'Sitios web profesionales', iconKey: 'Globe', description: 'Presencia digital clara y rápida que representa lo que tu negocio realmente hace.', imageAsset: null },
  { key: 'sistemas-administrativos', title: 'Sistemas administrativos', iconKey: 'LayoutDashboard', description: 'Centraliza clientes, ventas, inventario, usuarios y procesos en una sola plataforma.', imageAsset: null },
  { key: 'tiendas-en-linea', title: 'Tiendas en línea', iconKey: 'ShoppingCart', description: 'Vende tus productos o servicios con un flujo de compra simple y confiable.', imageAsset: null },
  { key: 'plataformas-digitales', title: 'Plataformas digitales', iconKey: 'Boxes', description: 'Herramientas a medida para operar, coordinar equipos y dar seguimiento a tu negocio.', imageAsset: null },
  { key: 'automatizacion', title: 'Automatización de procesos', iconKey: 'Workflow', description: 'Reduce tareas repetitivas y libera tiempo para lo que realmente importa.', imageAsset: null },
  { key: 'sistemas-personalizados', title: 'Sistemas personalizados', iconKey: 'Wrench', description: 'Cuando ninguna herramienta genérica se ajusta a tu operación, construimos una que sí.', imageAsset: null }
]

export const DEFAULT_SECTORS = [
  'Taquerías', 'Restaurantes', 'Hoteles', 'Colegios', 'Inmobiliarias',
  'Agencias de viajes', 'Clínicas', 'Despachos contables', 'Salones de belleza',
  'Tiendas', 'Talleres automotrices', 'Ferreterías', 'Servicios profesionales'
].map((name, index) => ({ key: `default-${index}`, name, imageAsset: null }))

export const DEFAULT_DIFFERENTIATORS = [
  { key: 'a-medida', title: 'A medida', iconKey: 'Target', description: 'No necesitas adaptar tu negocio a un software genérico.', imageAsset: null },
  { key: 'presupuesto', title: 'Presupuesto', iconKey: 'Wallet', description: 'Desarrollamos soluciones considerando el tamaño y presupuesto de tu negocio.', imageAsset: null },
  { key: 'escalable', title: 'Escalable', iconKey: 'TrendingUp', description: 'Construimos pensando en que tu negocio pueda crecer.', imageAsset: null },
  { key: 'cercano', title: 'Cercano', iconKey: 'Handshake', description: 'Trabajamos directamente contigo para entender lo que realmente necesitas.', imageAsset: null }
]

export const DEFAULT_OFFERS = []
