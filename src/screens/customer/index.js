import React, { Component } from 'react';
import { withRouter } from "react-router";
import _ from 'lodash';
import moment from "moment";

import { translate } from 'react-i18next';
import Scene from "../../components/Scene";
import Customer from './Customer';
import CustomerHeader from "../../components/CustomerHeader";

import protocollsFile from './test_data';
import exerciesesFile from '../exercises/test_data';

@translate(['common', 'setup'], { wait: true })
class CustomerWithData extends Component {

  constructor(props) {
    super(props);
    const customer = props.location.state ? props.location.state.customer : {};
    const exercises = [];

    exerciesesFile.map((exercise) => {
      exercises[exercise.id] = exercise;
    });
    for( i = 0; i < protocollsFile.length; i++) {
      protocollsFile[i].image_1 = protocollsFile[i].user_exercise_id > 0 ? "http://lanista-training.com/tpmanager/img/s/" +  exercises[protocollsFile[i].user_exercise_id] + '_1.jpg' : protocollsFile[i].exercise_id > 0 ? "http://lanista-training.com/app/resources/images/previews/" +  exercises[parseInt(protocollsFile[i].exercise_id)].ext_id + "_1.jpg" : null;
      protocollsFile[i].image_2 = protocollsFile[i].user_exercise_id > 0 ? "http://lanista-training.com/tpmanager/img/s/" +  exercises[protocollsFile[i].user_exercise_id] + '_2.jpg' : protocollsFile[i].exercise_id > 0 ? "http://lanista-training.com/app/resources/images/previews/" + exercises[parseInt(protocollsFile[i].exercise_id)].ext_id + "_2.jpg" : null;
    }
    const tmp = _.reduce(_.groupBy(protocollsFile, o => o.execution_date.substring(0,10)+ "_" + (o.exercise_id > 0 ? ('0_' + o.exercise_id) :('1_' + o.user_exercise_id) )), (acc, next, index) => {
      acc.push({
        title: index,
        exercise_id: index.split('_')[2],
        exercise_type: index.split('_')[1],
        data: next
      });
      return acc;
    }, []);
    const tmp_1 = _.groupBy(tmp, o => o.title.substring(0,10));
    const dataSource = [];
    for (var property in tmp_1) {
      if (tmp_1.hasOwnProperty(property)) {
        dataSource.push({
          day: moment( property.substring(0, 10), "YYYY-MM-DD" ),
          data: tmp_1[property],
        })
      }
    }

    this.state = {
      processing: false,
      customer: customer,
      protocolls: dataSource,
    };
    this.goBack = this.goBack.bind(this);
  };

  goBack() {
    this.props.history.goBack();
  }

  getCommandsRight() {
    return ([]);
  }

  getCommandsLeft() {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            this.goBack();
          }
      }, {
          //icon: CustomerIcon,
          icon: 'icon-tools-inactive',
          text: 'Setting',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'settings',
          onTap: () => {
            console.log("Command Settings");
          }
      }, {
          //icon: HelpIcon,
          icon: 'icon-help-inactive',
          text: 'Help',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'help-circle',
          onTap: () => {
            console.log("Command Help");
          }
      }]);
  }

  render() {
    const {t, i18n} = this.props;
    const {processing, customer, protocolls} = this.state;

    return(
      <Scene
        commandsLeft={this.getCommandsLeft()}
        commandsRight={this.getCommandsRight()}
        processing={processing}
        headerChildren={
          <CustomerHeader
            userId={customer.id}
            firstName={customer.first_name}
            lastName={customer.last_name}
          />
        }
      >
        <Customer
          customer={customer}
          protocolls={protocolls}
          t={t}
        />
      </Scene>
    )
  }
}

export default withRouter(CustomerWithData);
