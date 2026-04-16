import { LitElement, css, html } from "lit";
import { repeat } from 'lit/directives/repeat.js';

export class KanbanColumn extends LitElement{
  static properties = {
    id: { type: String },
    title: { type: String },
    tasks: { attribute: false },
    _openModal: { state: true }

  }
  static styles = css`
    :host{
      display: block;
      width: 320px;
      max-height: 100%;
      background: #ffffff;
      border-radius: 16px;
      box-shadow:
        0 1px 2px rgba(0,0,0,0.05),
        0 8px 24px rgba(0,0,0,0.06);

      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 12px 16px;
    }
    h2{
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #2b2f42;
    }

    button {
      width: 28px;
      height: 28px;
      border-radius: 50%;

      border: none;
      background: #eef2ff;
      color: #4f46e5;

      font-size: 18px;
      font-weight: 600;
      line-height: 0;

      cursor: pointer;
      transition: all .15s ease;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    button:hover {
      background: #e0e7ff;
      transform: scale(1.05);
    }

    button:active {
      transform: scale(0.95);
    }
    .cards {
      padding: 8px 12px 12px 12px;

      display: flex;
      flex-direction: column;
      gap: 12px;

      overflow-y: auto;
      min-height: 40px; /* evita colapso cuando está vacío */
      border-top: 1px solid #f1f2f7;
    }
    .cards::-webkit-scrollbar {
      width: 8px;
    }

    .cards::-webkit-scrollbar-track {
      background: transparent;
    }

    .cards::-webkit-scrollbar-thumb {
      background: #d7dbea;
      border-radius: 999px;
    }

    .cards::-webkit-scrollbar-thumb:hover {
      background: #c2c7df;
    }
  `

  constructor(){
    super()
    this.tasks = []
    this._openModal = false
    this.addEventListener('task-create', this._emitData)

  }

  render() {
    const cards = repeat(
      this.tasks, 
      task => task.id, 
      task => html`
        <task-card 
          .taskId="${task.id}"
          .title="${task.title}"
          .description="${task.description}"
          .priority=${task.priority}
        ></task-card>
      `)

    return html`
      <div class="header">
        <h2 data-testid="column-title">${this.title}</h2>
        <button @click=${this.handleModal}>+</button>
      </div>
      <div class="cards">
        ${cards}
      </div>

      <task-modal
        .open=${this._openModal}
        @modal-close=${() => this._openModal = false}
      >
        <task-form></task-form>
      </task-modal>
    `
  }

  handleModal = () => {
    this._openModal = true
  }
  _emitData = (e) => {
    const data = e.detail;
    const task = {
      title: data.title,
      description: data.description,
      priority: data.priority
    };
    this.dispatchEvent(new CustomEvent('task-created', {
      detail: {
        task: task,
        columnId: this.id
      },
      bubbles: true,
      composed: true,
    }));
    this._openModal = false;
  }
}


customElements.define('kanban-column', KanbanColumn)