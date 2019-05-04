import * as React from "react";
import styled from 'styled-components';
import moment from "moment";
import {
  Button,
  Checkbox,
  Form,
  Card,
  Segment,
  Grid,
  Divider,
  Header,
  Icon,
  Radio,
  List,
  Input,
  Label,
  Dropdown,
} from 'semantic-ui-react';
import Select from 'react-select';
import Scrollspy from 'react-scrollspy';
import CardIcon from '-!react-svg-loader!../../images/icons/card.svg';
import countryList from 'country-list';

const Stage = styled(Grid)`
  padding-top: 6em!important;
  padding-bottom: 6em!important;
`;
const StageCentered = styled(Grid)`
  max-width: 775px;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
`;
const CenteredButton = styled(Button)`
  margin-right: auto!important;
  margin-left: auto!important;
  display: block!important;
`;
const StyledHeader = styled(Header)`
  font-weight: bold!important;
`;
const StyledHeaderCentered = styled(Header)`
  font-size: 1em!important;
  margin-right: auto!important;
  margin-left: auto!important;
  display: block!important;
`;
const FormHeader = styled(Header)`
  font-size: 1em!important;
  margin-bottom: 0!important;
  text-align: left!important;
`;
const FormInput = styled.input`
  border-color: transparent!important;
  padding-left: 0!important;
  width: 100%!important;
`;
const CardSection = styled.div`
  padding-top: 2em;
  width: 100%;
  padding-bottom: 2em;
`;
const FixedSection = styled.div`
  position: fixed;
  top: 9.5em;
  width: 29%;
  max-width: 290px;
  padding-left: 1em;
`;
const CardHeader = styled(Header)`
  font-weight: bold;
  text-align: left!important;
`;
const StyledCard = styled(Card)`
  width: 100%!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
`;
const CardInput = styled(Form.Input)`
  border: 0;
  border-bottom-color: rgb(201, 201, 201);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-radius: 0;
  margin-top: 2em!important;
  .input {
    display: block;
  }
`;
const CardCheckbox = styled(Form.Input)`
  border: 0;
  border-radius: 0;
  margin-top: 2em!important;
`;
const CardDropdown = styled(Dropdown)`
  border: 0!important;
  padding-left: 0!important;
`;
const CardButton = styled(Button)`
  background-color: rgb(155,201,61)!important;
  float: right;
  margin-top: 1em!important;
`;
const StyledNavigationCard = styled(Card)`
  width: 100%!important;
  margin: 0!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
`;
const ImageSegment = styled(Segment)`
  height: 330px;
  padding-top: 7em!important;
  font-size: 1.2rem!important;
  -webkit-box-shadow: 0 2px 25px 0 rgba(34,36,38,.05) inset!important;
  box-shadow: 0 2px 25px 0 rgba(34,36,38,.05) inset!important;
`;
const ToolsList = styled(List)`
  color: rgba(0,0,0,.6);
`;
const ListItem = styled(List.Item)`
  padding: 1.5em!important;
  border-bottom-style: solid;
  border-bottom-width: 1px!important;
  border-bottom-color: rgba(0, 0, 0, 0.075)!important;
`;
const ListHeader = styled(List.Header)`
  color: rgb(116, 116, 116)!important;
`;
const ListIcon = styled(List.Icon)`
  color: rgb(116, 116, 116)!important;
  padding-right: 1.5em!important;
`;
const StyledLabel = styled(Label)`
  line-height: 2em!important;
`;
const LicenceField = styled(Form.Field)`
  color: black!important;
  opacity: 1!important;
`;
const countries = countryList.getData().map(country => ({
  key: country.code,
  text: country.name,
  value: country.code,
  flag: country.code.toLowerCase()
}))

