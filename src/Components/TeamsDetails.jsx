import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useParams, useNavigate } from "react-router";
import Flag from "react-flagkit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getBgColor } from "../helper/getBgColor";
import { getCountryFlag, getCountryPrixFlag } from "../helper/getFlag";

export default function TeamsDetails(props) {

  const [teamDetails, setTeamDetails] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const imgRef = useRef();

  useEffect(() => {
    getTeamDetailsandResults();
  }, [props.selectedYear]);

  useEffect(() => {
    const results = teamResults.filter(teamResult => {
      if (props.searchTerm === "") {
        return teamResult;
      } else {
        return teamResult.raceName.toLowerCase().includes(props.searchTerm)
      }
    });
    setSearchResults(results);
  }, [props.searchTerm, teamResults]);


  const getTeamDetailsandResults = async () => {
    const detailsURL = await axios.get(`http://ergast.com/api/f1/${props.selectedYear}/constructors/${params.teamsId}/constructorStandings.json`);
    const resultsURL = await axios.get(`http://ergast.com/api/f1/${props.selectedYear}/constructors/${params.teamsId}/results.json`);
    setTeamDetails(detailsURL.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings);
    setTeamResults(resultsURL.data.MRData.RaceTable.Races);
    setIsLoading(false);
  };

  const handleClickWikipedia = (url) => {
    const link = `${url}`;
    window.open(link);
  };

  const handleClickGrandPrix = (id) => {
    const link = `/races/${id}`
    navigate(link);
  }

  const imageWithFallback = (src) => {
    const onImageError = () => imgRef.current.src = "/images/team.png";
    return (
      <img ref={imgRef} src={src} onError={onImageError} />
    )
  }


  if (isLoading) {
    return <Loader />;
  };


  return (
    <div className="details-container">
      {/*Team Details*/}

      {teamDetails?.map((teamDetail) => {
        return (
          <div className="info-wraper" key={teamDetail.Constructor.constructorId}>
            <div className="info-containerOne">
              <div className="team-img"><>{imageWithFallback(`/images/${teamDetail.Constructor.constructorId}.png`)} </></div>
              <div >

                {/* Flags */}
                <div >
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
              <th>{teamResults[0]?.Results[0].Driver ? teamResults[0].Results[0].Driver.familyName : "Driver 1"}</th>
              <th>{teamResults[0]?.Results[1].Driver ? teamResults[0].Results[1].Driver.familyName : "Driver 2"}</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.length > 0 ? searchResults.map((teamResult) => {
              return (
                <tr key={teamResult.round}>
                  <td>{teamResult.round}</td>

                  {/* Flags */}
                  <td onClick={() => handleClickGrandPrix(teamResult.round)} className="details"><div className="flag-container"><Flag country={getCountryPrixFlag(teamResult.Circuit.Location.country, props.flags)} /> {teamResult.raceName}</div></td>
                  <td style={{ backgroundColor: getBgColor(Number(teamResult.Results[0] ? teamResult.Results[0].position : "0")) }}> {teamResult.Results[0] ? teamResult.Results[0].position : 0}</td>
                  <td style={{ backgroundColor: getBgColor(Number(teamResult.Results[1] ? teamResult.Results[1].position : "0")) }}> {teamResult.Results[1] ? teamResult.Results[1].position : 0}</td>
                  <td>{Number(teamResult.Results[0] ? teamResult.Results[0]?.points : 0) + Number(teamResult.Results[1] ? teamResult.Results[1]?.points : 0)}</td>
                </tr>
              );
            }) : <tr><td colSpan={5}>No data</td></tr>}
          </tbody>
        </table>
      </div>

    </div>
  )
}
