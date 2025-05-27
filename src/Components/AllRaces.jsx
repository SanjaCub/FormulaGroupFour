import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";
import { getCountryFlag, getCountryPrixFlag } from "../helper/getFlag";


export default function AllRaces(props) {
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, [props.selectedYear]);

    useEffect(() => {
        const results = races.filter(race => {
            if(props.searchTerm === "") {
                return race;
            } else {
                return race.raceName.toLowerCase().includes(props.searchTerm) || 
            race.Circuit.circuitName.toLowerCase().includes(props.searchTerm) || race.Results[0].Driver.familyName.toLowerCase().includes(props.searchTerm);
            }
        });
        setSearchResults(results);
    }, [props.searchTerm, races]);


    const getRaces = async () => {
        const url = `http://ergast.com/api/f1/${props.selectedYear}/results/1.json`;
        const response = await axios.get(url);
        setRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const handleClickGrandPrix = (id) => {
        const link = `/races/${id}`
        navigate(link);
    }

    const handleClickDriverDetails = (id) => {
        const link = `/drivers/${id}`;
        navigate(link);
    };

    if (isLoading) {
        return <Loader />;
    };

    return (
        <div className="container">
            <div><h1>Race calendar</h1></div>
            <div className="all-container">
                <table className="single-table">
                    <thead>
                        <tr>
                            <th colSpan={5}>Race Calendar - {props.selectedYear}</th>
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
                        {searchResults.map((race) => {
                            return (
                                <tr key={race.round}>
                                    <td>{race.round}</td>
                                    <td className="details" onClick={() => handleClickGrandPrix(race.round)}>
                                        <div className="flag-container">
                                            <Flag country={getCountryPrixFlag(race.Circuit.Location.country, props.flags)} />
                                            {race.raceName}
                                        </div>
                                    </td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td onClick={()=> handleClickDriverDetails(race.Results[0].Driver.driverId)} className="details">
                                        <div className="flag-container">
                                            <Flag country={getCountryFlag(race.Results[0].Driver.nationality, props.flags)} /> {race.Results[0].Driver.familyName}
                                        </div>
                                    </td>
                                </tr>
                            );

                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

