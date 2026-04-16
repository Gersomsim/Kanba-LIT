import { jest } from '@jest/globals';
import './task-form.js';

describe('task-form', () => {
    let el;
                                                     
    beforeEach(() => {
      el = document.createElement('task-form')
      document.body.appendChild(el)
    })

    afterEach(() => {
      el.remove()
    })

    it('se registra como custom element', () => {
      expect(customElements.get('task-form')).toBeDefined()
    })
                                                                                                                                                                             
    it('tiene shadow root', () => {
      expect(el.shadowRoot).not.toBeNull()
    })

    it('renderiza un input para el título', async () => {
      await el.updateComplete
      const input = el.shadowRoot.querySelector('[data-testid="input-title"]')
      expect(input).not.toBeNull()
    })

    it('renderiza un textarea para la descripción', async () => {
      await el.updateComplete
      const textarea = el.shadowRoot.querySelector('[data-testid="input-description"]')
      expect(textarea).not.toBeNull()
    })

    it('dispara task-create al hacer submit con datos válidos', async () => {
      await el.updateComplete

      const handler = jest.fn()
      el.addEventListener('task-create', handler)

      const input = el.shadowRoot.querySelector('[data-testid="input-title"]')
      input.value = 'Nueva tarea'
      input.dispatchEvent(new Event('input'))

      const form = el.shadowRoot.querySelector('[data-testid="form"]')
      form.dispatchEvent(new Event('submit'))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].detail).toMatchObject({ title: 'Nueva tarea' })
    })

    it('el evento task-create incluye la descripción', async () => {
      await el.updateComplete

      const handler = jest.fn()
      el.addEventListener('task-create', handler)

      const input = el.shadowRoot.querySelector('[data-testid="input-title"]')
      input.value = 'Tarea'
      input.dispatchEvent(new Event('input'))

      const textarea = el.shadowRoot.querySelector('[data-testid="input-description"]')
      textarea.value = 'Mi descripción'
      textarea.dispatchEvent(new Event('input'))

      el.shadowRoot.querySelector('[data-testid="form"]').dispatchEvent(new Event('submit'))
   
      expect(handler.mock.calls[0][0].detail).toMatchObject({
        title: 'Tarea',
        description: 'Mi descripción'
      })
    })

    it('no dispara task-create si el título está vacío', async () => {
      await el.updateComplete

      const handler = jest.fn()
      el.addEventListener('task-create', handler)

      el.shadowRoot.querySelector('[data-testid="form"]').dispatchEvent(new Event('submit'))

      expect(handler).not.toHaveBeenCalled()
    })
                                                                                                                                                                               
    it('limpia el formulario después del submit', async () => {                                                                                                              
      await el.updateComplete

      const input = el.shadowRoot.querySelector('[data-testid="input-title"]')
      input.value = 'Tarea'
      input.dispatchEvent(new Event('input'))
      await el.updateComplete // esperar que Lit procese el cambio de _title antes del submit

      el.shadowRoot.querySelector('[data-testid="form"]').dispatchEvent(new Event('submit'))
      await el.updateComplete

      const updatedInput = el.shadowRoot.querySelector('[data-testid="input-title"]')
      expect(updatedInput.value).toBe('')
    })

    // lifecycle: firstUpdated
    it('hace focus en el input de título al montar', async () => {
      const focused = el.shadowRoot.activeElement
      const input = el.shadowRoot.querySelector('[data-testid="input-title"]')
      expect(focused).toBe(input)
    })                                                       
  })