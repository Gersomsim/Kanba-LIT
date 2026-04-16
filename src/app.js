// Punto de entrada — aquí irás importando los componentes conforme los crees
import { TaskCard } from './components/task-card/task-card.js'
import { KanbanColumn } from './components/kanban-column/kanban-column.js'
import { KanbanBoard } from './components/kanban-board/kanban-board.js'
import { TaskForm } from './components/task-form/task-form.js'
import { TaskModal } from './components/task-modal/task-modal.js'
import { TaskCounter } from './components/task-counter/task-counter.js'


const taskCounter = document.createElement('task-counter')
const board = document.querySelector('kanban-board')

board.appendChild(taskCounter)


board.columns = [
  { id: 'todo', title: 'Por hacer', tasks: [{ id: '1', title: 'Tarea uno', description: 'Hola Gersomsim', priority: 'high' },
        { id: '2', title: 'Tarea dos', description: '', priority: 'low'},] },              
  { id: 'doing', title: 'En progreso', tasks: [] },
  { id: 'done', title: 'Hecho', tasks: [] }, 
] 