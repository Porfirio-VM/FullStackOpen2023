import { useState } from "react"

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = { 0: 1, 1: 3, 2: 4, 3: 2, 4: 0, 5: 0}

const Button = ({ text, event }) =>{
    return <button onClick={event}>{text}</button>
}

const Main = ({ anecdotes, points }) =>{
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(points)

  const randomizeAnecdote = () =>{
    let generateRandom
    do{
        generateRandom = Math.floor(Math.random() * anecdotes.length)
      }while(generateRandom === selected)
    setSelected(generateRandom)
  }

  const addVote = () =>{
    const newVotes = {...vote}
    newVotes[selected] +=1 ;
    setVote(newVotes)
  }

  const mostVotedAnecdote = Object.keys(vote).reduce((a, b) => vote[a] > vote[b] ? a : b);

    return (
      <main>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {vote[selected]} votes</p>
        <Button text='Vote' event={addVote}/>
        <Button text='Next anecdote' event={randomizeAnecdote}/>
        <p></p>
        <h2>anecdote with most votes</h2>
        <p>{anecdotes[mostVotedAnecdote]}</p>
      </main>
    )
}

function App() {
  return (
    <>
      <Main anecdotes={anecdotes} points={points}/>
    </>
  )
}

export default App
