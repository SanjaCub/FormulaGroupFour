import { GridLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="loader">
            <GridLoader size={60} color="red" />
        </div>
    );
}