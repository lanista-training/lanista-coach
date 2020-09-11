import * as React from "react";

const CustomTooltip = ({ t, active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <div className="tootip-title">{t("date")} {label}</div>
        {payload && payload.map(record => <div className="record">
          <div className="record-name">{t(record.dataKey)}</div>
          <div className="record-value" style={{color: record.stroke}}>{record.value}<span>{record.unit}</span></div>
        </div>)}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
