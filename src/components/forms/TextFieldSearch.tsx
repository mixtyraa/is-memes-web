import { FormControl, MenuItem, MenuList, Paper, TextField } from "@material-ui/core";
import * as React from "react";

interface IItem {
  id: number;
  value: string;
}

export interface ITextFieldSearchProps {
  id?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  onChange?: (event?: any) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
  searchfunc?: (event?: any) => void;
  data?: IItem[];
}

interface IState {
  search: IItem[];
  selectedItem: IItem;
  text: string;
}

class TextFieldSearch extends React.PureComponent<ITextFieldSearchProps> {
  public state: Readonly<IState> = {
    search: [],
    selectedItem: null,
    text: ""
  };

  constructor(props: ITextFieldSearchProps) {
    super(props);
  }

  public handleChangeTextInput = (event: any) => {
    const needle = event.target.value;
    this.setState({ text: needle });
    if (!needle) {
      this.setState({ search: [] });
      return;
    }

    const searched = this.props.data.filter(value => {
      return value.value
        .toLowerCase()
        .trim()
        .indexOf(needle.toLowerCase().trim()) === -1
        ? false
        : true;
    });
    this.setState({ search: searched });
  };

  public handleSelected = (event: any) => {
    const selected = this.state.search[event.target.dataset.id];
    console.log('test');
    this.setState({
      search: [],
      selectedItem: selected,
      text: selected.value
    });
  };

  public handleBlur = (event: any) => {
    console.log(event);
    setTimeout(() => {
      this.setState({
        search: []
      });
    }, 100);
  };

  public render() {
    return (
      <FormControl fullWidth={this.props.fullWidth} className="textFieldSearch"
        onBlur={this.handleBlur}
      >
        <TextField
          id={this.props.id}
          disabled={this.props.disabled}
          error={this.props.error}
          fullWidth={this.props.fullWidth}
          helperText={this.props.helperText}
          label={this.props.label}
          placeholder={this.props.placeholder}
          required={this.props.required}
          onChange={this.handleChangeTextInput}
          value={this.state.text}
          onFocus={this.handleChangeTextInput}
          className="textFieldSearch___input"
        />
        <FormControl fullWidth={this.props.fullWidth} className="textFieldSearch__list">
          <Paper>
            <MenuList hidden={this.state.search.length === 0}>
              {this.state.search.map(val => (
                <MenuItem data-id={val.id} key={val.id} onClick={this.handleSelected}>
                  {val.value}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </FormControl>
      </FormControl>
    );
  }
}

export default TextFieldSearch;
