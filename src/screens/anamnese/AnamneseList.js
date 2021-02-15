import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import {StyledAnamneseList} from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import moment from "moment";

export default ( {data, onSelection, placeholder, emptytext, intensity, onSave, loading, error} ) => {

  const {t} = useTranslate("anamnese");
  const [inputField, setInputField] = React.useState('');

  const [selection, setSelection] = React.useState(null);

  React.useEffect(() => {
    setInputField("");
  }, [data]);

  return (
    <StyledAnamneseList>
      <div className="anamnese-input-field">
        <input
          type="text"
          placeholder={placeholder}
          value={inputField}
          onChange={(event) => setInputField(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              inputField.trim().length > 0 && onSave(inputField);
            }
          }}
          disabled={loading}
          autoFocus
        />
      </div>
      <div className="anamnese-list hide-scrollbar">
        { (data === undefined || data.map === undefined || data.length === 0) && !loading && <div className="empty-list">{emptytext}</div> }
        { data && data.map && data.length > 0 && !loading && data.map( (item, index) => (
          <div
            key={item.id}
            className={index == selection ? "anamnese-item selected" : "anamnese-item"}
            onClick={() => {
              setSelection(index);
              onSelection(index);
            }}
          >
            <div className="anamnese-info">
              <div className="anamnese-description">{item.description}</div>
              <div className="anamnese-intensity">{intensity}: <span>{(item.rating && item.rating.length > 0) ? (item.rating[0].value !== null ? item.rating[0].value + ' ' + t('from') + ' 10' : t("NO_VALUE")): t("NO_VALUE")}</span></div>
            </div>
            <div className="anamnese-extra-info">
              <div className="anamnese-creation-date">{moment(new Date(parseInt(item.creation_date))).format("DD-MM-YYYY")}</div>
              <div className="anamnese-creator">{item.creator.first_name} {item.creator.last_name} {item.warning_flag && <ErrorOutlineIcon fontSize="large"/>}</div>
            </div>
          </div>
        )) }
        {loading &&
          <div className="loading-section">
            <CircularProgress size={100}/>
          </div>
        }
      </div>
    </StyledAnamneseList>
  )
}