class Setup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange({
      name: event.target.name,
      value: event.target.value
    })
  }

  render() {
    const {
      t,
      languages,
      userData,
      email,
      handleChange,
      passwordIncorrect,
      passwordConfirmed,
      passwordOld,
      passwordNew,
      passwordConfirmation,
      onTipingOldPassword,
      onTipingNewPassword,
      onTipingConfimationPassword,
      dataChanged,
      saveData,
    } = this.props;
    const { contextRef } = this.state;
    const expirationDate = moment(userData.expiration_date, "YYYY-MM-DD");
    return(
      <Stage centered columns={2} padded style={{ marginRight: "auto!important",  marginLeft: "auto!important"}}>
        <StageCentered>
        <Grid.Row columns='equal' equal width style={{paddingTop: 0}}>
        <Grid.Column>
          <Card.Group>
            <CardSection id="section-1">
              <CardHeader as='h3'>{t( "setup:personal_data" )}</CardHeader>
              <StyledCard>
                <Card.Content style={{paddingTop: 0, paddingBottom: '1.5em'}}>
                  <Form>
                    <CardInput placeholder='Email' error={!userData.email_valid}>
                      <FormHeader>Email</FormHeader>
                      <FormInput
                        name='email'
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                      {
                        !userData.email_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.email_message}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardInput placeholder={t( "setup:first_name" )} error={!userData.first_name_valid}>
                      <FormHeader>{t( "setup:first_name" )}</FormHeader>
                      <FormInput
                        name='first_name'
                        value={userData.first_name}
                        onChange={this.handleChange}
                      />
                      {
                        !userData.email_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.email_message}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardInput placeholder={t( "setup:last_name" )} error={!userData.last_name_valid}>
                      <FormHeader>{t( "setup:last_name" )}</FormHeader>
                      <FormInput
                        name='last_name'
                        value={userData.last_name}
                        onChange={this.handleChange}
                      />
                      {
                        !userData.last_name_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.last_name_message}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardInput>
                      <FormHeader>{t( "setup:language" )}</FormHeader>
                      <CardDropdown
                        placeholder={t( "setup:language" )}
                        fluid
                        search
                        selection
                        options={languages}
                        value={userData.language}
                        onChange={ (event, {value}) => this.handleChange({target: {
                          name: 'language',
                          value: value
                        }})}
                      />
                    </CardInput>
                    <CardButton primary onClick={saveData} disabled={!dataChanged}>{t( "common:save" )}</CardButton>
                  </Form>
                </Card.Content>
              </StyledCard>
            </CardSection>

            <CardSection id="section-2">
              <CardHeader as='h3'>{t( "setup:profile_picture" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <ImageSegment placeholder>
                    <StyledHeaderCentered icon>
                      <Icon name='file image outline' />
                      {t( "setup:app_banner_size" )}
                    </StyledHeaderCentered>
                  </ImageSegment>
                  <CardButton primary>{t( "common:upload" )}</CardButton>
                </Card.Content>
              </StyledCard>
            </CardSection>

            <CardSection id="section-3">
              <CardHeader as='h3'>{t( "setup:licence_data" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <Grid>
                    <Grid.Column width={4} style={{height: '6em'}}>
                      <CardIcon style={{height: '5em', width: '5em', padding: '1em'}}/>
                    </Grid.Column>
                    <Grid.Column width={12} style={{height: '6em', padding: '2em'}}>
                      <Grid.Row style={{ color: 'rgb(27, 27, 27)', fontSize: '1.2em', fontWeight: 'bold'}}>
                        { (moment(userData.expiration_date) > (new Date()) ? t( "setup:licence_valid" ) :  t( "setup:licence_invalid" ))  }
                      </Grid.Row>
                      <Grid.Row style={{color: 'rgb(116, 116, 116)!important'}}>
                        { (new Date() ? t( "setup:valid_until" ) :  t( "setup:invalid_since" )) + " " + moment(userData.expiration_date).format('Do MMMM YYYY') }
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                  <CardButton primary>{t( "common:buy_licence" )}</CardButton>
                </Card.Content>
              </StyledCard>
            </CardSection>

            <CardSection id="section-4">
              <CardHeader as='h3'>{t( "setup:my_address" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <Form>
                    <CardInput placeholder={t( "setup:company_name" )}
                      error={!userData.company_name_valid}
                    >
                      <FormHeader>{t( "setup:company_name" )}</FormHeader>
                      <FormInput
                        name='company_name'
                        placeholder={t( "setup:company_name" )}
                        type='text'
                        value={userData.company_name}
                        onChange={this.handleChange}
                      />
                      {
                        !userData.company_name_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.company_name_message}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardInput placeholder={t( "setup:phone_number" )}
                      error={!userData.company_name_valid}
                    >
                      <FormHeader>{t( "setup:phone_number" )}</FormHeader>
                      <FormInput
                        name='phone_number'
                        placeholder={t( "setup:phone_number" )}
                        type='text'
                        value={userData.phone_number}
                        onChange={this.handleChange}
                      />
                      {
                        !userData.phone_number_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.phone_number_message}
                        </StyledLabel>
                      }
                    </CardInput>

                    <CardInput
                      placeholder={t( "setup:website" )}
                      error={!userData.website_valid}
                    >
                      <FormHeader>{t( "setup:website" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="website"
                          value={userData.website}
                          onChange={this.handleChange}
                          label='http://'
                          placeholder={t( "setup:facebook_profile" )}
                        />
                        {
                          !userData.website_valid &&
                          <StyledLabel color='red' pointing='left'>
                            {userData.website_message}
                          </StyledLabel>
                        }
                    </CardInput>
                    <CardInput>
                      <FormHeader>{t( "setup:country" )}</FormHeader>
                      <CardDropdown
                        placeholder={t( "setup:country" )}
                        fluid
                        search
                        selection
                        options={countries}
                        value={userData.country}
                        onChange={ (event, {value}) => this.handleChange({target: {
                          name: 'country',
                          value: value
                        }})}
                      />
                    </CardInput>

                    <CardInput
                      placeholder={t( "setup:zip_code" )}
                      error={!userData.zip_code_valid}
                    >
                      <FormHeader>{t( "setup:zip_code" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="zip_code"
                          value={userData.zip_code}
                          onChange={this.handleChange}
                          placeholder={t( "setup:zip_code" )}
                        />
                        {
                          !userData.zip_code_valid &&
                          <StyledLabel color='red' pointing='left'>
                            {userData.zip_code}
                          </StyledLabel>
                        }
                    </CardInput>

                    <CardInput
                      placeholder={t( "setup:street" )}
                      error={!userData.street_valid}
                    >
                      <FormHeader>{t( "setup:street" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="street"
                          value={userData.street}
                          onChange={this.handleChange}
                          placeholder={t( "setup:street" )}
                        />
                        {
                          !userData.street_valid &&
                          <StyledLabel color='red' pointing='left'>
                            {userData.street}
                          </StyledLabel>
                        }
                    </CardInput>

                    <CardInput
                      placeholder={t( "setup:city" )}
                      error={!userData.city_valid}
                    >
                      <FormHeader>{t( "setup:city" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="city"
                          value={userData.city}
                          onChange={this.handleChange}
                          placeholder={t( "setup:city" )}
                        />
                        {
                          !userData.city_valid &&
                          <StyledLabel color='red' pointing='left'>
                            {userData.city}
                          </StyledLabel>
                        }
                    </CardInput>
                    <CardButton primary onClick={saveData} disabled={!dataChanged}>{t( "common:save" )}</CardButton>
                  </Form>
                </Card.Content>
              </StyledCard>
            </CardSection>

            <CardSection id="section-5">
              <CardHeader as='h3'>{t( "setup:data_protection" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <Segment placeholder style={{ fontSize: "0.9em"}}>
                    <Grid columns={2} stackable textAlign='center'>
                      <Divider vertical></Divider>

                      <Grid.Row verticalAlign='middle' >
                        <Grid.Column>
                          <StyledHeader icon>
                            <Icon name='pdf file outline' />
                            {t( "setup:data_process_agreement" )}
                          </StyledHeader>
                          <CardButton primary style={{float:'initial'}}>
                            {t( "common:download" )}
                          </CardButton>
                        </Grid.Column>

                        <Grid.Column>
                          <StyledHeader icon>
                            <Icon name='pdf file outline' />
                            {t( "setup:agreement" )}
                          </StyledHeader>
                          <CardButton primary style={{float:'initial'}}>
                            {t( "common:download" )}
                          </CardButton>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Card.Content>
              </StyledCard>
            </CardSection>

            <CardSection id="section-6">
              <CardHeader as='h3'>{t( "setup:app_banner" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <ImageSegment >
                    <StyledHeaderCentered icon>
                      <Icon name='file image outline' />
                      {t( "setup:app_banner_size" )}
                    </StyledHeaderCentered>
                  </ImageSegment>
                  <CardButton primary>{t( "common:upload" )}</CardButton>
                  <Form>
                    <CardInput
                      placeholder={t( "setup:app_banner_link" )}
                      error={!userData.website_valid}
                    >
                      <FormHeader>{t( "setup:app_banner_link" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="app_banner_link"
                          value={userData.app_banner_link}
                          onChange={this.handleChange}
                          placeholder={t( "setup:app_banner_link" )}
                        />
                        {
                          !userData.app_banner_link_valid &&
                          <StyledLabel color='red' pointing='left'>
                            {userData.app_banner_link_message}
                          </StyledLabel>
                        }
                    </CardInput>
                    <CardButton primary>{t( "common:save" )}</CardButton>
                  </Form>
                </Card.Content>
              </StyledCard>
            </CardSection>

            <CardSection id="section-7">
              <CardHeader as='h3'>{t( "setup:workout_channel" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <Form>
                    <CardCheckbox
                      placeholder={t( "setup:channel_status" )}
                      error={!userData.channel_status_valid}
                    >
                      <FormHeader>{t( "setup:channel_status" )}</FormHeader>
                      <Form.Field
                        style={{ position: 'absolute', right: 0, marginRight: '1em', marginTop: '-1em'}}
                        control={Radio}
                        toggle
                        checked={userData.workout_enable == 1}
                        onChange={(event, value) => {
                          this.handleChange({
                            target: {
                              name: 'workout_enable',
                              value: value.checked ? 1 : 0
                            }
                          })
                        }}
                      />
                    </CardCheckbox>

                    <CardInput
                      placeholder={t( "setup:facebook_profile" )}
                      error={!userData.facebook_profile}
                    >
                      <FormHeader>{t( "setup:facebook_profile" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="facebook_profile"
                          value={userData.facebook_profile}
                          onChange={this.handleChange}
                          placeholder={t( "setup:facebook_profile" )}
                        />
                    </CardInput>
                    <CardInput
                      placeholder={t( "setup:googleplus" )}
                      error={!userData.googleplus}
                    >
                      <FormHeader>{t( "setup:googleplus" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="googleplus"
                          value={userData.googleplus}
                          onChange={this.handleChange}
                          placeholder={t( "setup:googleplus" )}
                        />
                    </CardInput>
                    <CardInput
                      placeholder={t( "setup:twitter" )}
                      error={!userData.twitter}
                    >
                      <FormHeader>{t( "setup:twitter" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="twitter"
                          value={userData.twitter}
                          onChange={this.handleChange}
                          placeholder={t( "setup:twitter" )}
                        />
                    </CardInput>
                    <CardInput
                      placeholder={t( "setup:promo_video" )}
                      error={!userData.promo_video_valid}
                    >
                      <FormHeader>{t( "setup:promo_video" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="promo_video"
                          value={userData.promo_video}
                          onChange={this.handleChange}
                          placeholder={t( "setup:promo_video" )}
                        />
                    </CardInput>
                    <CardInput
                      placeholder={t( "setup:short_description" )}
                    >
                      <FormHeader>{t( "setup:short_description" )}</FormHeader>
                        <FormInput
                          type='text'
                          name="short_description"
                          value={userData.short_description}
                          onChange={this.handleChange}
                          placeholder={t( "setup:short_description" )}
                        />
                    </CardInput>
                  </Form>

                  <ImageSegment placeholder>
                    <StyledHeaderCentered icon>
                      <Icon name='file image outline' />
                      {t( "setup:app_banner_size" )}
                    </StyledHeaderCentered>
                  </ImageSegment>
                  <CardButton primary>{t( "common:upload" )}</CardButton>
                  <CardButton primary>{t( "setup:workout_preview" )}</CardButton>

                </Card.Content>
              </StyledCard>
            </CardSection>


            <CardSection id="section-8">
              <CardHeader as='h3'>{t( "setup:change_password" )}</CardHeader>
              <StyledCard>
                <Card.Content>
                  <Form>
                    <CardInput placeholder={t( "setup:old_passwort" )} error={!userData.first_name_valid}>
                      <FormHeader>{t( "setup:old_passwort" )}</FormHeader>
                      <FormInput
                        name='password_old'
                        value={passwordOld}
                        type="password"
                        onChange={(event) => onTipingOldPassword(event.target.value)}
                      />
                      {
                        passwordIncorrect &&
                        <StyledLabel color='red' pointing='left'>
                          {t("setup:password_incorrect")}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardInput placeholder={t( "setup:new_passwort" )} error={!userData.first_name_valid}>
                      <FormHeader>{t( "setup:new_passwort" )}</FormHeader>
                      <FormInput
                        name='password_new'
                        value={passwordNew}
                        type="password"
                        onChange={(event) => onTipingNewPassword(event.target.value)}
                        disabled={!passwordConfirmed}
                      />
                      {
                        !userData.last_name_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.last_name_message}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardInput placeholder={t( "setup:new_passwort_confirmation" )} error={!userData.first_name_valid}>
                      <FormHeader>{t( "setup:new_passwort_confirmation" )}</FormHeader>
                      <FormInput
                        name='password_new'
                        value={passwordConfirmation}
                        type="password"
                        onChange={(event) => onTipingConfimationPassword(event.target.value)}
                        disabled={!(passwordConfirmed && passwordNew && passwordNew.length > 5)}
                      />
                      {
                        !userData.last_name_valid &&
                        <StyledLabel color='red' pointing='left'>
                          {userData.last_name_message}
                        </StyledLabel>
                      }
                    </CardInput>
                    <CardButton primary>{t( "setup:change_password" )}</CardButton>
                  </Form>
                </Card.Content>
              </StyledCard>
            </CardSection>
          </Card.Group>
        </Grid.Column>

        <Grid.Column width={6}>
          <FixedSection>
            <StyledNavigationCard className="tools-card">
              <Scrollspy
                items={ ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7'] }
                currentClassName="is-current"
              >
                <ToolsList>
                  <ListItem>
                    <a href="#section-1" style={{display: 'flex'}}>
                      <ListIcon name='user' />
                      <List.Content>
                        <ListHeader>{t( "setup:personal_data" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href="#section-2" style={{display: 'flex'}}>
                      <ListIcon name='address book' />
                      <List.Content>
                        <ListHeader>{t( "setup:profile_picture" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href="#section-3" style={{display: 'flex'}}>
                      <ListIcon name='usd' />
                      <List.Content>
                        <ListHeader>{t( "setup:licence_data" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href="#section-4" style={{display: 'flex'}}>
                      <ListIcon name='street view' />
                      <List.Content>
                        <ListHeader>{t( "setup:my_address" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href="#section-5" style={{display: 'flex'}}>
                      <ListIcon name='law' />
                      <List.Content>
                        <ListHeader>{t( "setup:data_protection" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href="#section-6" style={{display: 'flex'}}>
                      <ListIcon name='image' />
                      <List.Content>
                        <ListHeader>{t( "setup:app_banner" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                  <ListItem style={{borderBottom: 'none'}}>
                    <a href="#section-7" style={{display: 'flex'}}>
                      <ListIcon name='youtube' />
                      <List.Content>
                        <ListHeader style={{color: '#8b9898'}}>{t( "setup:workout_channel" )}</ListHeader>
                      </List.Content>
                    </a>
                  </ListItem>
                </ToolsList>
              </Scrollspy>
            </StyledNavigationCard>
          </FixedSection>
        </Grid.Column>

        </Grid.Row>
      </StageCentered>
      </Stage>
    );
  }
};

export default Setup;
