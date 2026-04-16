import { jest } from '@jest/globals'
import '../task-card/task-card.js'
import './kanban-column.js'

  describe('kanban-column', () => {
    let el

    beforeEach(() => {
      el = document.createElement('kanban-column')
      document.body.appendChild(el)
    })

    afterEach(() => {
      el.remove()
    })

    it('se registra como custom element', () => {
      expect(customElements.get('kanban-column')).toBeDefined()
    })

    it('tiene shadow root', () => {
      expect(el.shadowRoot).not.toBeNull()
    })
    it('renderiza el título de la columna', async () => {
      el.title = 'En progreso'
      await el.updateComplete
      const title = el.shadowRoot.querySelector('[data-testid="column-title"]')
      expect(title).not.toBeNull()
      expect(title.textContent.trim()).toBe('En progreso')
    })

    it('renderiza una task-card por cada tarea', async () => {
      el.tasks = [
        { id: '1', title: 'Tarea uno', description: '' },
        { id: '2', title: 'Tarea dos', description: '' },
      ]
      await el.updateComplete
      const cards = el.shadowRoot.querySelectorAll('task-card')
      expect(cards.length).toBe(2)
    })
    it('pasa el título correcto a cada task-card', async () => {
      el.tasks = [
        { id: '1', title: 'Tarea uno', description: '' },
      ]
      await el.updateComplete
      const card = el.shadowRoot.querySelector('task-card')             
      expect(card.title).toBe('Tarea uno')
    })
   
    it('renderiza cero cards si tasks está vacío', async () => {
      const cards = el.shadowRoot.querySelectorAll('task-card')
      expect(cards.length).toBe(0)
    })
   
    it('re-emite task-delete hacia arriba cuando viene de una task-card', async () => {
      el.tasks = [{ id: 'abc', title: 'Tarea', description: '' }]
      await el.updateComplete                                              

      const handler = jest.fn()
      document.addEventListener('task-delete', handler)              

      const card = el.shadowRoot.querySelector('task-card')
      card.dispatchEvent(new CustomEvent('task-delete', {
        detail: { id: 'abc' },                          
        bubbles: true,
        composed: true,                                            
      }))
      expect(handler).toHaveBeenCalledTimes(1)                                                                                                  
      document.removeEventListener('task-delete', handler)
    })                                                                                                                                                                         
  })