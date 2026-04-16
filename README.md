# Kanban Board — Lit Web Components

![Tests](https://github.com/Gersomsim/Kanba-LIT/actions/workflows/ci.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-TBD-lightgrey)

Proyecto de estudio construido con **TDD (Test-Driven Development)** para aprender a construir aplicaciones con **Web Components nativos** usando la librería **Lit**. Cada componente fue implementado escribiendo primero los tests y luego el código que los hace pasar.

## Tecnologías

| Herramienta | Uso |
|---|---|
| [Lit 3.x](https://lit.dev) | Web Components reactivos |
| [@lit/context](https://lit.dev/docs/data/context/) | Estado compartido entre componentes |
| [Vite 5](https://vitejs.dev) | Bundler y servidor de desarrollo |
| [Jest 29 + jsdom](https://jestjs.io) | Testing unitario con soporte ESM |

## Conceptos aplicados

- **Propiedades reactivas** y re-render automático
- **Eventos personalizados** (`CustomEvent`) entre componentes
- **Slots** y composición de componentes
- **Lifecycle hooks** — `firstUpdated`, `updated`, `connectedCallback`
- **`repeat` directive** para listas eficientes
- **Custom directives** — `priorityBadge`
- **Context API** con `ContextProvider` y `ContextConsumer`
- **Formularios controlados** en Web Components
- **Animaciones** con CSS dentro de Shadow DOM

## Componentes

```
kanban-board       ← fuente de verdad / context provider
├── kanban-column  ← columnas con estado interno
│   └── task-card  ← tarjeta individual con eventos
├── task-modal     ← modal reutilizable con slots
│   └── task-form  ← formulario controlado
└── task-counter   ← context consumer
```

## Tests

54 tests escritos bajo el ciclo TDD (Red → Green → Refactor), distribuidos en todos los componentes.

```bash
npm test                # correr todos los tests
npm run test:watch      # modo watch
npm run test:coverage   # reporte de cobertura
```

## Instalación

```bash
npm install
npm run dev
```
