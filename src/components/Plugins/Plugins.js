import React from 'react'
import styled from 'styled-components';

const PluginsList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .cards {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-flow: wrap;
    ::-webkit-scrollbar {
      display: none!important;
    }
    background: white;
    width: 100%;
    height: 95%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 27px 0 #0000001f;
    z-index: 1;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }
  .selected-plugin {
    border: 1px solid rgb(155,201,61);
    box-shadow: 0 0 10px rgb(155,201,61);
  }
  .list-wrapper {
    background: white;
    width: 100%;
    height: 95%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 27px 0 #0000001f;
    z-index: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column;
    -ms-flex-flow: column;
    flex-flow: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
`;
const Plugin = styled.div`
  padding: 1em;
  width: 20em;
`;
const StyledNoPluginMessage =  styled.div`
  font-size: 1.5em;
  font-weight: 700;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column-reverse;
  -ms-flex-flow: column-reverse;
  flex-flow: column-reverse;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 3.5em;
  opacity: .5;
  i {
    font-size: 5em;
    font-family: Lanista;
    font-style: normal;
    text-align: center;
    margin-top: 25vh;
    ::before {
      content: '\\e90b';
      background: 0 0!important;
    }
  }
`;
const NoPluginMessage = ({text}) =>
  (<StyledNoPluginMessage>
    {text}<i/>
  </StyledNoPluginMessage>)


export default ({data, text, onPluginSelection, pluginFiltersState}) => {
  const plugins = data.map(plugin => (
    <Plugin onClick={() => onPluginSelection(plugin)} className={pluginFiltersState.indexOf(plugin.id) > -1 ? 'selected-plugin' : ''}>
      <div class="ui card">
        <div class="image" style={{ height: "210px", overflow: "hidden"}}>
          <img src={plugin.imageUrl} style={{objectFit: "contain", height: "100%", width: "auto"}}/>
        </div>
        <div class="content">
          <div class="header">{plugin.name}</div>
          <div class="description">
            {plugin.description}
          </div>
        </div>
      </div>
    </Plugin>
  ))
  return (data && data.length > 0 )
  ?
    (<PluginsList>
      <div class="ui cards">
       {plugins}
     </div>
    </PluginsList>)
  :
    (<PluginsList>
      <div className="list-wrapper">
        <NoPluginMessage text={text}/>
      </div>
    </PluginsList>)
};
