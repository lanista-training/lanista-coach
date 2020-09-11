import * as React from "react";
import {Widget} from './styles';

export default ({children, className, id}) => (
  <Widget id={id} className={className}>
    {children}
  </Widget>
);
