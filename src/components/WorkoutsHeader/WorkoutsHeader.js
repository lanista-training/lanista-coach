import * as React from "react";
import styled from 'styled-components';
import { Button, Popup, Grid, Header } from 'semantic-ui-react'

const WorkoutsHeader = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row-reverse;
  -ms-flex-flow: row-reverse;
  align-items: center;
  .buttons{
    margin-right: auto;
    margin-left: auto;
    .button{
      color: white;
    }
    .my-workouts {
      background-color: #03a9f4;
    }
    .basic.my-workouts {
      color: #03a9f4!important;
      box-shadow: 0 0 0 1px #03a9f4 inset!important;
    }
    .lanista-workouts {
      background-color: rgb(155, 201, 61);
    }
    .basic.lanista-workouts {
      color: rgb(155, 201, 61)!important;
      box-shadow: 0 0 0 1px rgb(155, 201, 61) inset!important;
    }
    .studio-workouts  {
      background-color: #3F51B5;
    }
    .basic.studio-workouts {
      color: #3F51B5!important;
      box-shadow: 0 0 0 1px #3F51B5 inset!important;
    }
    .plugins-workouts  {
      background-color: #64A992;
    }
    .basic.plugins-workouts {
      color: #64A992!important;
      box-shadow: 0 0 0 1px #64A992 inset!important;
    }
  }
`;

export default ({filter, setFilter, plugins, pluginMenuIsOpen, onOpenPluginsMenu, onClosePluginsMenu}) => {
  return (
    <WorkoutsHeader>
      <Button.Group>
        <Button basic={filter != "my"} onClick={()=>setFilter("my")} className="my-workouts">Meine</Button>
        <Button basic={filter != "lanista"}  onClick={()=>setFilter("lanista")} className="lanista-workouts">Lanista</Button>
        <Button basic={filter != "studio"}  onClick={()=>setFilter("studio")} className="studio-workouts">Studio</Button>
        <Popup
          trigger={<Button basic={filter != "plugin"}
          className="plugins-workouts">{filter.indexOf('plugin') > -1 ? filter.split(':')[1] : 'Plugins'}</Button>}
          flowing
          hoverable
          open={pluginMenuIsOpen}
          onOpen={onOpenPluginsMenu}
          onClose={onClosePluginsMenu}
        >
          <Grid centered divided columns={3}>
            {
              plugins && plugins.map(plugin => (
                <Grid.Column textAlign='center'>
                  <Header as='h4'>{plugin.name}</Header>
                  <p>
                    {plugin.description}
                  </p>
                  <Button onClick={()=>setFilter("plugin:" + plugin.name)}>Choose</Button>
                </Grid.Column>
              ))
            }
          </Grid>
      </Popup>
      </Button.Group>
    </WorkoutsHeader>
  )
};
