import React, { useEffect, useState } from "react";

import "./Beneficiaries.css";

const Beneficiaries = () => {
    const [beneficiary, setBeneficiary] = useState([]);
    const [delquery, setDelquery] = useState("");

    const deleteBeneficiary = async () => {
        try {
            await fetch(
                `http://localhost:3000/beneficiary/?beneficiaryID=${delquery}`,
                { method: "DELETE" }
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getBeneficiaries = async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiary");
                data = await data.json();
                // sort alphabetically
                data.sort((a, b) => {
                    let nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
                    let nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    // names must be equal
                    return 0;
                  });
                setBeneficiary(data);
                console.log(data);
                console.log(beneficiary);
            } catch (error) {
                console.error(error);
            }
        };
        // eventualy we should only call this if user has correct auth/permissions
        getBeneficiaries();
    }, []);

    return (
        <div>
            <form onSubmit={() => deleteBeneficiary()}>
                <input
                    onChange={(e) => setDelquery(e.target.value)}
                    value={delquery}
                    className="del-form"
                    type="text"
                    placeholder="Enter ID to delete"
                />
                <input type="submit" value="Delete" />
            </form>
            <h1>Beneficiaries Below: </h1>
            {beneficiary.map((item, i) => (
                <h2 onClick={(item) => deleteBeneficiary(item)} key={i}>
                    Beneficiary: {item.id}, {item.firstName}
                </h2>
            ))}
        </div>
    );
};

export default Beneficiaries;
