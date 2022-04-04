import React from 'react'
import DayListItem from 'components/DayListItem.js'

export default function DayList(props) {
  const days = props.days.map(day => {
    return(<ul>
      <DayListItem 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}/>
      </ul>)
      })
      return days
    }