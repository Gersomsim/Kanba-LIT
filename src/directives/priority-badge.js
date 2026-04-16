import { Directive, directive } from 'lit/directive.js'

class PriorityBadgeDirective extends Directive {
  classes = {
    high: 'priority-high badge',
    medium: 'priority-medium badge',
    low: 'priority-low badge'
  }
  textos = {
    high: 'Alta',
    medium: 'Media',
    low: 'Baja'
  }
  update(part, [argumento]) {
    part.element.textContent = this.textos[argumento]
    part.element.className = this.classes[argumento]
  }

  render(argumento) {
    // se usa como fallback en SSR
    // en browser normalmente se llama update
    return ''
  }
}

export const priorityBadge = directive(PriorityBadgeDirective)