export const BOOT_SCENARIOS = [
  {
    title: 'Un sitio web para tu negocio',
    description: 'Presencia digital profesional que refleja lo que tu negocio realmente ofrece.'
  },
  {
    title: 'Un dashboard de ventas',
    description: 'Visualiza ingresos, pedidos y clientes en un solo lugar, en tiempo real.'
  },
  {
    title: 'Un sistema de inventario',
    description: 'Controla existencias, entradas y salidas sin depender de hojas de cálculo.'
  },
  {
    title: 'Software a tu medida',
    description: 'Procesos únicos, resueltos con una solución diseñada para tu operación.'
  },
  {
    title: 'Tu idea, convertida en software',
    description: 'De una conversación a una plataforma funcional, paso a paso.'
  }
]

export function shuffleScenarios() {
  const items = [...BOOT_SCENARIOS]
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}
