import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";


export default function AllRaces(props) {
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        setRaces(response.data.MRData.RaceTable.Races);
        console.log("niz ", response.data.MRData.RaceTable);
        setIsLoading(false);
    };

    const handleClickGrandPrix = (id) => {
        const link = `/racesDetails/${id}`
        navigate(link);
    }

    const getCountryFlag = (country) => {
        if (country === "UK") {
            return "GB"
        }
        else if (country === "Korea") {
            return "KR"
        }

        else if (country === "UAE") {
            return "AE"
        }

        else if (country === "USA") {
            return "US"
        }
        else {
            const flag = props.flags.find(flag => flag.en_short_name === country);
            return flag.alpha_2_code;
        }
    }

    const getCountryFlagNationality = (nationality) => {
        const flag = props.flags.find(flag => flag.nationality.includes(nationality));
        return flag?.alpha_2_code;
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
                                <td onClick={() => handleClickGrandPrix(race.round)}>
                                    <Flag country={getCountryFlag(race.Circuit.Location.country)} />
                                    {race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td> <Flag country={getCountryFlagNationality(race.Results[0].Driver.nationality)} /> {race.Results[0].Driver.familyName}</td>
                            </tr>
                        );

                    })}

                </tbody>
            </table>
        </>
    );
}

