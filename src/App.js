import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import puppyData from "./assets/puppy-data.json";
import { Checkbox, FormGroup, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Slider} from '@mui/material';
import PuppyItem from "./components/PuppyItem";

puppyData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [tracker, setVal] = useState([0, 6000]);
  const [breedSort, bSVal] = useState(0);
  const [otherFilt, otherFiltSet] = useState(0);
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

  var data = puppyData;
  data = data.filter((item) => {
    return item.price_min <= tracker[1] && item.price_max >= tracker[0];
  });
  data = data.filter((item) => {
      if(breedSort == 0){
        return true;
      }else if(breedSort == 1){
        return item.type == "Pure Breed";
      } else {
        return item.type == "Cross Breed";
      }});
  if(otherFilt != 0){
    data = data.sort((a, b) => {
        if(otherFilt == 1){
          return b.friendliness - a.friendliness;
        }else if(otherFilt == 2){
          return b.activity_level - a.activity_level;
        } else {
          return b.price_max - a.price_max;
        }})
  };

  return (
    <div className="App" style={{marginLeft:"0px"}}>
      <h1>Puppy Household Planner</h1>
      <br></br>
      <div className = "sortBox">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="puppy_sorting"
            defaultValue="None"
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
          style={{width:"22%", display: "flex", flexDirection: "row", color: "red"}}
          value={tracker}
          min={0}
          max={6000}
          step={500}
          marks
          onChange={updateRange}
          valueLabelDisplay="auto"
        />
      </div>
      <div class="div-1" style={{marginLeft: "0px", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {data.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
          <div>
              {PuppyItem(item, index, item.image)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
