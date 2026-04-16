/**
 * jsdom no soporta adoptedStyleSheets ni CSSStyleSheet.replaceSync.
 * Lit los usa internamente para inyectar estilos en el shadow DOM.
 * Este polyfill mínimo evita que los tests exploten por eso.
 */

if (typeof CSSStyleSheet.prototype.replaceSync === 'undefined') {
  CSSStyleSheet.prototype.replaceSync = function () {}
  CSSStyleSheet.prototype.replace = function () {
    return Promise.resolve(this)
  }
}

if (!Object.getOwnPropertyDescriptor(Document.prototype, 'adoptedStyleSheets')) {
  Object.defineProperty(Document.prototype, 'adoptedStyleSheets', {
    get() { return this._adoptedStyleSheets ?? [] },
    set(v) { this._adoptedStyleSheets = v },
    configurable: true,
  })
}

if (!Object.getOwnPropertyDescriptor(ShadowRoot.prototype, 'adoptedStyleSheets')) {
  Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
    get() { return this._adoptedStyleSheets ?? [] },
    set(v) { this._adoptedStyleSheets = v },
    configurable: true,
  })
}
