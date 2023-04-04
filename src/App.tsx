import * as React from 'react'
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset'

const App = () => (
  <React.Fragment>
    <Reset />
    <Outlet/>
  </React.Fragment>
)

export default App;