import React, { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components"

const Entry = styled.div`
  max-width: 600px;
  background-color: ${props => props.best ? '#80B908' : '#464646'};
  display: flex;
  margin: 10px auto;
  font-size: 34px;
`
const Batch = styled.span`
  margin: auto;
  background-color: white;
  color: black;
  padding: 10px;
`

const Name = styled.span`
  margin: auto;
  padding: 10px;
  flex-grow: 1;
  text-align: start;
  color: white;
`

const Time = styled.span`
  margin: auto;
  padding: 10px;
  color: white;
`


const ScoreBlock = ({entry, best}) => {
  return <Entry key={entry.name} best={best}>
    <Batch>{entry.batch}</Batch>
    <Name>{entry.name}</Name>
    <Time>{entry.best}</Time>
  </Entry>
}

function App() {
  const [, setWebsocket] = useState()
  const [scores, setScores] = useState([])

  useEffect(() => {
    const newWebsocket = new WebSocket("ws://racing-overlay.herokuapp.com")
    newWebsocket.onopen = function (event) {
      setWebsocket(newWebsocket)
    };
    newWebsocket.onmessage = (event) => {
      console.log(event)
      const newScores = JSON.parse(event.data)
      console.log(newScores)
      setScores(newScores)
    }
  }, [])

  return (
    <div className="App">
        <div>
          {scores.map((score, index) => (
            <ScoreBlock entry={score} best={index === 0}/>
          ))}
        </div>
    </div>
  );
}

export default App;
