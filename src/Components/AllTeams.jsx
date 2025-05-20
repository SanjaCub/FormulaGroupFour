import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router";

export default function App() {

    const [allTeams, setAllTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        const response = await axios.get("http://ergast.com/api/f1/2013/constructorStandings.json");
        console.log(response.data);
        setIsLoading(false);
        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    };

    const handleClickDetails = (id) => {
        const link = `/teamsDetails/${id}`;
        navigate(link);
    };

    const handleClickWiki = (url) => {
        const link = `${url}`;
        window.open(link);
    };

    if (isLoading) {
        return <Loader />
    };


    return (
        <div>
            <div><h1>Constructors Championship</h1></div>
            <div>
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
                                    <td onClick={() => handleClickDetails(team.Constructor.constructorId)}>{team.Constructor.nationality} {team.Constructor.name}</td>
                                    <td onClick={() => handleClickWiki(team.Constructor.url)}>Details</td>
                                    <td>{team.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
