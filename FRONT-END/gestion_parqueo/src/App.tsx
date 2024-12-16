import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Suspense, useEffect } from 'react'
import { AppRouter } from './Routes'
import Spinner from './components/statics/Spinner'
import React from 'react'

function App() {

  return (
    <Router>
      <Suspense fallback={<Spinner/>}>
        <AppRouter/>
      </Suspense>
    </Router>
  )
}

export default App


