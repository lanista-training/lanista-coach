import * as React from "react";
import {ToolTip} from './styles';
import Avatar from '@material-ui/core/Avatar';

const CustomTooltip = ({ t, active, payload, label }) => {
  if (active && payload[0]) {
    return (
      <ToolTip>
        <div className="tootip-title">
          <div className="author">
            <div className="author-avatar">
              <Avatar alt={payload[0].payload.creator && payload[0].payload.creator.first_name + ' ' + payload[0].payload.creator && payload[0].payload.creator.last_name} src={payload[0].payload.creator && payload[0].payload.creator.photoUrl} />
            </div>
            <div className="author-name">
              {payload[0].payload.creator && payload[0].payload.creator.first_name} {payload[0].payload.creator && payload[0].payload.creator.last_name}
            </div>
          </div>
          <div className="record-date">{label}</div>
        </div>
        {payload && payload.map(record => <div className="record">
          <div className="record-name">{t('score')}</div>
          <div className="record-value" style={{color: record.stroke}}>{record.value}<span>{record.unit}</span></div>
        </div>)}
      </ToolTip>
    );
  }
  return null;
};

export default CustomTooltip;
