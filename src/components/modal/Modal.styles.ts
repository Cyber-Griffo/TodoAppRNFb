import { ModalStyles } from './Modal.types'

export const getStyles = (): ModalStyles => {
  return {
    container: [
      {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
    wrapper: [
      {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.7)',
        position: 'absolute',
        top: 0,
      },
    ],
  }
}
