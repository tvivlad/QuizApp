import React from 'react'
import '../index.css'
export function Photo({item}) {

  return (
    <div className="block">
        <h2>
            {item.title}
        </h2>
        <img src={item.url}/>
    </div>
  )
}
