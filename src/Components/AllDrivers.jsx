import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import { getCountryFlag } from "../helper/getFlag";

export default function AllDrivers(props) {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, [props.selectedYear]);

    const getDrivers = async () => {
        const url = `https://ergast.com/api/f1/${props.selectedYear}/driverStandings.json`;
        const response = await axios.get(url);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
    };


    const handleClickDetails = (id) => {
        const link = `/driverDetails/${id}`;
        navigate(link);
    };

    const handleClickTeamDetails = (id) => {
        const link = `/teamsDetails/${id}`;
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
                        {drivers.map((driver) => {
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


