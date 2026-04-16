import '../kanban-column/kanban-column.js'
import '../task-card/task-card.js'
import './kanban-board.js'

describe('kanban-board', () => {
  let el

  beforeEach(() => {
    el = document.createElement('kanban-board')
    document.body.appendChild(el)
  })
   
    afterEach(() => {
      el.remove()                             
    })

    it('se registra como custom element', () => {
      expect(customElements.get('kanban-board')).toBeDefined()
    })
   
    it('tiene shadow root', () => {
      expect(el.shadowRoot).not.toBeNull()                   
    })

    it('renderiza una kanban-column por cada columna', async () => {                                                                                                           
      el.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [] },              
        { id: 'doing', title: 'En progreso', tasks: [] },
        { id: 'done', title: 'Hecho', tasks: [] },                  
      ]
      await el.updateComplete
      const columns = el.shadowRoot.querySelectorAll('kanban-column')
      expect(columns.length).toBe(3)                            
    })
                                                       
    it('pasa el título correcto a cada columna', async () => {
      el.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [] },              
      ]
      await el.updateComplete                                              
      const column = el.shadowRoot.querySelector('kanban-column')
      expect(column.title).toBe('Por hacer')
    })

    it('pasa las tareas correctas a cada columna', async () => {
      const tasks = [{ id: 't1', title: 'Tarea', description: '' }]
      el.columns = [
        { id: 'todo', title: 'Por hacer', tasks },
      ]
      await el.updateComplete
      const column = el.shadowRoot.querySelector('kanban-column')
      expect(column.tasks).toEqual(tasks)
    })

    it('elimina una tarea cuando recibe task-delete', async () => {                                                                                                            
      el.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [
          { id: 't1', title: 'Tarea uno', description: '' },
          { id: 't2', title: 'Tarea dos', description: '' },
        ]},
      ]
      await el.updateComplete

      el.dispatchEvent(new CustomEvent('task-delete', {
        detail: { taskId: 't1' },
        bubbles: true,
        composed: true,
      }))
      await el.updateComplete

      const column = el.shadowRoot.querySelector('kanban-column')
      expect(column.tasks.length).toBe(1)
      expect(column.tasks[0].id).toBe('t2')
    })

    it('no modifica otras columnas al eliminar una tarea', async () => {
      el.columns = [
        { id: 'todo', title: 'Por hacer', tasks: [
          { id: 't1', title: 'Tarea', description: '' },
        ]},
        { id: 'done', title: 'Hecho', tasks: [
          { id: 't2', title: 'Otra', description: '' },
        ]},
      ]
      await el.updateComplete
                        
      el.dispatchEvent(new CustomEvent('task-delete', {
        detail: { id: 't1' },
        bubbles: true,
        composed: true,
      }))                                
      await el.updateComplete

      const columns = el.shadowRoot.querySelectorAll('kanban-column')
      expect(columns[1].tasks.length).toBe(1)
    })                                                                                                                                                                         
  })