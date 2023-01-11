import React, { useEffect, useState } from "react";
import SingleBenficiary from "./SingleBfc";

import "./Beneficiaries.css";

const Beneficiaries = () => {
    const [beneficiary, setBeneficiary] = useState([]);
    const [delquery, setDelquery] = useState("");
    const [search, setSearch] = useState("");

    function toggleBfcArchived(id) {
        const updateBfc = beneficiary.map((item) => {
            // if this bfc has the same ID as the edited
            if (id == item.id) {
                return { ...item, archived: !item.archived };
            }
            return item;
        });
        setBeneficiary(updateBfc);
    }

    function editBfc(id, newFirstName) {
        const editedBfcList = beneficiary.map((item) => {
            if (id === item.id) {
                return { ...item, firstName: newFirstName };
            }
            return item;
        });
        setBeneficiary(editedBfcList);
    }

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
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
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
            <input
                onChange={(e) => setSearch(e.target.value)}
                className="del-form"
                type="text"
                placeholder="Seach..."
            />
            <div className="bfc stack-large"></div>
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
            <ul
                role="list"
                className="bfc-list stack"
                aria-labelledby="list-heading"
            >
                {beneficiary
                    .filter((value) => {
                        if (search == "") {
                            return value;
                        } else if (
                            value.firstName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            return value;
                        }
                    })
                    .map((item) => (
                        <SingleBenficiary
                            id={item.id}
                            firstName={item.firstName}
                            archived={item.archived}
                            key={item.id}
                            toggleBfcArchived={toggleBfcArchived}
                            editBfc={editBfc}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default Beneficiaries;
