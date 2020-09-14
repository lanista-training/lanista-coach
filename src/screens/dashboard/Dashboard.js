import * as React from "react";
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react'
import Feeds from '../../components/feeds'

const Dashboard = ({
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

Dashboard.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  feeds: PropTypes.array,

  /**
   * Function to translate content
  */
  type: PropTypes.number,

  /**
   * Function to translate content
  */
  currentScrollPosition: PropTypes.number,

  /**
   * Function to translate content
  */
  jumpToNow: PropTypes.func,

  /**
   * Function to translate content
  */
  jumpToDay: PropTypes.func,

  /**
   * Function to translate content
  */
  onRequestPage: PropTypes.func,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  error: PropTypes.object,

  /**
   * Function to translate content
  */
  hasMore: PropTypes.bool,

  /**
   * Function to translate content
  */
  hasMoreUp: PropTypes.bool,

  /**
   * Function to translate content
  */
  initialLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  setPageSize: PropTypes.func,

  /**
   * Function to translate content
  */
  congratulateMember: PropTypes.func,

  /**
   * Function to translate content
  */
  openMember: PropTypes.func,

  /**
   * Function to translate content
  */
  openPlan: PropTypes.func,

  /**
   * Function to translate content
  */
  showModal: PropTypes.func,

  /**
   * Function to translate content
  */
  modalPanel: PropTypes.object,

  /**
   * Function to translate content
  */
  eventsQuery: PropTypes.string,

  /**
   * Function to translate content
  */
  accesslevel: PropTypes.number,

  /**
   * Function to translate content
  */
  bu: PropTypes.number,

  /**
   * Function to translate content
  */
  hasInterface: PropTypes.bool,

  /**
   * Function to translate content
  */
  setFilter: PropTypes.func,
}

export default Dashboard;
