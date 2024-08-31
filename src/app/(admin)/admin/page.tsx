import { redirect } from 'next/navigation'
import React from 'react'

function Admin() {
  return redirect("/products")
}

export default Admin