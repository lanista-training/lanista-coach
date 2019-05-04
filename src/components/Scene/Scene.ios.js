import React, { Component, PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Body,
  View,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Button,
} from 'native-base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modalbox';
import SvgUri from 'react-native-svg-uri';
import styled from "../../lib/styledComponents";
import {Icon} from "../../components";


const StyledFooter = styled.View`
  height: ${props => props.theme.footer.height};
`;

const StyledHeader = styled.View`
  height: ${props => props.theme.header.height};
`;

const { width, height } = Dimensions.get("window");
const StyledBackButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.primary}!important;
  color: white!important;
`;

export default class Scene extends PureComponent {

  constructor() {
    super();
  }

  feedDateCallback = (dataFromChild) => {
    this.setState({ listofDates: dataFromChild});
  }

  render() {

    const {commandsLeft, commandsRight, headerChildren, goToSetup} = this.props;


    return (
      <Container style={styles.maincontainer}>

      <StyledHeader style={styles.top}>
        <View style={styles.lanistalogo}>
          <SvgUri
            width="50"
            height="50"
            source={require('../../images/LanistaLogoGreen.svg')}/>
        </View>
        <View style={styles.topmenu}>
          {headerChildren}
        </View>
      </StyledHeader>
      <View style={styles.middle}>
        <View style={styles.middleleft}>
          <View style={styles.menuleft}>
          {
            commandsLeft.map((command, index) => (
            <Button key={index} transparent style={styles.iconbutton} onClick={command.onTap}>
              <Icon name={command.iosname} size={40}/>
            </Button>
            ))
          }
          </View>
        </View>
        <View style={styles.middlecenter}>
          <View style={styles.list}>
            {this.props.children}
          </View>
        </View>
        <View style={styles.middleright}>
          <View style={styles.menuright}>
          {
            commandsRight.map((command, index) => (
            <Button key={index+5} transparent style={styles.iconbutton} onClick={command.onTap}>
              <Icon name={command.iosname} size={40}/>
            </Button>
            ))
          }
          </View>
        </View>
      </View>
      <StyledFooter style={styles.bottom}>
        <ListItem avatar noBorder>
          <View style={styles.thumbnailup}>
          <Left>
            <TouchableHighlight onPress={() => goToSetup()}>
              <Thumbnail source={{uri: "https://randomuser.me/api/portraits/women/0.jpg"}}/>
            </TouchableHighlight>
          </Left>
          </View>
          <Body>
              <Text style={styles.itemText}>Marina </Text>
              <Text style={styles.itemText}>Mustermann</Text>
          </Body>
        </ListItem>
        <View style={styles.footertxtcontainer}>
          <Text style={styles.footertext}>Lanista Trainingssoftware 2012. All rights reserved.</Text>
        </View>
      </StyledFooter>
      </Container>
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
  thumbnailup: {
  },
  footertxtcontainer: {
    position:'absolute',
    right:5,
  },
  footertext: {
    color:"rgba(0,0,0,0.7)",
    fontSize: 14,
  },
  maincontainer: {
    flexDirection:"column",
  },
  top: {
    backgroundColor:"white",
    borderBottomWidth:2,
    justifyContent:'center',
    borderBottomColor:"rgba(0,0,0,0.1)",
  },
  middleleft: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#fafafa",
  },
  middlecenter: {
    flex:8,
    flexDirection:'row',
    backgroundColor:'#fafafa',
  },
  list: {
    flex:2,
    marginTop: 20,
  },
  tools: {
    flex:1,
    marginTop: 20,
  },
  middleright: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#fafafa",
  },
  middle: {
    flex:4,
    flexDirection:'row',
    justifyContent:"center",
    backgroundColor:"#fafafa",
    borderBottomWidth:2,
    borderBottomColor:"rgba(0,0,0,0.1)",
  },
  bottom: {
    backgroundColor:"white",
    justifyContent:'center',
  },
  lanistalogo: {
    position:'absolute',
    left:25,
    bottom:10,
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
  menuleft: {
    justifyContent:'center',
    alignItems:'center',
  },
  menuright: {
    justifyContent:'center',
    alignItems:'center',
  },
  topmenu: {
    position: 'absolute',
    alignSelf:"center",
    flexDirection:"row",
  },
  itemText: {
    color: 'black',
  },

});
