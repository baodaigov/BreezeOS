import React from 'react'

function Time() {
  return (
    <div className='Time Header-item'>
        <p>{(new Date()).toLocaleString('en-US', {
          hour: "2-digit",
          minute: "2-digit"
        })}</p>
    </div>
  )
}

export default Time;