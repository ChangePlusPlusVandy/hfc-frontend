import React, { useEffect, useState } from "react";
import SingleBenficiary from "./components/SingleBfc";
import FilterButton from "./components/FilterButton";

import "./Beneficiaries.css";

const FILTER_MAP = {
    All: () => true,
    Active: (item) => !item.archived,
    Archived: (item) => item.archived,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const Beneficiaries = () => {
    const [beneficiary, setBeneficiary] = useState([]);
    const [delquery, setDelquery] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

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

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    function deleteBfc(id) {
        const remainingBfc = beneficiary.filter((item) => id !== item.id);
        console.log(id);
        setBeneficiary(remainingBfc);
        fetch(`http://localhost:3000/beneficiary/?beneficiaryID=${id}`, {
            method: "DELETE",
        });
    }

    function editBfc(
        id,
        newFirstName,
        newLastName,
        newGender,
        newPhone,
        newEmail,
        newBirthDate
    ) {
        const editedBfcList = beneficiary.map((item) => {
            if (id === item.id) {
                return {
                    ...item,
                    firstName: newFirstName,
                    lastName: newLastName,
                    gender: newGender,
                    phone: newPhone,
                    email: newEmail,
                    bday: newBirthDate,
                };
            }
            return item;
        });
        setBeneficiary(editedBfcList);
    }

    // const deleteBeneficiary = async () => {
    //     try {
    //         await fetch(
    //             `http://localhost:3000/beneficiary/?beneficiaryID=${delquery}`,
    //             { method: "DELETE" }
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const sortByName = () => {
        console.log("called this");
        let data = [...beneficiary];
        data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setBeneficiary(data);
    };

    const sortByDate = () => {
        console.log("called this");
        let data = [...beneficiary];
        data.sort(function (a, b) {
            const dateA = new Date(a.joinDate);
            const dateB = new Date(b.joinDate);
            return dateB - dateA;
        });
        console.log(data);
        setBeneficiary(data);
    };

    useEffect(() => {
        const getBeneficiaries = async () => {
            console.log("use effect called");
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
                data.sort((a, b) => a.firstName.localeCompare(b.firstName));
                console.log("data", data);
                setBeneficiary(data);
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
                placeholder="Search..."
            />
            <button onClick={sortByDate}>Sort by Date</button>
            <button onClick={sortByName}>Sort by First Name</button>
            <div className="filters btn-group">{filterList}</div>
            <div className="bfc stack-large"></div>
            {/* <form onSubmit={() => deleteBeneficiary()}>
                <input
                    onChange={(e) => setDelquery(e.target.value)}
                    value={delquery}
                    className="del-form"
                    type="text"
                    placeholder="Enter ID to delete"
                />
                <input type="submit" value="Delete" />
            </form> */}
            <h1>Beneficiaries Below: </h1>
            <ul
                role="list"
                className="bfc-list stack"
                aria-labelledby="list-heading"
            >
                {beneficiary
                    .filter(FILTER_MAP[filter])
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
                            lastName={item.lastName}
                            archived={item.archived}
                            key={item.id}
                            toggleBfcArchived={toggleBfcArchived}
                            deleteBfc={deleteBfc}
                            editBfc={editBfc}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default Beneficiaries;
