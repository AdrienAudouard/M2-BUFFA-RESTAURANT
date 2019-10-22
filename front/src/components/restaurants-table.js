import React from 'react';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import RestaurantLine from "./restaurant-line";
import RestaurantProvider from "../providers/restaurant-provider";
import RestaurantAddLine from "./restaurant-add-line";

const styles = theme => ({
  root: {
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: 50,
  },
  tableWrapper: {
    maxHeight: 600,
    overflow: 'auto',
  },
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'cuisine', label: 'Cuisine', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

class RestaurantsTable extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageSize: 10,
      restaurants: [],
      showAddLine: false,
    };

    this.restaurantProvider = new RestaurantProvider();
    this.loadRestaurants();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.filter !== prevProps.filter) {
     this.loadRestaurants();
    }

    if (this.props.showAddLine !== this.state.showAddLine) {
      this.setState({
        showAddLine: this.props.showAddLine
      });
    }
  }

  loadRestaurants() {
    const { page, pageSize } = this.state;
    const { filter } = this.props;

    this.restaurantProvider.getRestaurants(page, pageSize, filter).then((restaurants) => {
      this.setState({
        restaurants
      });
    });
  }

  onPageChange(event, newPage) {
    this.updateState('page', newPage);
  }

  onPageSizeChange(event, newSize) {
    this.updateState('pageSize', parseInt(newSize.key));
  }

  updateState(attr, value) {
    this.setState({
      [attr]: value
    }, () => { this.loadRestaurants(); })
  }

  hideAddLine() {
    const { onHideAddLine } = this.props;
    onHideAddLine();
  }

  render() {
    const { classes, count } = this.props;
    const { page, pageSize, restaurants, showAddLine } = this.state;
    console.log(showAddLine);
    return(
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { showAddLine ? <RestaurantAddLine onCancel={() => {this.hideAddLine()}} onAdd={() => {this.hideAddLine();}}/> :  null}
              { restaurants.map( row => <RestaurantLine onElementDeleted={() => { this.loadRestaurants(); }} key={`line-${row.id}`} restaurant={row} />) }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={pageSize}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={(e, v) => { this.onPageChange(e, v) }}
          onChangeRowsPerPage={(e, v) => { this.onPageSizeChange(e, v); }}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(RestaurantsTable)