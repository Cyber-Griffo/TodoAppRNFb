import React from 'react'
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native'
import { getStyles } from './Modal.styles'
import { Props as ModalProps } from './Modal.types'

const Modal = (props: ModalProps) => {
  const { children, onBackdropPress } = props
  const styles = getStyles()

  return (
    <>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View style={[styles.wrapper, props.wrapperStyles]} />
      </TouchableWithoutFeedback>
      <SafeAreaView
        style={[styles.container, props.containerStyles]}
        pointerEvents={'box-none'}
      >
        {children}
      </SafeAreaView>
    </>
  )
}

export default Modal
