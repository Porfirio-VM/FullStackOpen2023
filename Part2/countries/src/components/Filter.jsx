
const Filter = ({ onFilterChange }) => {
    return(
            <div>
                Find countries<input type="text" id="filter" onChange={onFilterChange}/>
            </div>
    )
}

export default Filter