import { useState } from "react"

const Button = ({ text, feedback }) =>{
  return (
    <button onClick={feedback}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) =>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) =>{

  const all = good + neutral + bad
  const average = all > 0? ((good - bad) / all).toFixed(2) : 0
  const positive = all > 0? (( good / all ) * 100).toFixed(2) : 0

  return(
    <section>
      <h2>Statistics</h2>
      {
        all !== 0?
        (
        <table>
          <tbody>
            <StatisticLine text='Good' value={good}/>
            <StatisticLine text='Neutral' value={neutral}/>
            <StatisticLine text='Bad' value={bad}/>
            <StatisticLine text='All' value={all}/>
            <StatisticLine text='Average' value={average}/>
            <StatisticLine text='Positive' value={`${positive} %`}/>
          </tbody>
        </table>
        )
        :
        <p>No feedback given</p>
      }
    </section>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setFeedback = (setFeedback, feedback) => {
    setAll( all + 1 )
    setFeedback(feedback + 1)
  }

  return (
    <main>
      <h1>Give Feedback</h1>
      <div className="button-wrapper">
        <Button text='Good' feedback={() => setFeedback(setGood, good)}/>
        <Button text='Neutral' feedback={() =>setFeedback(setNeutral, neutral)}/>
        <Button text='Bad' feedback={() =>setFeedback(setBad, bad)}/>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </main>
  )
}

export default App
