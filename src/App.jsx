import {LoginProvider} from './index.js';

import './App.css'

function App() {
  return (
    <>
        <LoginProvider>
            <LoginPage/>
        </LoginProvider>
    </>
  )
}

export default App