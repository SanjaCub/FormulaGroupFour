import axios from "axios";
import { useState, useEffect } from "react";


export default function AllDrivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);

        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    };

    return (
        <div><h1>Drivers Champsionship</h1>
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
                            <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                            <td>{driver.Constructors[0].name}</td>
                            <td>{driver.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );

}


