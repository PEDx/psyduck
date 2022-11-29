import { FC } from 'react'
import { PsyduckElement, EPsyduckDataType } from '.'

export interface IImageElementProps {
  text?: string
}
export const Image: FC<IImageElementProps> = ({ text }) => {
  return <div style={{ color: '#333' }}>fast: {text}</div>
}

export const ImageElement: PsyduckElement<IImageElementProps> = {
  view: Image,
  data: {
    text: {
      value: 'text',
      type: EPsyduckDataType.InputString,
    },
  },
}
