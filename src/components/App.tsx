import { Grid, Paper } from "@material-ui/core";
import * as React from "react";
import AddMeme from "./forms/AddMeme";

class App extends React.Component {
  public render() {
    return (
      <Grid container={true} spacing={16} justify="center">
        <Grid item={true} xs={6}>
          <Paper className="form__contrainer">
            <AddMeme />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
