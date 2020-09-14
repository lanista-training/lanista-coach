import React, { Component, useState, useEffect } from 'react';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LanistaButton from '../../components/LanistaButton';

import {
  StyledCard,
} from './styles';;

export default ({

  t,

}) => {

  return (
    <div className="section profile-data-protection-section" id="section-5">
      <div className="section-header">{t( "data_protection" )}</div>
      <StyledCard>
        <div className="section-content">
          <div className="data-protection-section">
            <div className="document-left">
              <PictureAsPdfIcon/>
              <div className="document-name">{t("data_process_agreement")}</div>
              <LanistaButton>{t("download")}</LanistaButton>
            </div>
            <div className="document-right">
              <PictureAsPdfIcon/>
              <div className="document-name">{t("agreement")}</div>
              <LanistaButton>{t("download")}</LanistaButton>
            </div>
          </div>
        </div>
      </StyledCard>
    </div>
  )
}
