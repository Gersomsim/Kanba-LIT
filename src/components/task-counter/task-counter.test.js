import '../kanban-board/kanban-board.js'
import './task-counter.js'

  describe('task-counter', () => {
    let provider
    let consumer

    beforeEach(async () => {
      // El provider debe ser un ancestro del consumer en el DOM
      provider = document.createElement('kanban-board')
      consumer = document.createElement('task-counter')
      provider.appendChild(consumer)
      document.body.appendChild(provider)
      await provider.updateComplete
      await consumer.updateComplete
    })

    afterEach(() => {
      provider.remove()
    })

    it('se registra como custom element', () => {
      expect(customElements.get('task-counter')).toBeDefined()
    })

    it('muestra 0 cuando no hay tareas', async () => {
      provider.columns = []
      await provider.updateComplete
      await consumer.updateComplete
      const count = consumer.shadowRoot.querySelector('[data-testid="count"]')
      expect(count.textContent.trim()).toBe('0')
    })

    it('muestra el total de tareas de todas las columnas', async () => {
      provider.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [
          { id: 't1', title: 'Tarea 1', description: '' },
          { id: 't2', title: 'Tarea 2', description: '' },
        ]},
        { id: 'done', title: 'Hecho', tasks: [
          { id: 't3', title: 'Tarea 3', description: '' },
        ]},
      ]
      await provider.updateComplete
      await consumer.updateComplete
      const count = consumer.shadowRoot.querySelector('[data-testid="count"]')
      expect(count.textContent.trim()).toBe('3')
    })

    it('se actualiza cuando cambian las tareas', async () => {
      provider.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [
          { id: 't1', title: 'Tarea 1', description: '' },
        ]},
      ]
      await provider.updateComplete
      await consumer.updateComplete

      provider.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [] },
      ]
      await provider.updateComplete
      await consumer.updateComplete

      const count = consumer.shadowRoot.querySelector('[data-testid="count"]')
      expect(count.textContent.trim()).toBe('0')
    })
  })