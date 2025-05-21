import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router";
import Flag from "react-flagkit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function DriversDetails(props) {
    const [details, setDetails] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getDetailsAndResults();
    }, []);

    const getDetailsAndResults = async () => {
        const detailsUrl = `https://ergast.com/api/f1/2013/drivers/${params.driversId}/driverStandings.json`;
        const resultsUrl = `https://ergast.com/api/f1/2013/drivers/${params.driversId}/results.json`;
        const responseDetails = await axios.get(detailsUrl);
        const responseResults = await axios.get(resultsUrl);
        setDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setResults(responseResults.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const getCountryDriverFlag = (nat) => {
        const flag = props.flags.find(flag => flag.nationality.includes(nat));
        return flag && flag.alpha_2_code;
    }

    const getCountryPrixFlag = (country) => {
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
            return flag && flag.alpha_2_code;
        }
    }


    const handleClickWiki = (url) => {
        const link = `${url}`;
        window.open(link);
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            {details.map((detail) => {
                return (
                    <div key={detail.position}>
                        <div>
                            <div> <img src={`/images/${detail.Driver.driverId}.jpg`} alt="" /></div>
                            <div>
                                <div>< Flag country={getCountryDriverFlag(detail.Driver.nationality)} /></div>
                                <h1>{detail.Driver.givenName} {detail.Driver.familyName}</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Country:</p>
                                <p>{detail.Driver.nationality}</p>
                            </div>
                            <div>
                                <p>Team:</p>
                                <p>{detail.Constructors[0].name}</p>
                            </div>
                            <div>
                                <p>Birth:</p>
                                <p>{detail.Driver.dateOfBirth}</p>
                            </div>
                            <div>
                                <p>Biography:</p>
                                <p> <OpenInNewIcon onClick={() => handleClickWiki(detail.Driver.url)}/></p>
                            </div>
                        </div>
                    </div>);
            })}

            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>Formula 1 2013 Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Round</td>
                            <td>Grand Prix</td>
                            <td>Team</td>
                            <td>Grid</td>
                            <td>Race</td>
                        </tr>
                        {results.map((result) => {
                            return (
                                <tr key={result.round}>
                                    <td>{result.round}</td>
                                    <td> < Flag country={getCountryPrixFlag(result.Circuit.Location.country)} />{result.raceName}</td>
                                    <td>{result.Results[0].Constructor.name}</td>
                                    <td >{result.Results[0].grid}</td>
                                    <td>{result.Results[0].position}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );

}