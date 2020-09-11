import React, { Component, PureComponent } from 'react';
import {
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import styled from "../../lib/styledComponents";
import {
  Root,
  Toast,
  Spinner,
  Container,
  Header,
  Content,
  Label,
  View,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Body,
  Text,
  Icon,
  Form,
  Item,
  Input,
  Picker,
  Switch,
} from 'native-base';

const { width, height } = Dimensions.get("window");

export default class Setup extends PureComponent {

  constructor() {
    super();
    this.state = {
      selected2: undefined
    };
  }

onValueChange2(value){
  this.setState({
    selected2: value
  });
}

render() {
  const {
    t,
    languages,
    userData,
  } = this.props;

  return (
    <Container style={styles.container}>
      <View style={styles.scrollcontainer}>
        <ScrollView style={styles.left} showsVerticalScrollIndicator={false}>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Persönliche Daten</Text>
          </View>
          <View style={styles.box}>
            <Form style={styles.dataform}>
              <Item stackedLabel>
                <Label>E-Mail</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Vorname</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Nachname</Label>
                <Input/>
              </Item>
              <Text style={{marginLeft:15, color:"gray", marginTop:10}}>Sprache</Text>
              <Item picker style={{marginLeft: 15}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down"/>}
                  style={{width: undefined}}
                  placeholder="Select language"
                  placeholderStyle={{ color: "#bfc6ea"}}
                  placeHolderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                  >
                  {
                    languages.map((language, index) => (
                      <Picker.Item label={language.text} value={language.text}/>
                    ))
                  }
                </Picker>
              </Item>
            </Form>
            <Button style={styles.savebutton}>
              <Text>Änderungen speichern</Text>
            </Button>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Dein Foto</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.photobox}>
              <View style={styles.photoiconcontainer}>
                <Icon name={"images"} size={40}/>
                <Text>PNG bzw. JPG (840px x 600px)</Text>
              </View>
            </View>
            <Button style={styles.savebutton}>
              <Text>hochladen</Text>
            </Button>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Lizenzdaten</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.licensebox}>
              <Icon name={"images"} size={40}/>
              <View style={styles.licensetxtbox}>
                <Text>Ungültig</Text>
                <Text>Gültig bis xx.xx.xx</Text>
              </View>
            </View>
            <Button style={styles.savebutton}>
              <Text>Lizenz kaufen</Text>
            </Button>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Meine Geschäftsadresse</Text>
          </View>
          <View style={styles.box}>
            <Form style={styles.dataform}>
              <Item stackedLabel>
                <Label>Firmenname</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Telefonnummer</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Website</Label>
                <Input/>
              </Item>
              <Text style={{marginLeft:15, color:"gray", marginTop:10}}>Land</Text>
              <Item picker style={{marginLeft: 15}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down"/>}
                  style={{width: undefined}}
                  placeholder="Select language"
                  placeholderStyle={{ color: "#bfc6ea"}}
                  placeHolderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                  >
                  {
                    languages.map((language, index) => (
                      <Picker.Item label={language.text} value={language.text}/>
                    ))
                  }
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>PLZ</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Straße</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Ort</Label>
                <Input/>
              </Item>
            </Form>
            <Button style={styles.savebutton}>
              <Text>Änderungen speichern</Text>
            </Button>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Datenschutzbestimmungen</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.safety}>
              <View style={styles.b1}>
                <Icon name={"images"} size={40}/>
                <Text>Auftragsdaten</Text>
                <Button style={styles.savebuttoncenter}>
                  <Text>herunterladen</Text>
                </Button>
              </View>
              <View style={styles.vline}/>
              <View style={styles.b1}>
                <Icon name={"images"} size={40}/>
                <Text>Einwilligungserklärung</Text>
                <Button style={styles.savebuttoncenter}>
                  <Text>herunterladen</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>App Gestaltung/Hauptbanner</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.photobox}>
              <View style={styles.photoiconcontainer}>
                <Icon name={"images"} size={40}/>
                <Text>PNG bzw. JPG (840px x 600px)</Text>
              </View>
            </View>
            <Button style={styles.savebutton}>
              <Text>hochladen</Text>
            </Button>
            <Text style={styles.boldtxt}>{t( "setup:app_banner_link" )}</Text>
            <Form style={styles.dataform}>
              <Item>
                <Input placeholder="test"/>
              </Item>
            </Form>
            <Button style={styles.savebutton}>
              <Text>Änderung speichern</Text>
            </Button>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Dein Lanista Workout Channel</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.switchcontainer}>
              <Left>
                <Text style={{color:"gray"}}>Freigabe Status</Text>
              </Left>
              <Right>
                <Switch value={false}/>
              </Right>
            </View>
            <Form style={styles.dataform}>
              <Item stackedLabel>
                <Label>Facebook Profil Link</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Googl Plus</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Twitter</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Promo Video</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Kurzbeshreibung</Label>
                <Input/>
              </Item>
            </Form>
            <View style={styles.photobox}>
              <View style={styles.photoiconcontainer}>
                <Icon name={"images"} size={40}/>
                <Text>PNG bzw. JPG (840px x 600px)</Text>
              </View>
            </View>
            <View style={styles.twobuttons}>
              <Button style={styles.nomarginbtn}>
                <Text>Vorschau</Text>
              </Button>
              <Button style={styles.nomarginbtn}>
                <Text>hochladen</Text>
              </Button>
            </View>
          </View>
          <View style={styles.headline}>
            <Text style={styles.headlinetxt}>Passwort ändern</Text>
          </View>
          <View style={styles.box}>
            <Form style={styles.dataform}>
              <Item stackedLabel>
                <Label>Altes Passwort</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Neues Passwort</Label>
                <Input/>
              </Item>
              <Item stackedLabel>
                <Label>Neues Passwort, bitte bestätigen</Label>
                <Input/>
              </Item>
            </Form>
            <Button style={styles.savebutton}>
              <Text>Passwort ändern</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
      <View style={styles.right}>
        <View style={styles.menu}>
          <List>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"contact"} size={20}/>
                <Text>{t( "setup:personal_data" )}</Text>
              </Button>
            </ListItem>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"camera"} size={20}/>
                <Text>{t( "setup:profile_picture" )}</Text>
              </Button>
            </ListItem>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"ribbon"} size={20}/>
                <Text>{t( "setup:licence_data" )}</Text>
              </Button>
            </ListItem>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"contacts"} size={20}/>
                <Text>{t( "setup:my_address" )}</Text>
              </Button>
            </ListItem>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"finger-print"} size={20}/>
                <Text>{t( "setup:data_protection" )}</Text>
              </Button>
            </ListItem>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"images"} size={20}/>
                <Text>{t( "setup:app_banner" )}</Text>
              </Button>
            </ListItem>
            <ListItem style={{marginLeft:0}}>
              <Button iconLeft transparent dark style={{marginLeft:20}}>
                <Icon name={"logo-youtube"} size={20} />
                <Text>{t( "setup:workout_channel" )}</Text>
              </Button>
            </ListItem>
          </List>
        </View>
      </View>
    </Container>


  )}
}

