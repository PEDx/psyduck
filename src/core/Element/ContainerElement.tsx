import { FC, PropsWithChildren } from 'react'
import { PsyduckElement, EPsyduckDataType } from '.'

export interface IContainerProps {
  text?: string
}
export const Container: FC<PropsWithChildren<IContainerProps>> = ({
  children,
}) => {
  return (
    <div style={{ height: '100px', backgroundColor: '#eee' }}>{children}</div>
  )
}

export const ContainerElement: PsyduckElement<IContainerProps> = {
  view: Container,
  data: {
    text: {
      value: 'text',
      type: EPsyduckDataType.InputString,
    },
  },
}
