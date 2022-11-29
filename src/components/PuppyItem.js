import { alignProperty } from "@mui/material/styles/cssUtils";
import { textAlign } from "@mui/system";

// TODO: create a component that displays a single bakery item
export default function PuppyItem(item, img) {
	return (
		<div style={{width: "20vw", height: "26vw"}}>
            <br></br>
            <img src={item.image} style={{width:"80%"}}/>
            <h2 style={{fontSize: "100%"}}>{item.name}</h2>
            <p style={{fontSize: "80%"}}>Price: ${item.price_min} to ${item.price_max} <br></br>
            Time per dog: {item.activity_level}min/day <br></br>
            Type of Breed: {item.type} <br></br>
            Friendliness Level: {item.friendliness}
            </p>
        </div>
	);
}
