import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faListUl, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const SmallIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
`

interface EyeIconProps {
  isActive: boolean
  style?: React.CSSProperties
}

export function EyeIcon({ isActive, style }: EyeIconProps) {
  return (
    isActive ? <SmallIcon icon={faEye} style={style} /> : <SmallIcon icon={faEyeSlash} style={style} />
  )
}

interface ArrowIconProps {
  up: boolean
  style?: React.CSSProperties
}

export function ArrowIcon({ up, style }: ArrowIconProps) {
  return (
    up ? <SmallIcon icon={faArrowUp} style={style} /> : <SmallIcon icon={faArrowDown} style={style} />
  )
}

export function ListIcon() {
  return <FontAwesomeIcon icon={faListUl} />
}

const CheckmarkIconStyle = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
  opacity: 0;
  color: ${props => props.theme.colors.white};
  font-size: 9px;
  transition: all 0.1s;

  &.checked {
    visibility: visible;
    opacity: 1;
  }
`

interface CheckmarkIconProps {
  className: string
}

export function CheckmarkIcon({className}: CheckmarkIconProps) {
  return <CheckmarkIconStyle icon={faCheck} className={className} />
}