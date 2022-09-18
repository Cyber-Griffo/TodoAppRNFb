import React from 'react'
import { Text, View } from 'react-native'
import { getStyles } from './CustomDrawerSectionHeader.styles'
import { Props as SectionHeaderProps } from './CustomDrawerSectionHeader.types'

const SectionHeader = (props: SectionHeaderProps) => {
  const { text, textColor, lineColor, textBackground } = props
  const styles = getStyles({
    textColor,
    lineColor,
    textBackground,
  })
  return (
    <>
      <View style={styles.breaker} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </>
  )
}

export default SectionHeader
