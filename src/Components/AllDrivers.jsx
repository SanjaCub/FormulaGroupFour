import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";

export default function AllDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
    };

    const handleClickDetails = (id) => {
        const link = `/driverDetails/${id}`;
        navigate(link);
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <div> <h1>Drivers Champsionship</h1></div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>Driver Championship Standings - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => {
                            return (
                                <tr key={driver.position}>
                                    <td>{driver.position}</td>
                                    <td onClick={() => handleClickDetails(driver.Driver.driverId)}>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                    <td>{driver.Constructors[0].name}</td>
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


