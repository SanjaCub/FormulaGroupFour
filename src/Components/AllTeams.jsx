import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function App() {

    const [allTeams, setAllTeams] = useState([]);
    const [isLoading, setIsLoading] = useState (true);

    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        const response = await axios.get("http://ergast.com/api/f1/2013/constructorStandings.json");
        console.log(response.data);
        setIsLoading(false);
        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    };


    if (isLoading) {
        return <Loader />
    }


    return (
        <>
            <div><h1>Constructors Championship</h1></div>
            <table>

                <thead>
                    <tr>
                        <th colSpan={4}>Constructors Championship Standings - 2013</th>
                    </tr>
                </thead>

                <tbody>
                    {allTeams.map((team) => {
                        return (
                            <tr key={team.position}>
                                <td>{team.position}</td>
                                <td>{team.Constructor.nationality} {team.Constructor.name}</td>
                                <td>Details {team.Constructor.url}</td>
                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </>
    )
}
