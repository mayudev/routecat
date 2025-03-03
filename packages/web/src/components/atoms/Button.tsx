import { PropsWithChildren } from 'react';

type Props = object;

export const Button = ({ children }: PropsWithChildren<Props>) => {
  return <button>{children}</button>;
};