const styles = StyleSheet.create({

  test: {
      backgroundColor: 'green',
      height: 100,
      width: 100,
  },
  container: {
    flex:1,
    flexDirection: "row",
    backgroundColor: "#fafafa",
    },
  left: {
    marginLeft:75,

    },
  right: {
    width: "45%",
    position:"absolute",
    right:0,
    },
  headline: {
    backgroundColor: "#fafafa",

    },
  headlinetxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    },
  box: {
    flex:1,
    width: 350,
    backgroundColor: "white",
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    },
  menu: {
    width: "75%",
    height: 500,
    marginTop: 30,
    backgroundColor: "white",
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    },
  dataform: {
    marginRight: 20,
    },
  savebutton: {
    backgroundColor: "rgb(155,201,61)",
    margin:20,
    alignSelf:"flex-end",
    },
  savebuttoncenter: {
    backgroundColor: "rgb(155,201,61)",
    margin:20,
    alignSelf:"center",
    },
  photobox: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 200,
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 10,
    },
  photoiconcontainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  licensebox: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginLeft:20,
  },
  licensetxtbox: {
    flex:1,
    alignItems: "center",
    alignSelf:"flex-end",
  },
  safety: {
    flex:1,
    flexDirection:"row",
    backgroundColor: "white",
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    borderColor: "black",
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    },
  b1: {
    flex:1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  vline: {
    borderLeftWidth:2,
    borderLeftColor:'rgba(0,0,0,0.0975)',
  },
  boldtxt: {
    fontWeight:"bold",
    marginLeft: 20,
  },
  twobuttons: {
    flexDirection:"row",
    justifyContent: "flex-end",
    flex:1,
  },
  nomarginbtn: {
    backgroundColor: "rgb(155,201,61)",
    margin: 5,
    },
  switchcontainer: {
    flexDirection: "row",
    margin:15,
    marginTop: 25,
  },

});
