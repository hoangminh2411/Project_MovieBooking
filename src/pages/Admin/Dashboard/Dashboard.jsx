import React from 'react'
import ItemView from './ItemView/ItemView'

export default function Dashboard() {
  return (
    <div className="flex flex-row ">
      <div className="w-2/3">
        <ItemView/>
        
      </div>
      <div className="w-1/3">
        
      </div>
    </div>
  )
}
