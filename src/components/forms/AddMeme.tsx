import { Backdrop, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import * as React from "react";
import TextFieldSearch from "./TextFieldSearch";

const types = ["Утка", "Утюг", "Карта", "Картошка", "Яблоня"];

class AddMeme extends React.PureComponent {
  public render() {
    const options: string[] = ["Africa", "America", "Asia", "Europe"];
    return (
      <form autoComplete="off">
        <FormControl margin="normal" fullWidth={true}>
          <FormLabel>
            <h1>Добавить meme</h1>
          </FormLabel>
        </FormControl>

        <TextFieldSearch
          id="testID"
          label="Тип"
          fullWidth={true}
          data={types.map((value, idx) => ({ id: idx, value }))}
        />

        <TextField id="standard-name" label="Изображение" margin="normal" fullWidth={true} />
      </form>
    );
  }
}

export default AddMeme;
