import * as React from "react";
import styled from 'styled-components';
import Feeds from "../../components/feeds";

export default ({
  feeds,
  t,
  currentScrollPosition,
  jumpToNow,
  jumpToDay,
  onRequestPage,
  loading,
  error,
  hasMore,
  initialLoading,
  setPageSize,
}) => {
  return (
    <Feeds
      feeds={feeds}
      t={t}
      currentScrollPosition={currentScrollPosition}
      jumpToDay={jumpToDay}
      onRequestPage={onRequestPage}
      loading={loading}
      error={error}
      hasMore={hasMore}
      initialLoading={initialLoading}
      setPageSize={setPageSize}
    />
  )
};
