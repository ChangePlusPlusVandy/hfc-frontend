import React,{useEffect, useState} from 'react'


import './Beneficiary.css';

const Beneficiary = () => {

    const [beneficiary, setBeneficiary] = useState([]);
    useEffect(() => {
      const getBeneficiaries = async () => {
        try {
          let data = await fetch('http://localhost:3000/beneficiary');
          data = await data.json();
          setBeneficiary([data]);
          console.log(data);
          console.log(beneficiary);
          return [data];
        } catch (error) {
          console.error(error);
        }
       


      }
      // eventualy we should only call this if user has correct auth/permissions
      getBeneficiaries();
      
      
    },[])

  return (
    <div>
        {beneficiary.map((item) => {
            <h1>Beneficiary: {item._id}</h1>
        })}
    </div>
  )
}

export default Beneficiary