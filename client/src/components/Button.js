import React from 'react'

export default ({children, clickHandler}) => (<div className="ui button" onClick={() => clickHandler()}>{children}</div>)