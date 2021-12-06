import React from "react";

import cardbackside from "./card-backside.jpg";

function Card(props) {
  return (
   

    <img width="200px" length= "150"
      src={props.targeted ? props.image : cardbackside}
      
      alt=""
      onClick={props.onClick}
    />
   
  );
}

export default Card;
