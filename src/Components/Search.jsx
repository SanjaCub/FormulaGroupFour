export default function Search(props) {
   const handleInputSearch = (e) => {
    props.setSearchTerm(e.target.value.toLowerCase());
   }

    return(
        <>
         <input
         type="search"
         name="text"
         placeholder="Enter text"
         value={props.searchTerm}
         onChange={handleInputSearch}/>
        </>
    );
}