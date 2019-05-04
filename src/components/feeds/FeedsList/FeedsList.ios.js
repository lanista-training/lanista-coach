import React, { Component, PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  View,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Button,
} from 'native-base';
import Feed from "../Feed";

const data = [
  { key: 'A'}, { key: 'B'}, { key: 'C'}, { key: 'D'}, { key: 'E'},
];
const { width, height } = Dimensions.get("window");
const numColumns = 1;

export default class FeedList extends PureComponent {

  constructor() {
    super();
  }

  renderItem = ({ item, index }) => {
    return(
      <View style={styles.item}>
        <Feed key={index} feed={item}/>
      </View>
    );
  };

  renderSectionHeader = ({ section, index }) => {
    return(
      <View style={styles.sectionheader}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  render() {
    const {feeds} = this.props;
    return (
        <SectionList
          sections={[
            { title: 'Datum', data: feeds},
          ]}
          style={styles.container}
          initialNumToRender={10}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
        />
    )
  }
}


const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf:'center',
    width:100,
    position:"absolute",
    bottom:20,
    marginBottom: 10
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    margin: 10,
    height: 125,
    elevation: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.8,
    shadowRadius: 2,


  },
  itemText: {
    height: 30,
    color: 'black',
  },
  sectionheader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 50,
  },

});
