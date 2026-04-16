import { html, LitElement } from 'lit'
import { priorityBadge } from './priority-badge'


// Componente mínimo para probar la directive
class TestElement extends LitElement {
    static properties = {
      priority: { type: String }
    }

    render() {
      return html`<span data-testid="badge" ${priorityBadge(this.priority)}></span>`
    }
}
customElements.define('test-priority', TestElement)

describe('priorityBadge directive', () => {
  let el

  beforeEach(async () => {
    el = document.createElement('test-priority')
    document.body.appendChild(el)
    await el.updateComplete
  })

  afterEach(() => {
    el.remove()
  })

  it('agrega la clase correcta para prioridad high', async () => {
    el.priority = 'high'
    await el.updateComplete
    const badge = el.shadowRoot.querySelector('[data-testid="badge"]')
    expect(badge.classList.contains('priority-high')).toBe(true)
  })

  it('agrega la clase correcta para prioridad medium', async () => {
    el.priority = 'medium'
    await el.updateComplete
    const badge = el.shadowRoot.querySelector('[data-testid="badge"]')
    expect(badge.classList.contains('priority-medium')).toBe(true)
  })

  it('agrega la clase correcta para prioridad low', async () => {
    el.priority = 'low'
    await el.updateComplete
    const badge = el.shadowRoot.querySelector('[data-testid="badge"]')
    expect(badge.classList.contains('priority-low')).toBe(true)
  })

  it('establece el texto según la prioridad', async () => {
    el.priority = 'high'
    await el.updateComplete
    const badge = el.shadowRoot.querySelector('[data-testid="badge"]')
    expect(badge.textContent.trim()).toBe('Alta')
  })

  it('actualiza la clase cuando cambia la prioridad', async () => {
    el.priority = 'high'
    await el.updateComplete
    el.priority = 'low'
    await el.updateComplete
    const badge = el.shadowRoot.querySelector('[data-testid="badge"]')
    expect(badge.classList.contains('priority-high')).toBe(false)
    expect(badge.classList.contains('priority-low')).toBe(true)
  })

  it('limpia clases anteriores al cambiar prioridad', async () => {
    el.priority = 'high'
    await el.updateComplete
    el.priority = 'medium'
    await el.updateComplete
    const badge = el.shadowRoot.querySelector('[data-testid="badge"]')
    expect(badge.classList.contains('priority-high')).toBe(false)
    expect(badge.classList.contains('priority-medium')).toBe(true)
  })
})