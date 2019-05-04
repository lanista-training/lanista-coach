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
  ImageBackground
} from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { CardItem } from '../../components/CardItem';
import { Body } from '../../components/Body';
import { Text } from '../../components/Text';
import { Form } from '../../components/Form';
import { Item } from '../../components/Item';
import { Input } from '../../components/Input';
import { FloatingAction } from 'react-native-floating-action';
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
  Icon,
  Fab,
  Footer,
  FooterTab,
  CheckBox,
  ListItem
} from 'native-base';
import Modal from 'react-native-modalbox';


const { width, height } = Dimensions.get("window");
const StyledRegisterButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.primary}!important;
  color: white!important;
`;
const StyledFooter = styled.View`
  background-color: ${props => props.theme.colors.secondary}!important;
`;


const actions = [{
    text: 'Deutsch',
    icon: require('../../images/de.png'),
    name: 'bt_german',
    size: 100,
    position: 2
  }, {
    text: 'English',
    icon: require('../../images/en.png'),
    size: 100,
    name: 'bt_english',
    position: 6
  }, {
    text: 'Español',
    icon: require('../../images/es.png'),
    size: 100,
    name: 'bt_spain',
    position: 5
  }, {
    text: 'Français',
    icon: require('../../images/fr.png'),
    name: 'bt_french',
    position: 1
  }, {
    text: 'Português',
    icon: require('../../images/br.png'),
    name: 'bt_room',
    position: 4
  }, {
    text: 'Русский',
    icon: require('../../images/rs.png'),
    name: 'bt_russia',
    position: 3
  }];

export default class Registration extends PureComponent {

  constructor() {
    super();
    this.state = {
      active: false,
      name:'',
      password:'',
      emailValidate:false,
      emailchecked:false,
      scrollIndex: 0,
      pwlength:false,
      pwnull:true,
      agbcheck:false,
      fadeAnim: new Animated.Value(0),
      footerAnim:new Animated.Value(0),
      visible: true,
    };
  }

componentDidMount() {
  Animated.sequence([
    // decay, then spring to start and twirl
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 400,
        delay: 400,              // Make it take a while
      }
    ),
    Animated.spring(this.state.footerAnim, {
      toValue: 1,
      friction: 6,
    }),
  ]).start();
}

modalclicked(status){

    this.refs.modal3.close()

    if(status == true)
    {
      this.setState({agbcheck:true});
      this.props.handleAgreedToLAChange(true);
    }
    else {
      console.log('Cancel Pressed');
      this.setState({agbcheck:false});
      this.props.handleAgreedToLAChange(false);
    }
}

async regUser(){
  await this.props.registerUser();

  if(this.props.validationEmailErrorMessage != null){
    Toast.show({
      text: this.props.validationEmailErrorMessage,
      buttonText: 'Okay',
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
      duration:30000
    });
  } else if(this.props.validationPasswordErrorMessage!=null){
    Toast.show({
      text: this.props.validationPasswordErrorMessage,
      buttonText: 'Okay',
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
      duration:30000
    });
  } else if(this.props.validationAgreedToLAErrorMessage!=null){
    Toast.show({
      text: this.props.validationAgreedToLAErrorMessage,
      buttonText: 'Okay',
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
      duration:30000
    });
  } else {
    //RegisterUser switchscreen
  }
}

render() {
  const {
    registered,
    registering,
    registerUser,
    goBack,
    error,
    errorMessage,
    email,
    emailIsValid,
    emailConfirmation,
    emailConfirmationIsValid,
    password,
    passwordConfirmation,
    passwordIsValid,
    passwordConfirmationIsValid,
    agreedToLA,
    agreedToLAIsValid,
    handleEmailChange,
    handlePasswordChange,
    handleAgreedToLAChange,
    handlePasswordConfirmationChange,
    t,
  } = this.props;

  let { fadeAnim, footerAnim, visible } = this.state;
  const footerHeight = height*0.095;
  let modalMoveY = visible ? footerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [ footerHeight, 0 ],
  })
  :
  footerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [ 0, 1000 ],
  });

  return (
      // Toasts need to be enclosed in <Root>
    <Animated.View                 // Special animatable View
      style={
        {flex:1, opacity: fadeAnim}
      }
    >
      <Root>
        <Container>
          <ImageBackground source={require('../../images/registration-background.png')}
          style={styles.bgcontainer}>
          <Content>
            <KeyboardAvoidingView style={styles.content} behavior="padding">

            <Modal style={[styles.modal, styles.modal3]} position={"center"}
            ref={"modal3"}
            backdropPressToClose={false}
            swipeToClose={false}>
              <Text style={styles.headline}
                title='AGBs'>
              </Text>
              <Text style={styles.text}
                title='My Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert MsgMy Alert Msg'>
              </Text>
              <View style={styles.modalbtnplace}>
              <Button transparent primary
                style={styles.modalbuttonStyle}
                title="Cancel"
                textstyle={{fontWeight:'900'}}
                color="blue"
                onPress={()=> this.modalclicked(false)}>
              </Button>
              <Button transparent danger
                style={styles.modalbuttonStyle}
                title="Agree"
                textstyle={{fontWeight:'900'}}
                color="red"
                onPress={()=> this.modalclicked(true)}>
              </Button>
              </View>
            </Modal>

              <View style={{flex:1, marginBottom:100}}>
                <View style={{alignSelf:'center'}}>
                  <Image source={require('../../images/lanista-logo-red.png')} style={styles.lanistalogo}/>
                </View>
                <View style={{alignSelf:'center', height:'10%', marginBottom: 30}}>
                  <Text style={{ fontSize:30, color:'#d20027' }}
                    title='Lanista Coach'>
                  </Text>
                </View>

                <View style={{alignSelf:'center'}}>
                  <Form style={{width: width*'0.4', flex:0}}>
                    <Item error={this.state.emailIsValid == false} success={this.state.emailValidate} rounded style={styles.itemroundedtop}>
                      <Input returnKeyType="next"
                        //TODO "focus passwort after hitting next button"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleEmailChange}/>
                      </Item>
                    <Item rounded style={styles.middleitem}>
                      <Input returnKeyType="next"
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
                        //ref={(input) => this.passwordInput = input}
                        placeholder="Password"/>
                    </Item>
                    <Item rounded style={styles.itemroundedbottom}>
                        <Input returnKeyType="go"
                          secureTextEntry={true}
                          onChangeText={handlePasswordConfirmationChange}
                          //ref={(input) => this.passwordInput = input}
                          placeholder="Password confirmation"/>
                    </Item>
                    <ListItem noBorder>
                      <CheckBox checked={this.state.agbcheck} style={{paddingLeft:10}}
                      onPress={()=> this.refs.modal3.open()}/>
                        <Body style={{}}>
                          <Text title={t("login:terms_and_conditions")} style={{fontWeight:'400',color:"black", alignSelf:"flex-start", fontSize:16, paddingLeft:5}}></Text>
                        </Body>
                    </ListItem>
                  </Form>
                </View>

                <View style={{alignSelf:'center', marginTop:10}}>
                  <StyledRegisterButton danger
                    style={styles.buttonStyle}
                    title="Konto erstellen"
                    textstyle={{fontWeight:'900'}}
                    color="#FFFFFF"
                    onPress={()=> this.regUser()}
                  />
                  <Button light
                    style={styles.buttonStyle}
                    textstyle={{color:'red'}}
                    title="Zur Anmeldung"
                    color="#FFFFFF"
                    onPress={()=> {
                      this.setState({
                        visible: false,
                      }, ()=> {
                        Animated.sequence([
                          // decay, then spring to start and twirl
                          Animated.timing(                  // Animate over time
                            this.state.fadeAnim,            // The animated value to drive
                            {
                              toValue: 0,                   // Animate to opacity: 1 (opaque)
                              duration: 300,        // Make it take a while
                            }
                          ),
                          Animated.spring(this.state.footerAnim, {
                            toValue: 1,
                            friction: 6,
                          }),
                        ]).start(() => {
                          goBack();
                        });
                      });
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </Content>
          <Animated.View style={{ transform: [{ translateY: modalMoveY }]}}>
            <StyledFooter style={{
              width:width,
              height:footerHeight,
              flexDirection:'row',
            }}>
              <Button disabled light
                style={styles.footerbtn}
                title="Lanista Trainingssoftware © 2012">
              </Button>
              <Button light
                style={styles.footerbtn}
                title="Impressum >">
              </Button>
              <Button light
                style={styles.footerbtn}
                title="Datenschutz >">
              </Button>
              <Button light
                style={styles.footerbtn}
                title="Info >">
              </Button>
              <View style={styles.containerFAB2}>

              </View>
            </StyledFooter>

          </Animated.View>
          </ImageBackground>
        </Container>
      </Root>
    </Animated.View>
  )}
}

const styles = StyleSheet.create({

  modalbuttonStyle: {
      width:width*0.3,
      justifyContent:'center',
      bottom: 0,
  },

  modalbtnplace: {
    flexDirection: 'row',
    justifyContent:'center',
    height:50,
    width: 200,
    position: 'absolute',
    bottom:0,
    },
  text: {
      color: "black",
      fontSize: 22
    },
  modal: {
      alignItems: 'center'
    },

    modal3: {
      height: height*0.6,
      width: width*0.6,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

  content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:width,
        height:height
      },
      itemroundedtop:{
        paddingLeft: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor:"white",
        marginBottom:0,
        borderBottomColor: "transparent",
      },
      itemroundedbottom:{
        paddingLeft: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor:"white",
        marginBottom:0,
      },
  middleitem:{
    paddingLeft: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor:"white",
    marginBottom:0,
  },
  bgcontainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  containerNextPage: {
    flex: 1,
    position: 'absolute',
    top: 10,
    right: -50,
    width: 100,
    height: 100,
    backgroundColor:'green'
  },
  containerFAB2: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
    right:0,
    width: 100,
    height: 100
  },
  backgroundImage: {
    width,
    height
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
  },
  Alert_Main_View:{

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#009688",
    height: 200 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,

  },

  Alert_Title:{

    fontSize: 25,
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%'

  },

  Alert_Message:{

      fontSize: 22,
      color: "#fff",
      textAlign: 'center',
      padding: 10,
      height: '42%'

    },

  buttonStyle: {
      alignSelf:'center',
      width:width*0.4,
      justifyContent:'center',
      marginBottom: 10
  },

  footerbtn: {
      alignSelf:'center',
  },

  buttonforgotpw: {

      alignSelf:'center',
      width:width*0.4,
      justifyContent:'center',
      marginBottom: 30,
      marginTop:30

  },

  lanistalogo: {
    width:50,
    height:50
  },

  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 22,
      marginTop: -5
  },
  headline: {
    color: "black",
    fontSize: 35,
    alignSelf:'center',
    marginBottom: 20,
    marginTop:10,
  },


});
