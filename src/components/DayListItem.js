import React from "react";
import "./DayListItem.scss";
import classnames from "classnames";
export default function DayListItem(props) {

  const dayClass = classnames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots 
  });
  const formatSpots = (prop) => {
    if(prop >1) {
      return`${prop} spots remaining`;
    }
    if (prop === 1) {
      return `${prop} spot remaining`
    } else {
      return "no spots remaining";
    } 
  }
  return (
    <li className ={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );

} 