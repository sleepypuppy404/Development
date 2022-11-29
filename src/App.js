import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import puppyData from "./assets/puppy-data.json";
import { Checkbox, FormGroup, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Slider} from '@mui/material';
import PuppyItem from "./components/PuppyItem";
import CartItem from "./components/CartItem";
import { render } from 'react-dom';

puppyData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
function App() {
  const [tracker, setVal] = useState([0, 6000]);
  const [breedSort, bSVal] = useState(0);
  const [otherFilt, otherFiltSet] = useState(0);
  const [family, incFam] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  
  const updateRange = (e, data) => {
    setVal(data);
  };
  const nbs = (e, data) => {
    bSVal(0);
  };
  const pbs = (e, data) => {
    bSVal(1);
  };
  const cbs = (e, data) => {
    bSVal(2);
  };
  const nbf = (e, data) => {
    otherFiltSet(0);
  };
  const fbf = (e, data) => {
    otherFiltSet(1);
  };
  const abf = (e, data) => {
    otherFiltSet(2);
  };
  const mbf = (e, data) => {
    otherFiltSet(3);
  };
  const Clearer = () => {
    incFam([0,0,0,0,0,0,0,0,0,0,0,0])
  };
  const handleInc = (item) => {
    incFam([...family.slice(0, item[1]),
    family[item[1]] + 1,
    ...family.slice(item[1] + 1),]);
  }
  const handleDec = (item) => {
    incFam([...family.slice(0, item[1]),
    family[item[1]] - 1,
    ...family.slice(item[1] + 1),]);
  }
  var data = puppyData.map((item, index) => [item, index]);
  data = data.filter((item) => {
    return item[0].price_min <= tracker[1] && item[0].price_max >= tracker[0];
  });
  data = data.filter((item) => {
      if(breedSort == 0){
        return true;
      }else if(breedSort == 1){
        return item[0].type == "Pure Breed";
      } else {
        return item[0].type == "Cross Breed";
      }});
  if(otherFilt != 0){
    data = data.sort((a, b) => {
        if(otherFilt == 1){
          return b[0].friendliness - a[0].friendliness;
        }else if(otherFilt == 2){
          return b[0].activity_level - a[0].activity_level;
        } else {
          return b[0].price_max - a[0].price_max;
        }})
  };
  var family_data = [];
  var tot_dogs = 0;
  var approx_cost = 0;
  var friendliness = 0;
  var activity = 0;
  family.map((value, index) => {
    if(value > 0){
      family_data.push([value, index]);
      approx_cost += (puppyData[index].price_max + puppyData[index].price_min) / 2 * value;
      friendliness += puppyData[index].friendliness * value;
      activity += puppyData[index].activity_level * value;
      tot_dogs += value;
    }});
  if(tot_dogs != 0){
    friendliness = friendliness / tot_dogs;
    activity = activity / tot_dogs;
  }
  return (
    <div className="App" style={{marginLeft:"0px"}}>
      <h1>Puppy Household Planner</h1>
      <br></br>
      <div className = "sortBox">
        <FormControl>
        <FormLabel id="demo-form-control-label-placement" style={{marginLeft:"-84%"}}>Sort by dog aspects</FormLabel>
          <RadioGroup
            row
            aria-labelledby="puppy_sorting"
            defaultValue="None"
            labelPlacement = "Start"
            name="radio-buttons-group">
            <FormControlLabel value="None" control={<Radio onChange={nbf}/>} label="None" />
            <FormControlLabel value="Friendliness" control={<Radio onChange={fbf}/>} label="Friendliness (Most to Least)" />
            <FormControlLabel value="Activity Level" control={<Radio onChange={abf}/>} label="Activity Level (Highest to Lowest)" />
            <FormControlLabel value="Mean Price" control={<Radio onChange={mbf}/>} label="Max Price (Highest to Lowest)"/>
          </RadioGroup>
        </FormControl>
      </div>
      <div className = "sortBox">
        <FormControl>
        <FormLabel id="demo-form-control-label-placement" style={{marginLeft:"-60%"}}>Filter by breed type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="puppy_sorting"
            defaultValue="None"
            name="radio-buttons-group">
            <FormControlLabel value="None" control={<Radio onChange={nbs}/>} label="None" />
            <FormControlLabel value="Purebred" control={<Radio onChange={pbs}/>} label="Purebreed" />
            <FormControlLabel value="Crossbred" control={<Radio onChange={cbs}/>} label="Crossbreed" />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{textAlign: "left", marginLeft: "20px"}}>
        Filter by Price
        <Slider
          getAriaLabel={() => 'Price'}
          style={{width:"22%", display: "flex", flexDirection: "row"}}
          value={tracker}
          min={0}
          max={6000}
          step={500}
          marks
          onChange={updateRange}
          valueLabelDisplay="auto"
        />
      </div>
      <div class = "div-box" style={{display: "flex"}}>
        <div class="div-1" style={{marginLeft: "0px", display: "flex", flexDirection: "row", flexWrap: "wrap", width: "66%"}}>
          {data.map((item, index) => ( // TODO: map puppyData to puppyData components
            <div style={{border: '1px solid red', width: "20vw", height: "30vw"}}>
                {PuppyItem(item[0])}
                <br></br>
                <button onClick={() => {handleInc(item)}}>Add to Family</button>
            </div>
          ))}
        </div>
        <div>
        <div style={{border: '1px solid red', width: "20vw", height: "37vw"}}>
            <h3>Puppy Numbers</h3>
            {family_data.map((item) => 
            <div>
              {puppyData[item[1]].name +"s :" + item[0]} <button onClick={() => {handleDec(item)}}>-</button>
            </div>)}
            <p>Approximate Cost: ${approx_cost}</p>
            <p>Average Friendliness: {friendliness.toFixed(2)}</p>
            <p>Average Activity: {activity.toFixed(2)}min/day</p>
        </div>
          <div>
            <button onClick={() => {Clearer()}}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
