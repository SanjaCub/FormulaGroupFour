import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useParams } from "react-router";
import Flag from "react-flagkit";

export default function TeamsDetails(props) {

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

  {/*Team Details*/ }
  const getCountryFlagDetail = (nationality) => {
    const flag = props.flags.find(flag => flag.nationality.includes(nationality));
    return flag && flag.alpha_2_code;
  }


  {/*Team Results*/ }
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
                <div><img src={`/images/${teamDetail.Constructor.constructorId}.png`} /></div>
                <div>

                    {/* Flags */}
                    <div onClick={() => handleClickGrandPrix(teamDetail.Constructor.constructorId)}>
                      <Flag country={getCountryFlagDetail(teamDetail.Constructor.nationality)} /></div>

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

                  {/* Flags */}
                  <td onClick={() => handleClickGrandPrix(teamResult.round)}>
                    <Flag country={getCountryFlag(teamResult.Circuit.Location.country)} /></td>

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
