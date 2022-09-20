import { ColorValue } from 'react-native'
import { SvgProps } from 'react-native-svg'

export type Props = {
  svgProps: SvgProps
  color: {
    primary?: ColorValue
    accent?: ColorValue
    grey?: ColorValue
    dark?: ColorValue
    white?: ColorValue
  }
}
