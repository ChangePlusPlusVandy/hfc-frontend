import React, { useEffect, useState } from "react";
import Select from "react-select";
import MultiSelect from "multiselect-react-dropdown";
import "./SingleFilter.css";

const filterFieldOptions = [
    { label: "Age", value: "age" },
    { label: "Start Date", value: "start_date" },
    { label: "Last Grade Completed", value: "grade_completed" },
    { label: "English Level", value: "english_lvl" },
    { label: "Computer Skills", value: "computer_skills" },
    { label: "Emotional Wellness", value: "emotional_wellness" },
    { label: "Income", value: "income" },
    { label: "Has A Bank Account", value: "bank_account" },
    { label: "Savings", value: "savings" },
    { label: "Has Found Work", value: "found_work" },
    { label: "Gender", value: "gender" },
];
const filterFieldTimes = [
    { label: "Completion", value: "completion" },
    { label: "Intake", value: "intake" },
];

const InputRangeField = (props) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const handleMinChange = (e) => {
        setMin(e.target.value);
        props.update(e.target.value + "," + max);
    };
    const handleMaxChange = (e) => {
        setMax(e.target.value);
        props.update(min + "," + e.target.value);
    };

    return (
        <div className="input-range-field">
            <input
                className="single-filter-container-input"
                type="search"
                value={min}
                placeholder="Minimum"
                onChange={handleMinChange}
            />
            <input
                className="single-filter-container-input"
                type="search"
                value={max}
                placeholder="Maximum"
                onChange={handleMaxChange}
            />
        </div>
    );
};

const InputScoreField = (props) => {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [five, setFive] = useState(false);

    useEffect(() => {
        props.update(one + "," + two + "," + three + "," + four + "," + five);
    }, []);

    useEffect(() => {
        props.update(one + "," + two + "," + three + "," + four + "," + five);
    }, [one, two, three, four, five]);

    return (
        <div className="input-score-field">
            <div className="single-checkbox">
                <input
                    type="checkbox"
                    id="one"
                    value={one}
                    checked={one}
                    onChange={() => setOne((curr) => !curr)}
                />
                <label htmlFor="one">1</label>
            </div>

            <div className="single-checkbox">
                <input
                    type="checkbox"
                    id="two"
                    value={two}
                    checked={two}
                    onChange={() => setTwo((curr) => !curr)}
                />
                <label htmlFor="two">2</label>
            </div>

            <div className="single-checkbox">
                <input
                    type="checkbox"
                    id="three"
                    value={three}
                    checked={three}
                    onChange={() => setThree((curr) => !curr)}
                />
                <label htmlFor="three">3</label>
            </div>

            <div className="single-checkbox">
                <input
                    type="checkbox"
                    id="four"
                    value={four}
                    checked={four}
                    onChange={() => setFour((curr) => !curr)}
                />
                <label htmlFor="four">4</label>
            </div>

            <div className="single-checkbox">
                <input
                    type="checkbox"
                    id="five"
                    value={five}
                    checked={five}
                    onChange={() => setFive((curr) => !curr)}
                />
                <label htmlFor="five">5</label>
            </div>
        </div>
    );
};

const InputDateField = (props) => {
    let today = new Date();
    let todayStr =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        today.getDate().toString().padStart(2, "0");
    const [start, setStart] = useState(todayStr);
    const [end, setEnd] = useState(todayStr);

    const handleStartChange = (e) => {
        setStart(e.target.value);
        props.update(e.target.value + "," + end);
    };
    const handleEndChange = (e) => {
        setEnd(e.target.value);
        props.update(start + "," + e.target.value);
    };

    return (
        <div className="input-date-field">
            <input
                className="input-date-filter"
                type="date"
                value={start}
                onChange={handleStartChange}
                placeholder="Minimum"
            />
            <input
                className="input-date-filter"
                type="date"
                value={end}
                onChange={handleEndChange}
                placeholder="Maximum"
            />
        </div>
    );
};

const InputYesNoField = (props) => {
    const [isYes, setIsYes] = useState();

    useEffect(() => {
        if (isYes) props.update("yes");
        else props.update("no");
    }, [isYes]);

    return (
        <div className="input-yes-no-field">
            <form>
                <input
                    name="radio"
                    type="radio"
                    id="yes"
                    onChange={() => setIsYes(true)}
                />
                <label>yes</label>

                <input
                    name="radio"
                    type="radio"
                    id="no"
                    onChange={() => setIsYes(false)}
                />
                <label>No</label>
            </form>
        </div>
    );
};

const InputGenderField = (props) => {
    const [isYes, setIsYes] = useState();

    useEffect(() => {
        if (isYes) props.update("yes");
        else props.update("no");
    }, [isYes]);

    return (
        <div className="input-yes-no-field">
            <input
                name="radio"
                type="radio"
                id="yes"
                onChange={() => setIsYes(true)}
            />
            <label htmlFor="yes">Male</label>

            <input
                name="radio"
                type="radio"
                id="no"
                onChange={() => setIsYes(false)}
            />
            <label htmlFor="no">Female</label>
        </div>
    );
};

