import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Geprerenderde routes hebben al HTML in #root staan: die hydrateren we, dan is
// er geen flits en geen dubbel werk. Routes die niet geprerenderd zijn (/blog en
// alles wat de catch-all vangt) krijgen een lege shell en renderen gewoon vanaf
// nul, precies zoals de site het altijd al deed.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
