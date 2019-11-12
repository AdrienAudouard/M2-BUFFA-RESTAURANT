import React from 'react';
import './App.css';
import TopBar from "./components/top-bar";
import RestaurantsTable from "./components/restaurants-table";
import RestaurantProvider from "./providers/restaurant-provider";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      filter: '',
      addAsked: false,
    };

    this.restaurantProvider = new RestaurantProvider();
    this.loadCount();
  }

  loadCount() {
    const { filter } = this.state;

    this.restaurantProvider.getCount(filter).then((count) => {
      this.setState({
        count
      });
    });
  }

  handleFilterChange(filter) {
    this.setState({
      filter
    }, () => { this.loadCount(); });
  }

  handleAddAsked() {
    this.setState({
      addAsked: true
    })
  }

  handleHideAddLine() {
    this.setState({
      addAsked: false
    })
  }

  render() {
    const { count, filter, addAsked } = this.state;

    return (
      <div className="App">
        <TopBar count={count} onFilterChange={(f) => this.handleFilterChange(f)} onAddAsked={() => this.handleAddAsked()}/>
        <RestaurantsTable count={count} filter={filter} showAddLine={addAsked} onHideAddLine={() => this.handleHideAddLine()}/>
      </div>
    );
  }
}

export default App;
