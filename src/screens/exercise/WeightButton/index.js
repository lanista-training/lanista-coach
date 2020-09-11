import React, { Component, useState } from 'react'
import {useSpring, animated} from 'react-spring'
import {StyledButton} from './styles'

export default ({onValueChange, setOrder}) => {
  const onIncreaseValue = () => {
    onValueChange('up', setOrder)
  }
  const onReduceValue = () => {
    onValueChange('down', setOrder)
  }
  return (
    <StyledButton>
      <div className="increase number" onClick={onIncreaseValue}/>
      <div className="reduce number" onClick={onReduceValue}/>
    </StyledButton>
  )
}
