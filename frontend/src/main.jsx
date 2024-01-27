import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Graph from './components/Graph/Graph.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Graph />
    {/* <App /> */}
  </React.StrictMode>,
)
