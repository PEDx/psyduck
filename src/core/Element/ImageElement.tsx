import { FC } from 'react'
import { PsyduckElement, EPsyduckDataType } from '.'

export interface IImageProps {
  text?: string
  modal?: 'fill' | 'contain' | 'cover'
  bgColor?: string
  url?: string
}
export const Image: FC<IImageProps> = ({ text, modal }) => {
  return (
    <div style={{ color: '#333' }}>
      fast: {text} {modal}
    </div>
  )
}

export const ImageElement: PsyduckElement<IImageProps> = {
  view: Image,
  data: {
    text: {
      value: 'text',
      type: EPsyduckDataType.InputString,
    },
    modal: {
      value: 'fill',
      type: EPsyduckDataType.Select,
    },
    url: {
      value: '',
      type: EPsyduckDataType.Media,
    },
    bgColor: {
      value: '',
      type: EPsyduckDataType.Color,
    },
  },
}
