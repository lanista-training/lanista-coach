import React, { Component, PureComponent } from 'react';
import {
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Modal,
  TouchableOpacity,
  ImageBackground,
  UIManager,
  findNodeHandle,
  Easing,
  StatusBar,
} from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { CardItem } from '../../components/CardItem';
import { Body } from '../../components/Body';
import { Text } from '../../components/Text';
import { Form } from '../../components/Form';
import { Item } from '../../components/Item';
import { Input } from '../../components/Input';
import { FloatingAction} from '../../components/FloatingAction';
import styled from "../../lib/styledComponents";

import { Root, Toast, Spinner, Container, Header, Content, Label, View, Icon, Fab, Footer, FooterTab} from 'native-base';

const { width, height } = Dimensions.get("window");

const StyledLoginButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.primary}!important;
  color: white!important;
`;

const StyledFooter = styled.View`
  background-color: ${props => props.theme.colors.secondary}!important;
`;

const actions = [];

const animationDuration = 1000;

export default class Login extends PureComponent {

  constructor(props) {
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
      changefloaticon: require('../../images/de.png'),
      isVisible: props.isVisible,
    };
    this.opacity = props.isVisible
      ? new Animated.Value(1)
      : new Animated.Value(0);
    this.footerAnim = new Animated.Value(0);

    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible === this.props.isVisible) return;
    if (nextProps.isVisible) {
      this.fadeIn();
    } else {
      this.fadeOut();
    }
  }

  fadeIn() {
    this.setState({ isVisible: true }, () => {
      Animated.sequence([
        // decay, then spring to start and twirl
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: animationDuration,
        }),
        Animated.spring(this.footerAnim, {
          toValue: 1,
          friction: 6,
        }),
      ]).start();

      /*
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: animationDuration,
      }).start();
      */
    });
   }

   fadeOut() {
     Animated.timing(this.opacity, {
       toValue: 0,
       duration: animationDuration,
     }).start(() => {
       this.setState({ isVisible: false });
     });
  }

  async loginUser(){
    await this.props.authenticateUser();

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
    } else {
      //gotoDashboard
    }
  }


  requireicon(param){
    switch (param) {
      case 'de': return require('../../images/de.png');
      case 'en': return require('../../images/en.png');
      case 'es': return require('../../images/es.png');
      case 'fr': return require('../../images/fr.png');
      case 'br': return require('../../images/br.png');
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.fadeIn();
  }

  render() {
    const {
      authenticateUser,
      authenticating,
      goToRegistration,
      error,
      errorMessage,
      t,
      languages,
      currentLanguage,
      onChangeLanguage,
      email,
      handleEmailChange,
      emailIsValid,
      password,
      handlePasswordChange,
      passwordIsValid,
      validationEmailErrorMessage,
      validationPasswordErrorMessage,
      authenticationErrorMessage,
    } = this.props;


    const footerHeight = height*0.095;
    let modalMoveY = this.footerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [ footerHeight, 0 ],
    });

    for(var i=0;i<this.props.languages.length;i++){
      actions[i]= {
        text: this.props.languages[i],
        icon: this.requireicon(this.props.languages[i]),
        name: this.props.languages[i],
        width: 40,
        height: 40,
        position: i+1
      }
    }

    return (
        // Toasts need to be enclosed in <Root>
      <Animated.View style={{ opacity: this.opacity, flex: 1, }}>
        <Root>
          <Container>
            <ImageBackground source={require('../../images/login-background.jpg')}
            style={styles.bgcontainer}>
            <Content>
              <KeyboardAvoidingView style={styles.content} behavior="padding">
              <View style={{flex:1, marginBottom:100}}>
                <View style={{alignSelf:'center'}}>
                  <Image source={require('../../images/lanista-logo-black.png')} style={styles.lanistalogo}/>
                </View>
                <View style={{alignSelf:'center', height:'10%', marginBottom: 30}}>
                  <Text style={{ fontSize:30, color:'black' }}
                    title={t("lanista_coach")}>
                  </Text>
                </View>

                <View style={{alignSelf:'center'}}>
                  <Form style={{width: width*'0.4', flex:0}}>
                    <Item
                      rounded error={emailIsValid == false}
                      success={emailIsValid}
                      style={styles.itemroundedbottom}
                    >
                      <Input returnKeyType="next"
                        //TODO "focus passwort after hitting next button"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        placeholder={t("login:email_blank")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleEmailChange}/>
                      </Item>
                      <Item rounded style={styles.itemroundedtop}>
                        <Input returnKeyType="go"
                          secureTextEntry={true}
                          onChangeText={handlePasswordChange}
                          //ref={(input) => this.passwordInput = input}
                          placeholder={t("login:password_blank")}/>
                        </Item>
                      </Form>
                    </View>

                    <View style={{alignSelf:'center'}}>
                      <Button transparent dark
                        style={styles.buttonforgotpw}
                        textstyle={{color:'black'}}
                        title={t("login:forgot_password")}>
                      </Button>
                      <StyledLoginButton danger
                      style={styles.buttonStyle}
                      title={t("login")}
                      textstyle={{fontWeight:'900'}}
                      color="#FFFFFF"
                      onPress={this.loginUser.bind(this)}
                      />
                      <Button light
                        style={styles.buttonStyle}
                        textstyle={{color:'red'}}
                        ref={view => { this.myButton = view; }}
                        onLayout={ ({nativeEvent}) => {
                          this.setState({
                            measurements: nativeEvent.layout
                          })
                        }}
                        onPress={(e) => {

                          const {pageX, pageY} = e.nativeEvent;
                          const {height, width, x, y} = this.state.measurements;
                          const screenMeasures = Dimensions.get('window');

                          this.props.goToRegistration({
                            x: screenMeasures.width - width,
                            y: screenMeasures.height - y - (height * 2),
                            height,
                            width,
                          });
                          console.log("Actions filled"+actions);
                          //this.setState({show: false});
                        }}
                        title={t("register")}>
                      </Button>
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
                      title={t("login:trainingssoftware")}>
                    </Button>
                    <Button light
                      style={styles.footerbtn}
                      title={t("login:impressum")}>
                    </Button>
                    <Button light
                      style={styles.footerbtn}
                      title={t("login:datenschutz")}>
                    </Button>
                    <Button light
                      style={styles.footerbtn}
                      title={t("login:info")}>
                    </Button>
                    <View style={styles.containerFAB2}>
                      <FloatingAction
                        actions={actions}
                        position="right"
                        showBackground={false}
                        iconHeight={60}
                        iconWidth={60}
                        floatingIcon={this.state.changefloaticon}
                        size="100"
                        onPressItem={
                          (name) => {
                            this.setState({changefloaticon:this.requireicon(name)});
                            console.log(`selected button: ${name}`);
                            onChangeLanguage(name);
                          }
                        }
                      />
                    </View>
                  </StyledFooter>
                </Animated.View>
              </ImageBackground>
        </Container>
      </Root>
    </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',

    width:width,
    height:height
  },
  itemroundedbottom:{
    paddingLeft: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor:"white",
    marginBottom:0,
    borderBottomColor: "transparent",
  },
  itemroundedtop:{
    paddingLeft: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  }

});
