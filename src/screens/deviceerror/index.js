import * as React from "react";
import DeviceError from './DeviceError';
import {TranslatorProviderStandalone} from '../../hooks/Translation';

const DeviceErrorPanel = () => {

  return (
    <TranslatorProviderStandalone>
      <DeviceError/>
    </TranslatorProviderStandalone>
  )
}

export default DeviceErrorPanel;
