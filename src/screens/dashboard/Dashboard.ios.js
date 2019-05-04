import React, { Component, PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  ListItem,
  Text,
  StatusBar,
} from 'react-native';
import {
  Container,
  View,
  Icon,
  Thumbnail,
  Left,
  Right,
  Button,
} from 'native-base';
import styled from "../../lib/styledComponents";
import Feeds from "../../components/feeds";


const { width, height } = Dimensions.get("window");
const StyledBackButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.primary}!important;
  color: white!important;
`;
const StyledFooter = styled.View`
  background-color: ${props => props.theme.colors.secondary}!important;
`;

export default class Dashboard extends PureComponent {

  constructor() {
    super();
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const {
      goBack,
      t,
      feeds,
      jumpToDay,
      currentScrollPosition,
    } = this.props;

    return (
      <Container style={styles.maincontainer}>
        <View style={styles.middlecenter}>
        <Feeds
          feeds={feeds}
          t={t}
          currentScrollPosition={currentScrollPosition}
          jumpToDay={jumpToDay}
        />
      </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf:'center',
    width:width*0.4,
    position:"absolute",
    bottom:20,
    marginBottom: 10
  },
  maincontainer: {
    flexDirection:"row",
  },
  middlecenter: {
    backgroundColor:"#fafafa",
    flex:8,
  },
});
