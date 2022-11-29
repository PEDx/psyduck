import { FC } from 'react';

export enum EPsyduckDataType {
  InputString,
  InputNumber,
  Switch,
  Color,
  Select,
  Media,
  Custom,
}

export interface PsyduckCustomData<T> extends PsyduckData<T> {
  type: EPsyduckDataType.Custom;
  view: FC;
}

export interface PsyduckData<T> {
  view?: FC;
  config?: () => Promise<unknown>;
  type: EPsyduckDataType;
  value: T;
}

type TTransPsyduckData<T> = {
  [P in keyof T]?: PsyduckData<T[P]>;
};

export interface PsyduckElement<T> {
  view: FC<T>;
  data: TTransPsyduckData<T>;
}
