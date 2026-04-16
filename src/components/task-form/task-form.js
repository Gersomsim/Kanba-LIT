import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";

export class TaskForm extends LitElement{

  optionsPriority = [
    { key: 'low', value: 'Baja'},
    { key: 'medium', value: 'Media'},
    { key: 'high', value: 'Alta'},
  ]

  static properties = {
    _title: { state: true },
    _description: { state: true },
    _priority: { state: true }
  }

  static styles = css`
    :host {
      display: block;
    }

    .form {
      background: #ffffff;
      padding: 16px;
      border-radius: 16px;

      box-shadow:
        0 1px 2px rgba(0,0,0,0.05),
        0 10px 25px rgba(0,0,0,0.06);

      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
    }

    input,
    textarea,
    select {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 14px;
      font-family: inherit;

      background: #fafafa;
      transition: all .15s ease;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #6366f1;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
    }

    textarea {
      resize: vertical;
      min-height: 70px;
      max-height: 140px;
    }

    .submit-btn {
      border: none;
      background: #6366f1;
      color: white;
      font-weight: 600;
      font-size: 14px;

      padding: 10px;
      border-radius: 10px;
      cursor: pointer;

      transition: all .15s ease;
    }

    .submit-btn:hover {
      background: #5558e6;
      transform: translateY(-1px);
    }

    .submit-btn:active {
      transform: translateY(0);
    }
  `

  constructor() {
    super();
    this._title = '';
    this._description = '';
    this._priority = 'low'
  }

  render() {
    const options = repeat(
      this.optionsPriority, 
      (option) => option.key, 
      (option) => html`<option value=${option.key}>${option.value}</option>`
    )

    return html`
      <form @submit=${this._submitForm} data-testid="form" class="form">
        <div class="field">
          <label for="taskTitle">Título</label>
          <input 
            data-testid="input-title"
            .value="${this._title}"
            @input="${e => this._title = e.target.value}"
            id="taskTitle" />
        </div>

        <div class="field">
          <label for="taskPriority">Prioridad</label>
          <select 
            .value=${this._priority}
            @input="${e => this._priority = e.target.value}"
            >
            ${options}
          </select>
        </div>

        <div class="field">
          <label for="taskDescription">Descripción</label>
          <textarea 
            data-testid="input-description"
            .value="${this._description}"
            @input="${e => this._description = e.target.value}"
            id="taskDescription">
          </textarea>
        </div>

        <button type="submit" class="submit-btn">Agregar</button>
      </form>
    `
  }

  firstUpdated() {
    this.shadowRoot.querySelector('[data-testid="input-title"]').focus()
  } 

  _submitForm(e) {
    e.preventDefault()
    const title = this._title.trim()
    if (!title) return
    this._handleCreate()
    this._resetForm()
  }

  _resetForm(){
    this._description = ''
    this._title = ''
    this._priority = 'low'
  }

  _handleCreate() {
    this.dispatchEvent(new CustomEvent('task-create', {
      detail: {
        title: this._title.trim(),
        description: this._description.trim(),
        priority: this._priority
      },
      bubbles: true,
      composed: true
    }))
  }
}

customElements.define('task-form', TaskForm)