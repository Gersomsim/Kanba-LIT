import { ContextConsumer } from "@lit/context";
import { css, html, LitElement } from "lit";
import { boardContext } from "../../context/board-context";

export class TaskCounter extends LitElement{
  static styles = css`
    :host {
      display: inline-block;
    }
    .counter {
      display: inline-flex;
      align-items: center;
      gap: 8px;

      background: #ffffff;
      padding: 6px 10px;
      border-radius: 999px;

      box-shadow:
        0 1px 2px rgba(0,0,0,0.05),
        0 4px 10px rgba(0,0,0,0.05);
    }

    .label {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
    }

    .count {
      background: #eef2ff;
      color: #4f46e5;
      font-weight: 700;
      font-size: 12px;

      padding: 2px 8px;
      border-radius: 999px;
      min-width: 22px;
      text-align: center;
    }
  `

  constructor() {
    super()
    this._boardConsumer = new ContextConsumer(this, {
      context: boardContext,
      subscribe: true
    })
  }

  render() {
    const columns = this._boardConsumer.value?.columns || []
    const totalTasks = columns.reduce((acc, column) => acc + column.tasks.length, 0)
    return html`
     <div class="counter">
      <span class="label">Tareas</span>
      <span class="count" data-testid="count">${totalTasks}</span>
    </div>
    `
  }
}

customElements.define('task-counter', TaskCounter)

