import React from 'react'

function Spinner() {
  return (
    <div className=" h-5/6 flex items-center justify-center">
        <span className="loading loading-infinity w-40 text-black"></span>
    </div>
  )
}

export default Spinner