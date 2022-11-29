import { FC } from 'react';
import { PsyduckElement, EPsyduckDataType } from '.';

interface IImageElementProps {
  text: string;
}
export const ImageElement: FC<IImageElementProps> = ({ text }) => {
  return <div>{text}</div>;
};

export const e: PsyduckElement<IImageElementProps> = {
  view: ImageElement,
  data: {
    text: {
      value: '',
      type: EPsyduckDataType.InputString,
    },
  },
};
