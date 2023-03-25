import React from 'react'

export default function Alert(props) {
  return (<>
    {props.msg &&
    <div style={{
      position: 'fixed',
      width: '100%',
      top: '15px',
    }}>
        <div className={`alert alert-${props.type} alert-dismissible fade show mx-3 my-0`} role="alert">
        <strong>Sorry Pal ! </strong> {props.msg}</div>
    </div>}
  </>
  )
}
