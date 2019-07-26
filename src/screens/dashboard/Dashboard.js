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
  hasMoreUp,
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
      hasMoreUp={hasMoreUp}
      initialLoading={initialLoading}
      setPageSize={setPageSize}
    />
  )
};
