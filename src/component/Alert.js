import React from 'react'

export default function Alert(props) {
  return (<>
    {props.msg &&
    <div style={{
      position: 'fixed',
      width: '100vw',
      top: '63px',
      left:'0',
      zIndex:'10'
    }}>
        <div className={`alert alert-${props.type} alert-dismissible fade show mx-3 my-0`} role="alert">
        <strong> ! </strong> {props.msg}</div>
    </div>}
  </>
  )
}
