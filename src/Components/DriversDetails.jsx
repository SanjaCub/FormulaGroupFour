import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import { useParams, useNavigate } from "react-router";
import Flag from "react-flagkit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getBgColor } from "../helper/getBgColor";
import { getCountryFlag, getCountryPrixFlag } from "../helper/getFlag";


export default function DriversDetails(props) {
    const [details, setDetails] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const imgRef = useRef();

    useEffect(() => {
        getDetailsAndResults();
    }, [props.selectedYear]);

    useEffect(() => {
        const driverResults = results.filter(result => {
            if (props.searchTerm === "") {
                return result;
            } else {
                return result.raceName.toLowerCase().includes(props.searchTerm);
            }
        });
        setSearchResults(driverResults);
    }, [props.searchTerm, results]);

    const getDetailsAndResults = async () => {
        const detailsUrl = `https://ergast.com/api/f1/${props.selectedYear}/drivers/${params.driversId}/driverStandings.json`;
        const resultsUrl = `https://ergast.com/api/f1/${props.selectedYear}/drivers/${params.driversId}/results.json`;
        const responseDetails = await axios.get(detailsUrl);
        const responseResults = await axios.get(resultsUrl);
        setDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings);
        setResults(responseResults.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const handleClickWiki = (url) => {
        const link = `${url}`;
        window.open(link);
    };

    const handleClickTeamDetails = (id) => {
        const link = `/teams/${id}`;
        navigate(link);
    };

    const handleClickRaceDetails = (id) => {
        const link = `/races/${id}`;
        navigate(link);
    };



    const imageWithFallback = (src) => {
        const onImageError = () => imgRef.current.src = "/images/avatar.png";
        return (
            <img ref={imgRef} src={src} onError={onImageError} />
        )
    }


    if (isLoading) {
        return <Loader />
    }


    return (
        <div className="details-container">
            {details?.map((detail) => {
                return (
                    <div className="info-wraper" key={detail.position}>
                        <div className="info-containerOne">
                            <div className="driver-img" ><>{imageWithFallback(`/images/${detail.Driver.driverId}.jpg`)}</> </div>
                            <div >
                                <h1 className="title">{detail.Driver.givenName} {detail.Driver.familyName}</h1>
                                <div >< Flag country={getCountryFlag(detail.Driver.nationality, props.flags)} className="info-flag" /></div>

                            </div>
                        </div>
                        <div >
                            <div className="info-containerTwo">
                                <p>Country:</p>
                                <p>{detail.Driver.nationality}</p>
                            </div>
                            <div className="info-containerTwo">
                                <p>Team:</p>
                                <p>{detail.Constructors[0].name}</p>
                            </div>
                            <div className="info-containerTwo">
                                <p>Birth:</p>
                                <p>{detail.Driver.dateOfBirth}</p>
                            </div>
                            <div className="info-containerTwo">
                                <p>Biography:</p>
                                <p className="details"> <OpenInNewIcon onClick={() => handleClickWiki(detail.Driver.url)} /></p>
                            </div>
                        </div>
                    </div>);
            })}

            <div className="table-container">
                <table className="single-table">
                    <thead>
                        <tr>
                            <th colSpan={5}>Formula 1 {props.selectedYear} Results</th>
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
                        {searchResults.length > 0 ? searchResults.map((result) => {
                            return (
                                <tr key={result.round}>
                                    <td>{result.round}</td>
                                    <td onClick={() => handleClickRaceDetails(result.round)} className="details">
                                        <div className="flag-container">
                                            < Flag country={getCountryPrixFlag(result.Circuit.Location.country, props.flags)} />{result.raceName}
                                        </div>
                                    </td>
                                    <td onClick={() => handleClickTeamDetails(result.Results[0].Constructor.constructorId)} className="details">{result.Results[0].Constructor.name}</td>
                                    <td >{result.Results[0].grid}</td>
                                    <td style={{ backgroundColor: getBgColor(Number(result.Results[0].position)) }}> {result.Results[0].position}</td>
                                </tr>
                            );
                        }) : <tr><td colSpan={5}>No data</td></tr>}
                    </tbody>
                </table>
            </div>

        </div>
    );

}