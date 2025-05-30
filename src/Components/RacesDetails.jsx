import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Flag from "react-flagkit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getBgColor } from "../helper/getBgColor";
import { getCountryFlag, getCountryPrixFlag } from "../helper/getFlag";

export default function RacesDetails(props) {
    const [races, setRaces] = useState([]);
    const [racesDetails, setRacesDetails] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [searchResults1, setSearchResults1] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRacesDetailsAndResults();
    }, [props.selectedYear]);

    useEffect(() => {
        const results = racesDetails?.filter(raceDetail => {
            if (props.searchTerm === "") {
                return raceDetail;
            } else {
                return raceDetail.Driver.familyName.toLowerCase().includes(props.searchTerm);
            }
        });
        setSearchResults(results);
    }, [props.searchTerm, racesDetails]);


    useEffect(() => {
        const results1 = raceResults?.filter(raceResult => {
            if (props.searchTerm === "") {
                return raceResult;
            } else {
                return raceResult.Driver.familyName.toLowerCase().includes(props.searchTerm);
            }
        });
        setSearchResults1(results1);
    }, [props.searchTerm, raceResults]);



    // Quailifiers
    const getRacesDetailsAndResults = async () => {
        const qualifiersUrl = `http://ergast.com/api/f1/${props.selectedYear}/${params.racesId}/qualifying.json`;
        const resultsUrl = `http://ergast.com/api/f1/${props.selectedYear}/${params.racesId}/results.json`;
        const responseQualifiers = await axios.get(qualifiersUrl);
        const responseResults = await axios.get(resultsUrl);
        setRaces(responseResults.data.MRData.RaceTable.Races);
        setRacesDetails(responseQualifiers.data.MRData.RaceTable.Races[0]?.QualifyingResults);
        setRaceResults(responseResults.data.MRData.RaceTable.Races[0]?.Results);
        setIsLoading(false);
    };

    const handleClickWiki = (url) => {
        const link = `${url}`;
        window.open(link);
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
        return <Loader />;
    };

    return (
        <div className="details-container">
            {races.map((race) => {
                return (
                    <div className="info-wraper" key={race.round}>
                        {/* info wrapper */}

                        <div className="info-containerOne">
                            <div>
                                <div>
                                    <h1 className="title">{race.raceName}</h1>
                                </div>

                                {/* flag */}
                                <div>
                                    <Flag country={getCountryPrixFlag(race.Circuit.Location.country, props.flags)} className="info-flag" />
                                </div>
                            </div>
                        </div>

                        {/* info two */}
                        <div>
                            <div className="info-containerTwo">
                                <p>Country: </p>
                                <p>{race.Circuit.Location.country}</p>
                            </div>

                            <div className="info-containerTwo">
                                <p>Location:</p>
                                <p>{race.Circuit.Location.locality}</p>

                            </div>

                            <div className="info-containerTwo">
                                <p>Date: </p>
                                <p>{race.date}</p>
                            </div>

                            <div className="info-containerTwo">
                                <p>Report: </p>
                                <p className="details"><OpenInNewIcon onClick={() => handleClickWiki(race.url)} /></p>

                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Results */}
            <div className="table-container details-container" style={{ gap: "20px" }}>
                <table className="single-table">
                    <thead>
                        <tr>
                            <th colSpan={4}>Qualifying Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                        { searchResults?.length > 0 ? searchResults?.map((raceDetail) => {
                            const lapTimes = [raceDetail.Q1, raceDetail.Q2, raceDetail.Q3].sort();
                            return (
                                <tr key={raceDetail.position}>
                                    <td>{raceDetail.position}</td>
                                    <td className="details" onClick={() => handleClickDetails(raceDetail.Driver.driverId)} >
                                        <div className="flag-container">
                                            <Flag country={getCountryFlag(raceDetail.Driver.nationality, props.flags)} />{raceDetail.Driver.familyName}
                                        </div>
                                    </td>
                                    <td className="details" onClick={() => handleClickTeamDetails(raceDetail.Constructor.constructorId)} >{raceDetail.Constructor.name}</td>
                                    <td>{lapTimes[0]}</td>
                                </tr>
                            );
                        }) : <tr><td colSpan={5}>No data</td></tr>}

                    </tbody>
                </table>

                {/* Races */}
                <table className="single-table">
                    <thead>
                        <tr>
                            <th colSpan={5}>Race Results</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>

                        {searchResults1?.length > 0 ? searchResults1.map((raceResult) => {
                            return (

                                <tr key={raceResult.position}>
                                    <td>{raceResult.position}</td>
                                    <td className="details" onClick={() => handleClickDetails(raceResult.Driver.driverId)}>
                                        <div className="flag-container">
                                            <Flag country={getCountryFlag(raceResult.Driver.nationality, props.flags)} /> {raceResult.Driver.familyName}
                                        </div>
                                    </td>
                                    <td className="details" onClick={() => handleClickTeamDetails(raceResult.Constructor.constructorId)} >{raceResult.Constructor.name}</td>
                                    <td>{raceResult.Time?.time ? raceResult.Time.time : "No time"}</td>
                                    <td style={{ backgroundColor: getBgColor(Number(raceResult.points)) }}> {raceResult.points}</td>
                                </tr>

                            );
                        }) : <tr><td colSpan={5}>No data</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}