import { useEffect, useState } from "react";

export default function Year(props) {

    const [years, setYears] = useState([]);

    useEffect(() => {
        getYears();
    }, []);

    const handleSelectedValue = (e) => {
        props.setSelectedYear(e.target.value);
    }

    const getYears = () => {
        const localYears = [];
        for (let i = 2000; i < new Date().getFullYear(); i++) { localYears.push(i) };
        setYears(localYears);
    }

    return (
        <div>
            {/* <label style={{ color: "white" }}>SELECT YEAR:</label> */}
            <select value = {props.selectedYear} onChange={handleSelectedValue}>
                {years.map((year) => {
                    return (
                        <option key={year} value={year}>
                            {year}
                        </option>)
                })}
            </select>
        </div>
    )
}


