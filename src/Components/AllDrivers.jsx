import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import { getCountryFlag } from "../helper/getFlag";

export default function AllDrivers(props) {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getDrivers();
    }, [props.selectedYear]);

    useEffect(() => {
        const results = drivers.filter(driver => {
            if(props.searchTerm === "") {
                return  driver;
            } else {
                return driver.Driver.givenName.toLowerCase().includes(props.searchTerm) || driver.Driver.familyName.toLowerCase().includes(props.searchTerm) || driver.Constructors[0].name.toLowerCase().includes(props.searchTerm);
            }
        });
        setSearchResults(results);
    }, [props.searchTerm, drivers]);

    const getDrivers = async () => {
        const url = `https://ergast.com/api/f1/${props.selectedYear}/driverStandings.json`;
        const response = await axios.get(url);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
    };


    const handleClickDetails = (id) => {
        const link = `/drivers/${id}`;
        navigate(link);
    };

    const handleClickTeamDetails = (id) => {
        const link = `/teams/${id}`;
        navigate(link);
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="container">
            <div><h1>Drivers Champsionship</h1></div>
            <div className="all-container">
                <table className="single-table">
                    <thead>
                        <tr>
                            <th colSpan={4}>Driver Championship Standings - {props.selectedYear}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((driver) => {
                            return (
                                <tr key={driver.position}>
                                    <td>{driver.position}</td>

                                    <td onClick={() => handleClickDetails(driver.Driver.driverId)} className="details">
                                        <div className="flag-container" >
                                            < Flag country={getCountryFlag(driver.Driver.nationality, props.flags)} />

                                            {driver.Driver.givenName} {driver.Driver.familyName}
                                        </div></td>
                                    <td onClick={() => handleClickTeamDetails(driver.Constructors[0].constructorId)} className="details">{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}


