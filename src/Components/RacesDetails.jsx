import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router";

export default function RacesDetails() {

    const [races, setRaces] = useState([]);
    const [racesDetails, setRacesDetails] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getRacesDetailsAndResults();
    }, []);

    // Quailifiers
    const getRacesDetailsAndResults = async () => {
        const qualifiersUrl = `http://ergast.com/api/f1/2013/${params.racesId}/qualifying.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/${params.racesId}/results.json`;
        const responseQualifiers = await axios.get(qualifiersUrl);
        const responseResults = await axios.get(resultsUrl);
        setRaces(responseResults.data.MRData.RaceTable.Races);
        console.log(responseResults.data.MRData.RaceTable.Races);
        setRacesDetails(responseQualifiers.data.MRData.RaceTable.Races[0].QualifyingResults);
        setRaceResults(responseResults.data.MRData.RaceTable.Races[0].Results);
        setIsLoading(false);
    };

    const handleClickWiki = (url) => {
        const link = `${url}`;
        window.open(link);
    };

    if (isLoading) {
        return <Loader />;
    };

    return (
        <>
            {races.map((race) => {
                return (
                    <div key={race.round}>
                        <div>
                            <p>Flag</p>
                        </div>
                        <div>
                            <h1>{race.raceName}</h1>
                        </div>
                        <div>
                            <div>Country: </div>
                            <div>{race.Circuit.Location.country}</div>
                        </div>
                        <div>
                            <div>Location: </div>
                            <div>{race.Circuit.Location.locality}</div>
                        </div>
                        <div>
                            <div>Date: </div>
                            <div>{race.date}</div>
                        </div>
                        <div>
                            <div>Report: </div>
                            <div onClick={() => handleClickWiki(race.url)}>Link</div>
                        </div>
                    </div>
                )
            })}

            {/* Results */}
            <div>
                <table>
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

                        {racesDetails.map((raceDetail) => {
                            const lapTimes = [raceDetail.Q1, raceDetail.Q2, raceDetail.Q3].sort();

                            return (

                                <tr key={raceDetail.position}>
                                    <td>{raceDetail.position}</td>
                                    <td>{raceDetail.Driver.familyName}</td>
                                    <td>{raceDetail.Constructor.name}</td>
                                    <td>{lapTimes[0]}</td>

                                </tr>

                            );
                        })}

                    </tbody>
                </table>
            </div>


            {/* Races */}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>Race Results</th>
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

                        {raceResults.map((raceResult) => {

                            //console.log(raceResult.Time)
                            return (

                                <tr key={raceResult.position}>
                                    <td>{raceResult.position}</td>
                                    <td>{raceResult.Driver.familyName}</td>
                                    <td>{raceResult.Constructor.name}</td>
                                    <td>{raceResult.Time?.time ? raceResult.Time.time : "No time"}</td>
                                    <td>{raceResult.points}</td>

                                </tr>

                            );
                        })}

                    </tbody>
                </table>
            </div>

        </>
    );
}

