import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../../utils/ThemeContext'
import { getStyles } from './Seperator.styles'
import { Props as SeperatorProps } from './Seperator.types'

const Seperator = (props: SeperatorProps) => {
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })

  return <View style={[styles.line, props.styles]} />
}

export default Seperator
