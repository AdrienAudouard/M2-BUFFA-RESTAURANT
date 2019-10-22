import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RestaurantProvider from "../providers/restaurant-provider";
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class RestaurantLine extends React.Component {

  constructor(props) {
    super(props);

    const restaurant = props.restaurant;
    this.restaurantProvider = new RestaurantProvider();

    this.state = {
      isEditing: false,
      isDeleting: false,
      savedName: restaurant.name,
      savedCuisine: restaurant.cuisine,
      cuisine: restaurant.cuisine,
      name: restaurant.name,
    };
  }

  handleStartEditing() {
    this.setState({
      isEditing: true,
    });
  }

  handleStartDeleting() {
    this.setState({
      isDeleting: true,
    });
  }

  handleCancel() {
    const { savedName, savedCuisine } = this.state;

    this.setState({
      isDeleting: false,
      isEditing: false,
      name: savedName,
      cuisine: savedCuisine
    });
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  };

  handleDelete() {
    const { restaurant, onElementDeleted } = this.props;

    this.restaurantProvider.deleteRestaurant(restaurant.id).then(() => {
      onElementDeleted();
    });
  }

  handleEdit() {
    const { cuisine, name } = this.state;
    const { restaurant } = this.props;

    this.restaurantProvider.updateRestaurant(restaurant.id, name, cuisine).then(() => {
      this.setState({
        isDeleting: false,
        isEditing: false,
        savedName: name,
        savedCuisine: cuisine,
      });
    });
  }


  render() {
    const { isEditing, isDeleting, cuisine, name } = this.state;
    const { classes, restaurant } = this.props;

    let buttons = [
      <IconButton key={Math.random() * 10000} className={classes.button} aria-label="delete" onClick={() => { this.handleStartEditing(); }}>
        <EditIcon />
      </IconButton>,
      <IconButton key={Math.random() * 10000} className={classes.button} aria-label="delete" onClick={() => { this.handleStartDeleting(); }}>
        <DeleteIcon />
      </IconButton>
    ];

    if (isDeleting || isEditing) {
      buttons = [
        <IconButton key={Math.random() * 10000} className={classes.button} aria-label="delete" onClick={
          isEditing
            ? () => { this.handleEdit() }
            : () => { this.handleDelete() }
        }>
          <CheckIcon />
        </IconButton>,
        <IconButton key={Math.random() * 10000} className={classes.button} aria-label="delete" onClick={() => { this.handleCancel(); }}>
          <CloseIcon />
        </IconButton>
      ]
    }

    return(
      <TableRow hover role="checkbox" tabIndex={-1} key={restaurant.id}>
        <TableCell key={`tc-1-${restaurant.id}`} align={"left"}>
          { isEditing
            ? <TextField
              key={`name-${restaurant.id}`}
              id="standard-name"
              label="Name"
              value={name}
              onChange={(e) => { this.handleChange('name', e.target.value)}}
              margin="normal"
            />
            : name }
        </TableCell>
        <TableCell align={"left"} key={`tc-2-${restaurant.id}`}>
          { isEditing
            ? <TextField
              key={`cuisine-${restaurant.id}`}
              id="standard-cuisine"
              label="cuisine"
              value={cuisine}
              onChange={(e) => { this.handleChange('cuisine', e.target.value)}}
              margin="normal"
            />
            : cuisine }
        </TableCell>
        <TableCell key={Math.random() * 1000000} align={"left"}>
          { buttons }
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(RestaurantLine);