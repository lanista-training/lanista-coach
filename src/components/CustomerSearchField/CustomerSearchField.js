import * as React from "react";

import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';

import { SearchField } from './styles.js';
import { useTranslate } from '../../hooks/Translation';

export default ({onChange, value}) => {

  const {t} = useTranslate("customers");

  return(
    <SearchField>
      <div className="text-search-wrapper">
        <div className="text-search">
          <div className="input-area">
            <input
              placeholder={t("textsearch")}
              inputProps={{ 'aria-label': 'search exercises lanista' }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              autoFocus={true}
            />
            <ClearIcon onClick={() => onChange('')}/>
          </div>
          <Divider orientation="vertical" />
          <SearchIcon className="search-button"/>
        </div>
      </div>
    </SearchField>
  )
};
