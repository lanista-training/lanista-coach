import * as React from "react";
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react'
import Feeds from '../../components/feeds'

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
  congratulateMember,
  openPlan,
  showModal,
  modalPanel,
  eventsQuery,
}) => {
  return (
    <>
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
        congratulateMember={congratulateMember}
        openPlan={openPlan}
        eventsQuery={eventsQuery}
      />
      <Modal
        open={showModal}
        size="large"
      >
        {modalPanel}
      </Modal>
    </>
  )
};
