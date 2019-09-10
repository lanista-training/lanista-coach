import React, { Component } from 'react'

/* First we will make a new context */
const DataContext = React.createContext()

/* Then create a provider Component */
class DataProvider extends Component {
  state = {
    filter: {
      body: [],
      type: [],
      tool: [],
      plugin: [],
      text: '',
    },
    setFilter: (newFilter) => {
      this.setState((state, props) => ({
        filter: newFilter
      }))
    }
  }

  render () {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

/* then make a consumer which will surface it */
const DataConsumer = DataContext.Consumer

export default DataProvider
export { DataConsumer }
