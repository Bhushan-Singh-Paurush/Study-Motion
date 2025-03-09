import React from 'react'

export const TimeDuration = ({time}) => {
    time=parseInt(time)
    return (
    <div>{time<60 ? time + " min" : time/60 + "Hr " + time%60 + "min"}</div>
  )
}
