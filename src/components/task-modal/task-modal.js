import { LitElement, css, html } from "lit";

export class TaskModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true }
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
    }
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.35);
      backdrop-filter: blur(4px);

      display: flex;
      align-items: center;
      justify-content: center;

      pointer-events: auto;
    }
    .overlay[hidden] { display: none; }

    .dialog {
      width: 420px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 32px);

      background: white;
      border-radius: 18px;
      padding: 18px;

      box-shadow:
        0 10px 25px rgba(0,0,0,0.15),
        0 25px 60px rgba(0,0,0,0.20);

      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .content {
      overflow-y: auto;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
    }

    button {
      border: none;
      background: #eef2ff;
      color: #4f46e5;
      font-weight: 600;
      font-size: 13px;

      padding: 8px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: all .15s ease;
    }

    button:hover {
      background: #e0e7ff;
    }

    .overlay {
      animation: fadeIn .15s ease;
    }

    .dialog {
      animation: scaleIn .18s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(.95) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
  `

  constructor() {
    super()
    this.open = false
  }

  render() {
    return html`
    <div class="overlay" ?hidden=${!this.open}>
      <div 
        class="dialog" 
        data-testid="dialog" 
        role="dialog"
        ?hidden=${!this.open}
        ?open=${this.open}
      >
        <div class="content">
          <slot></slot>
        </div>

        <div class="footer">
          <button data-testid="close-btn" @click=${this._close}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
    `
  }

  _close = () => {
    this.open = false
    this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }))
  }
}


customElements.define('task-modal', TaskModal)