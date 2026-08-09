import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as tf from '@tensorflow/tfjs'
import './index.css'
import App from './App.jsx'

window.tf = tf;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)