const FilterField = (props) => {
    const ID = props.id;
    const [typeValue, setTypeValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filterTime, setFilterTime] = useState("");
    const [displayTime, setDisplayTime] = useState(false);
    const [timeObject, setTimeObject] = useState();

    const [filterBoundsInput, setFilterBoundsInput] = useState();
    const [filterBoundsValue, setFilterBoundsValue] = useState("");

    useEffect(() => {
        let multipleTimes = [
            "bank_account",
            "english_lvl",
            "computer_skills",
            "emotional_wellness",
            "income",
            "savings",
        ];
        if (multipleTimes.includes(typeValue)) {
            setTimeObject(
                <Select
                    placeholder="Time"
                    options={filterFieldTimes}
                    className="react-select"
                    onChange={handleTimeChange}
                />
            );
            setDisplayTime(true);
        } else setDisplayTime(false);

        console.log("klnfkjs");
        let filterMinMax = ["age", "income", "savings"];
        let filterScore = [
            "english_lvl",
            "computer_skills",
            "emotional_wellness",
        ];
        let filterDate = ["start_date", "grade_completed"];
        let filterYesNo = ["bank_account", "found_work", "gender"];
        if (filterMinMax.includes(typeValue)) {
            setFilterValue("min_max");
            setFilterBoundsInput(
                <InputRangeField
                    val={filterBoundsValue}
                    update={setFilterBoundsValue}
                />
            );
        } else if (filterScore.includes(typeValue)) {
            setFilterValue("score");
            setFilterBoundsInput(
                <InputScoreField
                    val={filterBoundsValue}
                    update={setFilterBoundsValue}
                />
            );
        } else if (filterDate.includes(typeValue)) {
            setFilterValue("date");
            setFilterBoundsInput(
                <InputDateField
                    val={filterBoundsValue}
                    update={setFilterBoundsValue}
                />
            );
        } else if (filterYesNo.includes(typeValue)) {
            setFilterValue("yes_no");
            if (typeValue == "gender") {
                setFilterBoundsInput(
                    <InputGenderField
                        val={filterBoundsValue}
                        update={setFilterBoundsValue}
                    />
                );
            } else {
                setFilterBoundsInput(
                    <InputYesNoField
                        val={filterBoundsValue}
                        update={setFilterBoundsValue}
                    />
                );
            }
        }
        setFilterBoundsValue("");
    }, [typeValue]);

    useEffect(() => {
        props.setValue({
            id: ID,
            filter: filterValue,
            type: typeValue,
            value: filterBoundsValue,
        });
        setFilterBoundsValue("");
    }, [typeValue, filterValue]);

    useEffect(() => {
        props.setValue({
            id: ID,
            filter: filterValue,
            type: typeValue + "," + filterTime,
            value: filterBoundsValue,
        });
    }, [filterBoundsValue]);

    const handleTypeChange = (e) => {
        setFilterTime("");
        setFilterBoundsValue("");
        setFilterBoundsInput();
        setTimeObject();
        setTypeValue(e.value);
        props.setValue({
            id: ID,
            filter: filterValue,
            type: e.value,
            value: "",
        });
    };

    const handleTimeChange = (e) => {
        setFilterTime(e.value);
        //TODO WHEN CHANGINT TIME OF HAS BANK ACCOUNT< RESET YES NO VALUE
        props.setValue({
            id: ID,
            filter: filterValue,
            type: typeValue + "," + e.value,
            value: filterBoundsValue,
        });
    };

    const handleValueChange = (e) => {
        setFilterValue(e.target.value);
        props.setValue({
            id: ID,
            filter: e.target.value,
            type: typeValue,
            value: filterBoundsValue,
        });
    };

    return (
        <div className="single-filter-container">
            <Select
                placeholder="Filter By"
                options={filterFieldOptions}
                className="react-select select-filter"
                onChange={handleTypeChange}
            />
            {displayTime && <div className="time-object">{timeObject}</div>}

            {filterBoundsInput}
        </div>
    );
};

export default FilterField;

// useEffect(() => {
//     for (let i = 0; i < props.filters.length; ++i) {
//         if (props.filters[i].id == ID) {
//             setTypeValue(props.filters[i].type);
//             setFilterValue(props.filters[i].value);
//             break;
// 
//         }
//     }
// }, [])

// useEffect(() => {
//     // console.log("TYPE: " + typeValue)
//     // console.log("Filter " + filterValue)

//     // // let tmp = [...props.filters]

//     // // for (let i = 0; i < tmp.length; ++i) {
//     // //     if (tmp[i].id == ID) {
//     // //         tmp[i].type = typeValue;
//     // //         tmp[i].value = filterValue;
//     // //         break;
//     // //     }
//     // // }

// }, [typeValue, filterValue])
// const old = () => {
//     // const [filter, setFilter] = useState([])
//     // const [typeValue, setTypeValue] = useState("");
//     // const [filterValue, setFilterValue] = useState("");

//     // useEffect(() => {
//     //     for (let i = 0; i < props.filters.length; ++i) {
//     //         if (props.filters[i][0] == props.id) {
//     //             setFilter(props.filters[i])
//     //             setTypeValue(props.filters[i][1])
//     //             setFilterValue(props.filters[i][2])
//     //             break;
//     //         }
//     //     }
//     // }, [])

//     // useEffect(() => {
//     //     let tmp = [...props.filters]
//     //     for (let i = 0; i < tmp.length; ++i) {
//     //         if (tmp[i][0] == props.id) {
//     //             tmp[i][1] = typeValue
//     //             tmp[i][2] = filterValue
//     //             break;
//     //         }
//     //     }
//     //     props.setValue([...tmp])
//     // }, [filter])

//     // const handleTypeChange = (e) => {
//     //     setTypeValue(e.target.value);
//     //     setFilter([props.id, e.target.value, filterValue])
//     // };

//     // const handleValueChange = (e) => {
//     //     setFilterValue(e.target.value);
//     //     setFilter([props.id, typeValue, e.target.value])
//     // };
// }
