import { PropTypes, TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import * as React from "react";

class MultipleSelector extends React.Component<TextFieldProps> {
  public constructor(props: TextFieldProps) {
    super(props);
  }

  public render() {
    return <TextField {...this.props} />;
  }
}

export default MultipleSelector;
