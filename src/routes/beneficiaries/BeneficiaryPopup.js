import React from 'react'
import './BeneficaryPopup.css';

const BeneficiaryPopup = ({show}) => {


  if (!show) return null;

  return (
    <div className='overlay'>
        <div>BeneficiaryPopup</div>
    </div>
    
  )
}

export default BeneficiaryPopup