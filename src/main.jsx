console.log('🔥 MAIN START')

import { createRoot } from 'react-dom/client'
import App from './App'

console.log('🔥 IMPORTS OK')

const rootElement = document.getElementById('root')

console.log('🔥 ROOT ELEMENT:', rootElement)

createRoot(rootElement).render(
  <div>
    {console.log('🔥 RENDER EXECUTING')}
    <App />
  </div>
)

console.log('🔥 MAIN END')
