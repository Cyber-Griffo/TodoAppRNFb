import { ModalStyleContext, ModalStyles } from './Modal.types'

export const getStyles = (ctx: ModalStyleContext): ModalStyles => {
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
      ctx.containerStyles !== undefined && ctx.containerStyles,
    ],
  }
}
