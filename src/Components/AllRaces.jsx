import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";

export default function AllRaces() {

    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log(response.data.MRData)
        setRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const handleClickGrandPrix = (id) => {
        const link = `/racesDetails/${id}`
        navigate(link);
    }


    if (isLoading) {
        return <Loader />;
    };

    return (
        <>
            <h1>Race calendar</h1>
            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>Race Calendar - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Round</th>
                        <th>Grand prix</th>
                        <th>Circuit</th>
                        <th>Data</th>
                        <th>Winner</th>
                    </tr>
                    {races.map((race) => {
                        return (

                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td onClick={() => handleClickGrandPrix(race.round)}>{race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>{race.Results[0].Driver.familyName}</td>


                            </tr>

                        );

                    })}
                </tbody>
            </table>

        </>
    );
}
