import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../../../utils/ThemeContext'
import { getStyles } from './CustomDrawerSectionHeader.styles'
import { Props as SectionHeaderProps } from './CustomDrawerSectionHeader.types'

const SectionHeader = (props: SectionHeaderProps) => {
  const { text, textColor, lineColor, textBackground, style } = props
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({
    theme,
    textColor,
    lineColor,
    textBackground,
  })
  return (
    <View style={style?.wrapper}>
      <View style={styles.breaker} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, style?.text]}>{text}</Text>
      </View>
    </View>
  )
}

export default SectionHeader
