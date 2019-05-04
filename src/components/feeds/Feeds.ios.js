import React, { Component, PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
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
import FeedsList from "./FeedsList";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modalbox';
import moment from 'moment';


const { width, height } = Dimensions.get("window");



export default class Feeds extends PureComponent {

  constructor() {
    super();
    this.state = {
      listofDates: ['2019-03-13','2019-03-21','2019-03-19'],
      selectedDay: new Date(),
      listfilled: false,
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  componentDidMount() {
    var {jumpToDay} = this.props;
    setTimeout(function () {
        jumpToDay(new Date());
    }, 100);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentScrollPosition} = this.props;
    if (currentScrollPosition != prevProps.currentScrollPosition) {
      this.refs._scrollView.scrollTo({y:currentScrollPosition*125});
    }
  }

  handleDayClick(day) {
    this.setState({
      selectedDay: day,
    });
    var {jumpToDay} = this.props;
    var dayX = new Date(day.dateString);
    console.log("converted day",dayX);
    jumpToDay(dayX);
  }

  pushdata(){
    const {feeds, t, jumpToDay} = this.props;
    var varmarked= [];
    const dataSource= [];

  }


  render() {
    const {feeds, t, jumpToDay} = this.props;
    const dataSource = [];
    let dates = {};
    var varmarked = [];
    this.state.listofDates.forEach((val) => {
      dates[val] = {marked:true};
    });

    if(!this.state.listfilled){
      feeds.map( (feedList, index) =>
      {
        feedList.data.map( (feed, index) =>
         {
           dataSource.push(feed);
           varmarked.push(moment(feed.customer.target_date).format('YYYY-MM-DD'));
         });
      });

      this.setState({
        listofDates: varmarked,
        listfilled: true,
      });
    }

    return (
      <Container style={styles.middlecenter}>
        <Modal
        style={styles.modalcalendarlist}
        ref={"modalcalendarlist"}
        backdropPressToClose={true}
        swipeToClose={true}
        position={"center"}
        backdrop={true}
        swipeArea={200}
        >
           <CalendarList
            calendarWidth={width*0.75}
            markedDates={dates}
            onDayPress={(day) =>  {this.handleDayClick(day);
                                  this.refs.modalcalendarlist.close()}}
            style={styles.calendarlist}
            />
        </Modal>

        <ScrollView
        ref='_scrollView'>
        {
          feeds.map((feedList, index) => {
           return (
              <View style={styles.carditem}>
                <FeedsList key={index} feeds={feedList.data}/>
              </View>
           )
        })}
        </ScrollView>
        <View style={styles.tools}>
          <View style={styles.toolscalendar}>
            <View style={styles.calendarheader}>
              <Text style={styles.calendarheadertxt}>Übersicht</Text>
              <View style={styles.expandcalendar}>
                <Button transparent
                  onPress={()=> this.refs.modalcalendarlist.open()}>
                  <Icon name="expand" size={30}/>
                </Button>
              </View>
            </View>
            <Calendar style={styles.calendar}
              current={Date()}
              markedDates={dates}
              onDayPress={(day) => this.handleDayClick(day)}
              monthFormat={'MMMM yyyy'}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
            />
          </View>
          <View style={styles.toolslower}>
            <View style={styles.toolslowerheader}>
              <Text style={styles.calendarheadertxt}>Übersicht</Text>
            </View>
            <View style={styles.menutools}>
              <List>
                <ListItem style={styles.menuitem}>
                  <Button iconLeft transparent dark style={styles.menuButton}>
                    <Icon name={"contact"} size={10}/>
                    <Text>Trainingspläne abgelaufen</Text>
                  </Button>
                </ListItem>
                <ListItem style={styles.menuitem}>
                  <Button iconLeft transparent dark style={styles.menuButton}>
                    <Icon name={"camera"} size={10}/>
                    <Text>Trainingspläne bald abgelaufen</Text>
                  </Button>
                </ListItem>
                <ListItem style={styles.menuitem}>
                  <Button iconLeft transparent dark style={styles.menuButton}>
                    <Icon name={"ribbon"} size={10}/>
                    <Text>Trainingspläne angefordert</Text>
                  </Button>
                </ListItem>
                <ListItem style={styles.menuitem}>
                  <Button iconLeft transparent dark style={styles.menuButton}>
                    <Icon name={"contacts"} size={10}/>
                    <Text>Trainingspläne heute</Text>
                  </Button>
                </ListItem>
              </List>
            </View>
          </View>
        </View>
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
  carditem: {
    alignSelf:'center',
    width:width/2,
  },
  toolscalendar: {
    flex:2,
    marginRight: 5,
    backgroundColor:'#fafafa'
  },
  calendarheader: {
    height: 40,
    borderBottomWidth: 0,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.0975)',
    backgroundColor:'white',
    justifyContent:'center',
  },
  calendar: {
    height: 350,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.0975)',
  },
  toolslower: {
    flex:1,
    backgroundColor:'white',
    marginTop:20,
    marginBottom:5,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.0975)',
    borderRadius:5,
  },
  toolslowerheader: {
    height: 40,
    borderBottomWidth: 1,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderColor:'rgba(0,0,0,0.0975)',
    backgroundColor:'white',
    justifyContent:'center',
  },
  calendarheadertxt: {
    marginLeft: 20,
  },
  expandcalendar: {
    flexDirection: "row",
    position:'absolute',
    right:15,
  },
  yearrow: {
    flexDirection:'row',
    justifyContent:"space-evenly"
  },
  yearrow2: {
    flexDirection:'row',
    marginTop: 5,
    justifyContent:"space-evenly"
  },
  yearviewtable: {

  },
  cyear: {
    margin:5,
    width: 250,
  },
  modalcalendar: {
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    height: height*0.8,
    width: width*0.8,
    backgroundColor:"white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalcalendarlist: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.65,
    width: width*0.75,
    backgroundColor:"#fafafa",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  calendarlist: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  middlecenter: {
    backgroundColor:'#fafafa',
    flexDirection:'row',
  },
  menuitem: {
    marginLeft:0,
    height:40,
  },
  menuButtonContainer: {
    height:40,
  },
  menuButton: {
    position:"absolute",
    top:0,
    height:40,
    marginBottom:20,
  },

});
