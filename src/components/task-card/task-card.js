import { css, html, LitElement } from 'lit';

import { priorityBadge } from '../../directives/priority-badge'

//  Una card típica tiene:
//   - Sombra suave para verse elevada
//   - Padding interno
//   - El título en negrita
//   - La descripción en gris y más pequeña
//   - El botón de eliminar alineado a la derecha
//   - Algún indicador visual de prioridad (recuerda que tienes :host([priority="high"]) disponible)

export class TaskCard extends LitElement {
  static properties = {
    taskId: { type: String },
	  title: { type: String },
    description: { type: String},
    priority: { type: String }
  }
  static styles = css`                              
    :host {                             
      display: block;
      background: #ffffff;
      border-radius: 14px;
      padding: 14px 14px 12px 14px;

      box-shadow:
        0 1px 2px rgba(0,0,0,0.04),
        0 4px 12px rgba(0,0,0,0.06);

      display: flex;
      flex-direction: column;
      gap: 8px;

      cursor: grab;
      transition: transform .15s ease, box-shadow .15s ease;
    }
    :host(:hover) {
      transform: translateY(-2px);
      box-shadow:
        0 6px 16px rgba(0,0,0,0.10);
    }
    .title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1f2333;
      line-height: 1.3;
    }
    .description {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.4;
    }
    .card-footer{
      display: flex;
      justify-content: flex-end;
      margin-top: 6px;
    }
    .card-header {
      display: flex;
      justify-content: flex-start;
    }
    .actions::slotted(*) {
      margin-top: 4px;
    }

    button {
      border: none;
      background: #ffe2e2;
      color: #b42323;
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background .15s ease;
    }
    button:hover {
      background: #ffc9c9;
    }
    .badge {
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
      display: inline-block;
    }
    .badge::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .priority-high {
      background: #ffe4e4;
      color: #b42323;
    }
    .badge.priority-high::before {
      background: #ef4444;
    }
    .priority-medium {
      background: #fff4db;
      color: #b7791f;
    }
    .badge.priority-medium::before {
      background: #f59e0b;
    }
    .priority-low {
      background: #e7f8ee;
      color: #1f7a4f;
    }
    .badge.priority-low::before {
      background: #22c55e;
    }
  `

  
  render() {
    const descriptionTemplate = this.description
      ? html`<p data-testid="description">${this.description}</p>`
      : null
   
    return html`
      <div class="card-header">
        <span class="badge" ${priorityBadge(this.priority)}></span>
      </div>

      <h3 data-testid="title" class="title">${this.title}</h3>

      <div class="description">
        ${descriptionTemplate}
      </div>

      <div class="actions">
        <slot name="actions"></slot>
      </div>

      <div class="card-footer">
        <button data-testid="delete-btn" @click="${this._handleDelete}">
          Eliminar
        </button>
      </div>
    `
  }

  _handleDelete() {
    this.dispatchEvent(new CustomEvent('task-delete', {
      detail: { taskId: this.taskId },
      bubbles: true,
      composed: true
    }))
  }
}


customElements.define('task-card', TaskCard);
  