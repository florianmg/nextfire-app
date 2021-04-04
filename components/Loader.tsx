import React from 'react'

type LoaderProps = {
  show: boolean
}

const Loader: React.FC<LoaderProps> = ({ show }) => {
  return show ? <div className="loader"></div> : null
}

export default Loader
