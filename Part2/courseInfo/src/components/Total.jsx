
const Total = ({ course:{ parts } }) =>{

    const total = parts.reduce((sum, current) => sum + current.exercises, 0);

    return(
        <>
            <strong>Total of {total} exercises</strong>
        </>
    )
}

export default Total