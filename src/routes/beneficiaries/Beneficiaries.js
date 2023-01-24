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
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // function toggleBfcArchived(id) {
    //     const updateBfc = beneficiary.map((item) => {
    //         // if this bfc has the same ID as the edited
    //         if (id == item.id) {
    //             return { ...item, archived: !item.archived };
    //         }
    //         return item;
    //     });
    //     setBeneficiary(updateBfc);
    // }

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const deleteBfc = (id) => {
        console.log(id);
        fetch(`http://localhost:3000/beneficiaries?beneficiaryID=${id}`, {
            method: "DELETE",
        }).then(async () => {
            try {
                let data = await fetch("http://localhost:3000/beneficiaries");
                data = await data.json();
                setBeneficiary(data);
                console.log(beneficiary);
            } catch (error) {
                console.error(error);
            }
        });
    };

    const sortByName = () => {
        let data = [...beneficiary];
        data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setBeneficiary(data);
    };

    const sortByDate = () => {
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
                placeholder="Search..."
            />
            <div className="filters btn-group">{filterList}</div>
            <div className="bfc stack-large"></div>

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
                                .includes(search.toLowerCase()) ||
                            value.lastName
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            value.id.toString().includes(search)
                        ) {
                            return value;
                        }
                    })
                    .map((item) => (
                        <SingleBenficiary
                            id={item.id}
                            firstName={item.firstName}
                            lastName={item.lastName}
                            gender={item.gender}
                            phone={item.phone}
                            email={item.email}
                            bday={item.bday}
                            archived={item.archived}
                            key={item.id}
                            mongoKey={item._id}
                            deleteBfc={deleteBfc}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default Beneficiaries;
