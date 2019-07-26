import React, { Component } from 'react';
import Scene from './Scene';
import Router from 'next/router';
import { Query } from "react-apollo";
import { ME } from "../../queries";

class SceneWithData extends Component {

  constructor(props) {
    super(props);
    this.goToSetup = this.goToSetup.bind(this);
    this.state = {
      alarms: [
        {
          type: 'DP',
          userId: 0,
          fullName: 'Rafael Diaz',
          imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg'
        },
        {
          type: 'TP',
          userId: 1,
          fullName: 'Juan Guaido',
          imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg'
        },{
          type: 'AP',
          userId: 2,
          fullName: 'Edgar Ramirez',
          imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
        },{
          type: 'DP',
          userId: 3,
          fullName: 'Luis Meguias',
          imageUrl: 'https://randomuser.me/api/portraits/men/21.jpg'
        },{
          type: 'TP',
          userId: 4,
          fullName: 'Shirley Vergany',
          imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg'
        },{
          type: 'AP',
          userId: 5,
          fullName: 'Patricia Poleo',
          imageUrl: 'https://randomuser.me/api/portraits/men/24.jpg'
        },{
          type: 'DP',
          userId: 6,
          fullName: 'Dolar Today',
          imageUrl: 'https://randomuser.me/api/portraits/men/29.jpg'
        },
      ]
    };
  }

  goToSetup() {
    Router.push('/configuration')
  }

  render() {
    const {alarms} = this.state;
    return(
      <Query query={ME} notifyOnNetworkStatusChange fetchPolicy="cache-and-network">
        {({ data, loading, error, fetchMore }) => {
          return(<Scene
            goToSetup={this.goToSetup}
            alarms={alarms}
            {...this.props}
            me={data && data.me}
          />)
        }}
      </Query>
    )
  }
}

export default SceneWithData;
