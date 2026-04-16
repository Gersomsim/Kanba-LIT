import { expect, jest } from '@jest/globals';
import './task-card.js';

describe('task-card', () => {
  let el;
  beforeEach(() => {
    el = document.createElement('task-card')
    document.body.appendChild(el)
  })
  afterEach(() => {
    el.remove()
  })
  it('Se registra como custom element', () => {
    const el = customElements.get('task-card');
    expect(el).toBeDefined()
  })
  it('tiene shadow root ', () => {
    expect(el.shadowRoot).not.toBeNull()
  })

  it('renderiza el titulo', async () => {
    el.title = 'titulo de prueba';
    await el.updateComplete;
    const title = el.shadowRoot.querySelector('[data-testid="title"]')
    expect(title).not.toBeNull()
    expect(title.textContent.trim()).toBe('titulo de prueba')
  })
  it('actializa el texto cuando cambia la propiedad', async ()=> {
    el.title = 'titulo de prueba';
    await el.updateComplete;
    el.title = 'Titulo actualizado';
    await el.updateComplete;
    const title = el.shadowRoot.querySelector('[data-testid="title"]')
    expect(title.textContent.trim()).toBe('Titulo actualizado')
  })
  it('Refleja el titulo desde el HTML', async () => {
    el.setAttribute('title', 'titulo desde el html')
    await el.updateComplete
    const title = el.shadowRoot.querySelector('[data-testid="title"]')
    expect(title.textContent.trim()).toBe('titulo desde el html')
  })
  it('Renderiza la descripción', async () => {
    el.description = 'descripcion de prueba'
    await el.updateComplete
    const description = el.shadowRoot.querySelector('[data-testid="description"]')
    expect(description).not.toBeNull()
    expect(description.textContent.trim()).toBe('descripcion de prueba')
  })
  it('No renderiza la descripción si no se le pasa', async () => {
    await el.updateComplete
    const description = el.shadowRoot.querySelector('[data-testid="description"]')
    expect(description).toBeNull()
  })
  it('Dispara el evento task-delete al hacer click en eliminar', async () => {
    el.taskId = '123'
    await el.updateComplete
    const handler = jest.fn()
    el.addEventListener('task-delete', handler)
    el.shadowRoot.querySelector('[data-testid="delete-btn"]').click()
    expect(handler).toHaveBeenCalledTimes(1)   
  })
  it('El evento task-delete incluye el id en el detail', async () => {
    const id = 'abc-123'
    el.taskId = id
    await el.updateComplete

    const handler = jest.fn()
    el.addEventListener('task-delete', handler)
    el.shadowRoot.querySelector('[data-testid="delete-btn"]').click()
    expect(handler.mock.calls[0][0].detail).toEqual({ taskId: id })
  })
  it('El evento task-delete atravieza el shadow DOM', async () => {
    el.taskId = '123'
    await el.updateComplete

    const handler = jest.fn()
    document.addEventListener('task-delete', handler)
    
    el.shadowRoot.querySelector('[data-testid="delete-btn"]').click()
    expect(handler).toHaveBeenCalledTimes(1)
    document.removeEventListener('task-delete', handler)
  })
  it('Proyecta contenido en el slot action', async () => {
    const btn = document.createElement('button')
    btn.setAttribute('slot', 'actions')
    btn.textContent = 'Mover'
    
    el.appendChild(btn)
    await el.updateComplete

    const slot = el.shadowRoot.querySelector('slot[name="actions"]')
    expect(slot).not.toBeNull()
    const assignedNodes = slot.assignedNodes()
    expect(assignedNodes).toContain(btn)
  })
  it('Tiene estilos encapsulados en el shadow Root', async () => {
    await el.updateComplete
    const hasStyles = 
      el.shadowRoot.adoptedStyleSheets.length > 0 ||
      el.shadowRoot.querySelector('style') !== null
    expect(hasStyles).toBe(true)
  })
})
