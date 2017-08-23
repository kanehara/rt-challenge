import React from 'react'

export default ({label, clickHandler}) =>
  (
    <div className="ui label tiny"
         onClick={() => clickHandler({id: label.id})}>
      {label.name}
    </div>
  )