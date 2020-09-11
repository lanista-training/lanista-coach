import * as React from "react";
import { Modal } from 'semantic-ui-react'
import Feeds from '../../components/feeds'

export default ({
  feeds,
  t,
  type,
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
  openMember,
  openPlan,
  showModal,
  modalPanel,
  eventsQuery,
  accesslevel,
  bu,
  hasInterface,
  setFilter,
}) => {
  return (
    <>
      <Feeds
        feeds={feeds}
        t={t}
        type={type}
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
        openMember={openMember}
        openPlan={openPlan}
        eventsQuery={eventsQuery}
        accesslevel={accesslevel}
        bu={bu}
        hasInterface={hasInterface}
        setFilter={setFilter}
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
