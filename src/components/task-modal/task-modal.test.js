import { jest } from '@jest/globals'
import './task-modal.js'
                                                                                                                                                                               
describe('task-modal', () => {
    let el

    beforeEach(() => {
      el = document.createElement('task-modal')                            
      document.body.appendChild(el)
    })

    afterEach(() => {
      el.remove()
    })
   
    it('se registra como custom element', () => {
      expect(customElements.get('task-modal')).toBeDefined()
    })
   
    it('tiene shadow root', () => {
      expect(el.shadowRoot).not.toBeNull()
    })

    it('está oculto por defecto', async () => {
      await el.updateComplete
      const dialog = el.shadowRoot.querySelector('[data-testid="dialog"]')
      expect(dialog.hasAttribute('hidden')).toBe(true)
    })
                                                                                                                                                                               
    it('se muestra cuando open es true', async () => {      
      el.open = true
      await el.updateComplete
      const dialog = el.shadowRoot.querySelector('[data-testid="dialog"]')
      expect(dialog.hasAttribute('hidden')).toBe(false)
    })                                                       
   
    it('se oculta cuando open vuelve a false', async () => {
      el.open = true
      await el.updateComplete
      el.open = false
      await el.updateComplete
      const dialog = el.shadowRoot.querySelector('[data-testid="dialog"]')
      expect(dialog.hasAttribute('hidden')).toBe(true)
    })
                                                                                                                                                                               
    it('proyecta contenido en el slot por defecto', async () => {
      const p = document.createElement('p')
      p.textContent = 'Contenido del modal'
      el.appendChild(p)
      await el.updateComplete
      const slot = el.shadowRoot.querySelector('slot:not([name])')
      expect(slot).not.toBeNull()
      expect(slot.assignedNodes()).toContain(p)
    })                                                       
                                                            
    it('dispara modal-close al hacer click en el botón cerrar', async () => {
      const handler = jest.fn()
      el.addEventListener('modal-close', handler)
      await el.updateComplete
      el.shadowRoot.querySelector('[data-testid="close-btn"]').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })                                                       
   
    it('el evento modal-close es composed', async () => {
      await el.updateComplete
      const handler = jest.fn()
      document.addEventListener('modal-close', handler, { once: true })
      el.shadowRoot.querySelector('[data-testid="close-btn"]').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })
                                                                                                                                                                               
    it('open se refleja como atributo HTML', async () => {  
      el.open = true
      await el.updateComplete
      expect(el.hasAttribute('open')).toBe(true)
    })
  })