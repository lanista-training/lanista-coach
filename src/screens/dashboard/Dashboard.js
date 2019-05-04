import * as React from "react";
import styled from 'styled-components';
import Feeds from "../../components/feeds";

export default ({feeds, t, currentScrollPosition, jumpToNow, jumpToDay}) => {
  return (
    <Feeds
      feeds={feeds}
      t={t}
      currentScrollPosition={currentScrollPosition}
      jumpToDay={jumpToDay}
    />
  )
};
