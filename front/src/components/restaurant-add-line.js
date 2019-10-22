import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import RestaurantProvider from "../providers/restaurant-provider";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class RestaurantAddLine extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      cuisine: '',
      name: '',
    };

    this.restaurantProvider = new RestaurantProvider();
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  };

  handleAdd() {
    const { name, cuisine } = this.state;
    const { onAdd } = this.props;

    const trimmedName = name.trim();
    const trimmedCuisine = cuisine.trim();

    if (trimmedCuisine === '' || trimmedName === '') {
      console.log('error');
    }

    this.restaurantProvider.createRestaurant(trimmedName, trimmedCuisine).then(() => {
      onAdd();
      this.handleCancel();
    });
  }

  handleCancel() {
    const { onCancel } = this.props;
    onCancel();
  }

  render() {
    const { classes } = this.props;
    const { name, cuisine } = this.state;

    const buttons = [
      <IconButton key={Math.random() * 10000} className={classes.button} aria-label="delete" onClick={() => { this.handleAdd(); }}>
        <CheckIcon />
      </IconButton>,
      <IconButton key={Math.random() * 10000} className={classes.button} aria-label="delete" onClick={() => { this.handleCancel(); }}>
        <CloseIcon />
      </IconButton>
    ];

    return(
      <TableRow hover role="checkbox" tabIndex={-1} key={'add-row'}>
        <TableCell key={`add-name`} align={"left"}>
          <TextField
            key={`add-name-input`}
            id="standard-name"
            label="Name"
            value={name}
            onChange={(e) => { this.handleChange('name', e.target.value)}}
            margin="normal"
          />
        </TableCell>
        <TableCell align={"left"} key={`add-cuisine`}>
          <TextField
            key={`add-cuisine-input`}
            id="standard-cuisine"
            label="cuisine"
            value={cuisine}
            onChange={(e) => { this.handleChange('cuisine', e.target.value)}}
            margin="normal"
          />
        </TableCell>
        <TableCell key={Math.random() * 1000000} align={"left"}>
          { buttons }
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(RestaurantAddLine);