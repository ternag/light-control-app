import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControlLabel, Switch, FormGroup } from '@material-ui/core';
import axios from 'axios';

interface Light {
  id: number;
  display: string;
  state: boolean;
}

function Led({id, display, state}:Light) {
  const [checked, setChecked] = useState(state);

  const toggleChecked = () => {
    axios.get(`https://rasp3:5001/api/led/${id}/_flick`)
          .then((response:any) => {
          const led = {...response.data}
          setChecked(() => led.state);
          })
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={toggleChecked}/>}
      label={display} 
      labelPlacement="start"
    />
    
  );
}

function LightControl() {
  const [leds, setLeds] = useState([]);
  useEffect(() => {
    axios.get(`https://rasp3:5001/api/led`)
         .then((response:any) => {
          setLeds(response.data);
         });
  }, []);

  return(
    <FormGroup>
      <h2>Lights</h2>
      <ul>
        { leds.map((led:Light) => (
          <Led {...led}/>
        )) }
      </ul>
    </FormGroup>

  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LightControl/>
      </header>
    </div>
  );
}

export default App;
