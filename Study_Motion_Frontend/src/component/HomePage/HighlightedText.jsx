import React from 'react'

export const HighlightedText = ({children}) => {
  return (
    <span className=' font-inter text-transparent bg-gradient-to-tl from-blue-25 via-blue-200 to-blue-400 bg-clip-text'>{" "}{children}</span>
  )
}
