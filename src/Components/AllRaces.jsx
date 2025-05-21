import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";

export default function AllRaces() {

    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [flags, setFlags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        setRaces(response.data.MRData.RaceTable.Races);


        const flagsUrl = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlag = await axios.get(flagsUrl);
        console.log("response ", responseFlag.data);
        setFlags(responseFlag.data);
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
                        console.log(race)
                        return (
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td onClick={() => handleClickGrandPrix(race.round)}>
                                    {(race.Circuit.Location.country === "UK") && <Flag country="GB" />}
                                    {(race.Circuit.Location.country === "Korea") && <Flag country="KR" />}
                                    {(race.Circuit.Location.country === "UAE") && <Flag country="AE" />}
                                    {(race.Circuit.Location.country === "USA") && <Flag country="US" />}
                                    {flags.map((flag) => {
                                        if (race.Circuit.Location.country === flag.en_short_name) {
                                            return (
                                                <Flag country={flag.alpha_2_code} />
                                            );
                                        }
                                    })}
                                    {race.raceName}</td>
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
