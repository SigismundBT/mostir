declare module '@theme/Heading' {
  import React from 'react';
  export interface Props {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    id?: string;
    className?: string;
    children?: React.ReactNode; // 👈 補上這個
  }
  export default function Heading(props: Props): JSX.Element;
}
