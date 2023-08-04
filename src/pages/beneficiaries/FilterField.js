import React, { useEffect, useState } from "react";

const FilterField = (props) => {
    const [typeValue, setTypeValue] = useState(props.filters[props.id][0])
    const [filterValue, setFilterValue] = useState(props.filters[props.id][1])

    const handleTypeChange = (e) => {
        setTypeValue(e.target.value)
        let newFilters = [...props.filters];

        newFilters[props.id][0] = e.target.value;
        props.setValue(newFilters);
    }


    const handleValueChange = (e) => {
        setFilterValue(e.target.value)
        let newFilters = [...props.filters];

        newFilters[props.id][1] = e.target.value;
        props.setValue(newFilters);
    }



    return (
        <div className="single-filter-container">
            <input type="search" value={typeValue} onChange={handleTypeChange} />
            <h3>TYPE: {typeValue}</h3>
            {props.id}
            <input type="search" value={filterValue} onChange={handleValueChange} />
            <h3>VAL: {filterValue}</h3>
        </div>
    )

}

export default FilterField
