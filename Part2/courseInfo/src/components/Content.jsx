import Part from "./Part";

const Content = ({ course: {parts} }) => {
    return(
       <>
        {
            parts.map( part => <Part key={part.id} name={part.name} exercise={part.exercise}/>)
        }
       </>
    )
}

export default Content;