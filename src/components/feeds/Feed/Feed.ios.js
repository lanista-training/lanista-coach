import React, { Component, PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Container,
  Text,
  Body,
  View,
  List,
  ListItem,
  Thumbnail,
  Button,
  Left,
  Right,
} from 'native-base';
import moment from 'moment';
import FeedTypes from "../FeedTypes";
import {Icon} from "../../../components";



const { width, height } = Dimensions.get("window");


const CommandsBlock = ({feedType}) => {
  return (
    <View style={styles.commandblockcontainer}>
      { feedType == FeedTypes.birthday && <Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("Here we go"+moment(Date(feed.customer.target_date)).format('YYYY-MM-DD'));} }><Icon name='time-inactive' /><Text style={styles.cbtxt}>grattulieren</Text></Button> }
      { feedType == FeedTypes.appointment_request && (<><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("Hello");} }><Icon name='calender-inactive' /><Text style={styles.cbtxt}>termin verwalten</Text></Button><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='email-inactive' /><Text style={styles.cbtxt}>kontaktieren</Text></Button></>) }
      { feedType == FeedTypes.appointment && (<><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='calender-inactive' /><Text style={styles.cbtxt}>termin verwalten</Text></Button><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='email-inactive' /><Text style={styles.cbtxt}>kontaktieren</Text></Button></>) }
      { feedType == FeedTypes.workout_expired && (<><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='calender-inactive' /><Text style={styles.cbtxt}>termin vereinbahre</Text></Button><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='iconfinder_Reload_2134660' /><Text style={styles.cbtxt}>Trainingsplan verlängern</Text></Button></>) }
      { feedType == FeedTypes.workout_about_to_expire && (<><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='calender-inactive' /><Text style={styles.cbtxt}>termin vereinbahre</Text></Button><Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("HALLO");} }><Icon name='email-inactive' /><Text style={styles.cbtxt}>kontaktieren</Text></Button></>) }
      { feedType == FeedTypes.customer_activity && (<Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("grattulieren");} }><Icon name='email-inactive' /><Text style={styles.cbtxt}>kontaktieren</Text></Button>) }
      { feedType == FeedTypes.message && (<Button transparent iconLeft style={styles.buttonStyle} onClick={() => {console.log("antworten");} }><Icon name='email-inactive' /><Text style={styles.cbtxt}>antworten</Text></Button>) }
    </View>
  )
};

export default class Feed extends PureComponent {

  constructor() {
    super();
  }

  render() {
    const {t, feed} = this.props;

    return (
      <View>
        <ListItem avatar noBorder>
          <Left>
            <Thumbnail source={{uri: feed.customer.photoUrl}}/>
          </Left>
          <Body>
            <View style={styles.containerrow}>
              <Text style={styles.itemText}>{feed.customer.first_name} </Text>
              <Text style={styles.itemText}>{feed.customer.last_name}</Text>
            </View>
            <Text note numberOfLines={1}>hat etwas gesendet</Text>
          </Body>
        </ListItem>
        <View style={styles.lineseperator}/>
        <CommandsBlock feedType={feed.type}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf:'center',
    height: 30,
  },
  buttontext: {
    color: 'black',
  },
  buttonicon: {
    color: 'black',
  },
  containerrow: {
    flexDirection: 'row',

  },
  lineseperator: {
    borderBottomColor: 'rgba(0,0,0,0.0975)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin:5,
    marginTop: 15,
  },
  itemText: {
    color: 'black',
  },
  commandblockcontainer: {
    flexDirection:"row",
    justifyContent:"center",
  },
  cbtxt: {
    color: 'black',
  },
});
