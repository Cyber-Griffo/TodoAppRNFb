import React from 'react'
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native'
import { getStyles } from './Modal.styles'
import { Props as ModalProps } from './Modal.types'

const Modal = (props: ModalProps) => {
  const { children, onBackdropPress, containerStyles } = props
  const styles = getStyles({ containerStyles })

  return (
    <>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View style={styles.wrapper} />
      </TouchableWithoutFeedback>
      <SafeAreaView
        style={styles.container}
        pointerEvents={'box-none'}
      >
        {children}
      </SafeAreaView>
    </>
  )
}

export default Modal
