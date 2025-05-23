import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useParams } from "react-router";
import Flag from "react-flagkit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getBgColor } from "../helper/getBgColor";
import { getCountryFlag, getCountryPrixFlag } from "../helper/getFlag";

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

  if (isLoading) {
    return <Loader />;
  };


  return (
    <div className="details-container">
      {/*Team Details*/}

      {teamDetails.map((teamDetail) => {
        return (
          <div className="info-wraper" key={teamDetail.Constructor.constructorId}>
            <div className="info-containerOne">
              <div className="team-img"><img src={`/images/${teamDetail.Constructor.constructorId}.png`} /></div>
              <div >

                {/* Flags */}
                <div onClick={() => handleClickGrandPrix(teamDetail.Constructor.constructorId)}>
                  <Flag country={getCountryFlag(teamDetail.Constructor.nationality, props.flags)} className="info-flag" /></div>

                <div>
                  <h1 className="title">{teamDetail.Constructor.name}</h1>
                </div>
              </div>
            </div>

            <div>
              <div className="info-containerTwo">
                <p>Country:</p>
                <p>{teamDetail.Constructor.nationality}</p>
              </div>
              <div className="info-containerTwo">
                <p>Position:</p>
                <p>{teamDetail.position}</p>
              </div>
              <div className="info-containerTwo">
                <p>Points:</p>
                <p>{teamDetail.points}</p>
              </div>
              <div className="info-containerTwo">
                <p>History:</p>
                <p >  <OpenInNewIcon onClick={() => handleClickWikipedia(teamDetail.Constructor.url)} className="details" /></p>
              </div>

            </div>

          </div>
        )
      })}


      {/*Team Results*/}
      <div className="table-container">
        < table className="single-table">
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
                  <td className="details" onClick={() => handleClickWikipedia(teamResult.url)}><div className="flag-container"><Flag country={getCountryPrixFlag(teamResult.Circuit.Location.country, props.flags)} /> {teamResult.raceName}</div></td>
                  <td style={{ backgroundColor: getBgColor(Number(teamResult.Results[0].position)) }}> {teamResult.Results[0].position}</td>
                  <td style={{ backgroundColor: getBgColor(Number(teamResult.Results[1].position)) }}> {teamResult.Results[1].position}</td>
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
