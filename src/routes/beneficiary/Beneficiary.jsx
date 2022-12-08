import React,{useEffect, useState} from 'react'


import './Beneficiary.css';

const Beneficiary = () => {

    const [beneficiary, setBeneficiary] = useState([]);

    const deleteBeneficiary = async (item) => {
      
    } 

    useEffect(() => {
      const getBeneficiaries = async () => {
        try {
          let data = await fetch('http://localhost:3000/beneficiary');
          data = await data.json();
          setBeneficiary(data);
          console.log(data);
          console.log(beneficiary);
        } catch (error) {
          console.error(error);
        }
      }
      // eventualy we should only call this if user has correct auth/permissions
      getBeneficiaries();
    },[])

  return (

    <div>
        <h1>Click a benefiicary to delete it from the database!</h1>
        {beneficiary.map((item,i) => (
            <h2 onClick={(item) => deleteBeneficiary(item)} key={i}>Beneficiary: {item._id}</h2>
        ))}
    </div>
  )
}

export default Beneficiary