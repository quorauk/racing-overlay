import React, { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components"

const Entry = styled.div`
  max-width: 500px;
  background-color: ${props => props.best ? '#80B908' : '#464646'};
  display: flex;
  margin: 10px auto;
  font-size: 34px;
`
const Position = styled.span`
  background-color: white;
  color: black;
  padding: 10px;
  min-width: 50px;
`

const Name = styled.span`
  margin: auto;
  padding: 10px;
  flex-grow: 1;
  text-align: start;
  color: white;
  text-overflow: ellipsis;
  whitespace: nowrap;
  overflow: hidden;
`

const Time = styled.span`
  margin: auto;
  padding: 10px;
  color: white;
  font-family: sans-serif;
`


const ScoreBlock = ({entry, best}) => {
  return <Entry key={entry.name} best={best}>
    <Position>{entry.position}</Position>
    <Name>{entry.name}</Name>
    <Time>{entry.best}</Time>
  </Entry>
}

function App() {
  const [, setWebsocket] = useState()
  const [scores, setScores] = useState([])

  useEffect(() => {
    const newWebsocket = new WebSocket("wss://racing-overlay.herokuapp.com")
    newWebsocket.onopen = function (event) {
      setWebsocket(newWebsocket)
    };
    newWebsocket.onmessage = (event) => {
      const newScores = JSON.parse(event.data)
      setScores(newScores)
    }
  }, [])

  return (
    <div className="App">
        <div>
          {scores.map((score, index) => (
            <ScoreBlock key={index} entry={score} best={index === 0}/>
          ))}
        </div>
    </div>
  );
}

export default App;
