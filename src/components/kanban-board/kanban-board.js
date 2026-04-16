import { ContextProvider } from '@lit/context';
import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { boardContext } from '../../context/board-context';

export class KanbanBoard extends LitElement{
  static properties = {
    columns: { attribute: false}
  }
  static styles = css`
  :host {
    display: block;
    height: 100%;
  }
  .board {
    height: 100%;
    box-sizing: border-box;
    padding: 24px;

    display: flex;
    gap: 24px;
    align-items: flex-start;

    overflow-x: auto;
    overflow-y: hidden;

    background: #f6f7fb;
  }
  .board::-webkit-scrollbar {
    height: 10px;
  }

  .board::-webkit-scrollbar-track {
    background: transparent;
  }

  .board::-webkit-scrollbar-thumb {
    background: #d0d4e4;
    border-radius: 999px;
  }

  .board::-webkit-scrollbar-thumb:hover {
    background: #b8bed6;
  }
  ::slotted(*) {
    flex: 0 0 auto;
  }
  `
  constructor(){
    super()
    this.columns = []
    this.addEventListener('task-delete', this.handleTaskDelete)
    this.addEventListener('task-created', this.handleTaskCreate)
    this._provider = new ContextProvider(this, {
      context: boardContext,
      initialValue: {
        columns: this.columns,
      }
    })
}

  render(){
    const columns = repeat(
      this.columns,
      (col) => col.id,
      (col) => html`
        <kanban-column
          .title="${col.title}"
          .id=${col.id}
          .tasks="${col.tasks}"
        ></kanban-column>
    `)
    return html`
      <slot></slot>
      <div class="board">
        ${columns}
      </div>
    `
  }
  handleTaskDelete(e){
    const taskId = e.detail.taskId
    const columContainer = this.columns.findIndex(col => col.tasks.some(t => t.id == taskId))
    if(columContainer === -1) return

    this.columns = this.columns.map((c, i) => {
      if(i!== columContainer) return c
      return {...c, tasks: c.tasks.filter(t => t.id !== taskId)}
    })
  }
  updated(changedProperties){
    if(changedProperties.has('columns')){
      this._provider.setValue({
        columns: this.columns,
      })
    }
  }
  handleTaskCreate = (e) => {
    const detail = e.detail;
    detail.task.id = crypto.randomUUID()
    const colIdx = this.columns.findIndex(c => c.id === detail.columnId)
    if(colIdx === -1) return
    const tasksOfColumn = [...this.columns[colIdx].tasks, detail.task]
    this.columns = this.columns.map((c, i ) => {
      if (i !== colIdx) return c
      return {...c, tasks: tasksOfColumn}
    })
  }
}


customElements.define('kanban-board', KanbanBoard)