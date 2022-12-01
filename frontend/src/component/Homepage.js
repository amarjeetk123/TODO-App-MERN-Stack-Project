import Navbar from "./Navbar";
import Form from "./Form";
import Todos from "./List"

import React from 'react'

function Homepage() {
  return (
    <div>
        <Navbar />
        <Form />
        <Todos />
    </div>
  )
}

export default Homepage