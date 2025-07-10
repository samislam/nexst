'use client'

import React from 'react'

export const BasedOnClient = () => {
  return (
    <div className="rounded-xl bg-blue-200 p-5">
      <p>based on the current layout direction (client)</p>
      <div className="h-32 w-32 rounded-xl bg-orange-500"></div>
    </div>
  )
}
