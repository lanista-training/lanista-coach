import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Button,
} from 'native-base';
import {createIconSetFromIcoMoon} from "react-native-vector-icons";
import FeedTypes from "../FeedTypes";

import {Icon} from "../../../components";


export default ({onFilterByTime, onFilterByType, filter}) => (
  <View style={styles.topmenu}>
    <Button transparent style={styles.iconbutton} onPress={onFilterByTime}>
      <Icon name="time-inactive" size={40}/>
    </Button>
    <Button transparent style={styles.iconbutton} className={filter == FeedTypes.birthday ? "active" : ""} onPress={() => onFilterByType(FeedTypes.birthday)}>
      <Icon name="birthday-inactive" size={40}/>
    </Button>
    <Button transparent style={styles.iconbutton} className={filter == FeedTypes.message ? "active" : ""} onPress={() => onFilterByType(FeedTypes.message)}>
      <Icon name="email-inactive" size={40}/>
    </Button>
    <Button transparent style={styles.iconbutton} className={filter == FeedTypes.appointment? "active" : ""} onPress={() => onFilterByType(FeedTypes.appointment)}>
      <Icon name="calender-inactive" size={40}/>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf:'center',
    width:100,
    position:"absolute",
    bottom:20,
    marginBottom: 10
  },
  lanistalogo: {
    width:50,
    height:50,
    left:50,
    top:50,
  },
  iconbutton: {
    width: 75,
    height:75,
    marginLeft: 40,
  },
  icon: {
    fontSize:50,
    color:"black",
  },
  topmenu: {
    bottom: 5,
    alignSelf:"center",
    flexDirection:"row",
  },
});
