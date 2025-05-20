import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useParams } from "react-router";

export default function TeamsDetails() {

  const [teamDetails, setTeamDetails] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getTeamDetailsandResults();
  }, []);


  const getTeamDetailsandResults = async () => {
    const detailsURL = await axios.get(`http://ergast.com/api/f1/2013/constructors/${params.teamsId}/constructorStandings.json`);
    const resultsURL = await axios.get(`http://ergast.com/api/f1/2013/constructors/${params.teamsId}/results.json`);

    console.log(resultsURL.data.MRData.RaceTable.Races);
    setTeamDetails(detailsURL.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setTeamResults(resultsURL.data.MRData.RaceTable.Races);
    setIsLoading(false);
  };

  const handleClickWikipedia = (url) => {
    const link = `${url}`;
    window.open(link);
  };


  if (isLoading) {
    return <Loader />;
  };


  return (
    <div>
      {/*Team Details*/}
      <div>
        {teamDetails.map((teamDetail) => {
          return (
            <div key={teamDetail.Constructor.constructorId}>
              <div>
                <div>Slika</div>
                <div>
                  <div>{teamDetail.Constructor.nationality}</div>
                  <h1>{teamDetail.Constructor.name}</h1>
                </div>
              </div>

              <div>
                <div>
                  <p>Country:</p>
                  <p>{teamDetail.Constructor.nationality}</p>
                </div>
                <div>
                  <p>Position:</p>
                  <p>{teamDetail.position}</p>
                </div>
                <div>
                  <p>Points:</p>
                  <p>{teamDetail.points}</p>
                </div>
                <div>
                  <p>History:</p>
                  <p onClick={() => handleClickWikipedia(teamDetail.Constructor.url)}>Ikonica</p>
                </div>

              </div>

            </div>
          )
        })}
      </div>

      {/*Team Results*/}
      <div>
        < table >
          <thead>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              <th>Vettel</th>
              <th>Webber</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {teamResults.map((teamResult) => {
              return (
                <tr key={teamResult.round}>
                  <td>{teamResult.round}</td>
                  <td onClick={() => handleClickWikipedia(teamResult.url)}>{teamResult.raceName}</td>
                  <td>{teamResult.Results[0].position}</td>
                  <td>{teamResult.Results[1].position}</td>
                  <td>{Number(teamResult.Results[0].points) + Number(teamResult.Results[1].points)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
