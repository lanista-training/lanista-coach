import * as React from "react";
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Popover from '@material-ui/core/Popover';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const WorkoutsHeader = styled.div`
  width: 100%;
  display: flex;
  flex-flow: reverse;
  align-items: center;
  justify-content: space-between;
  .buttons {
    box-shadow: 0 0 27px 0 #00000054;
    border-radius: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  button {
    border-radius: 15px;
    background: white;
  }
  .active {
    background: black!important;
    span {
      color: white;
    }
  }
`;

const PluginsList = styled(Popover)`
  .MuiPaper-root {
    background: transparent;
    box-shadow: none;
    .plugin-list {
      padding: 0 2em;
      background: transparent;
      .plugin {
        padding: 2em;
        margin: 1em 0;
        border-radius: 15px;
        background: white;
        box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        .header {
          font-weight: 900;
          text-transform: capitalize;
          padding-bottom: 10px
        }
      }
    }
  }
`;

const SearchField = styled(TextField)`
  input {
    width: 6em;
    -moz-transition: width 0.5s ease;
    -webkit-transition: width 0.5s ease;
    -o-transition: width 0.5s ease;
    transition: width 0.5s ease;
    :focus {
      width: 10em;
    }
  }
  .MuiInputBase-root {
    height: 33px;
    border-radius: 20px;
    background: white;
  }
`;

export default ({t, filter, setFilter, onTextSearchChange, plugins, bu}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'plugins-popover' : undefined;

  React.useEffect(() => {
    handleClose();
  }, [filter])
console.log("bu", bu)
  return (
    <WorkoutsHeader>
      <ButtonGroup aria-label="plans" className="buttons">
        <Button
          onClick={() => filter == "my" ? setFilter("") : setFilter("my")}
          className={filter == 'my' ? "active" : ""}
        >
          {t("my")}
        </Button>
        <Button
          onClick={() => filter == "lanista" ? setFilter("") : setFilter("lanista")}
          className={filter == 'lanista' ? "active" : ""}
        >
          Lanista
        </Button>
        {bu > 0 && (
          <Button
            onClick={() => filter == "studio" ? setFilter("") : setFilter("studio")}
            className={filter == 'studio' ? "active" : ""}
          >
              {t("gym")}
          </Button>
        )}
        <Button
          aria-describedby={id}
          onClick={handleClickOpen}
          className={filter.indexOf("plugin") > -1 ? "active" : ""}
        >
          {filter.indexOf('plugin') > -1 ? filter.split(":")[1] : "Plugins"}
        </Button>
      </ButtonGroup>
      <PluginsList
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        aria-labelledby="plugins-list"
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="plugin-list">
          {
            plugins && plugins.map(plugin => (
              <div className='plugin'onClick={()=>(filter && filter.indexOf('plugin:' + plugin.name) > -1) ? setFilter('') : setFilter("plugin:" + plugin.name)}>
                <div className='header'>{plugin.name}</div>
                <div className="description">
                  {plugin.description}
                </div>
              </div>
            ))
          }
        </div>
      </PluginsList>
      <SearchField
        id="outlined-basic"
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={ (filter && filter.indexOf('text:') > -1) ? filter.split(":")[1] : ''}
        onChange={onTextSearchChange}
      />
    </WorkoutsHeader>
  )
};
