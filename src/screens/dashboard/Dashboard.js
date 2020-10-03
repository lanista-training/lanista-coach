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

  getMembersList,
  membersListLoading,
  membersListData,
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

        getMembersList={getMembersList}
        membersListLoading={membersListLoading}
        membersListData={membersListData}
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
   * An array with feeds in chronological order (DESC)
  */
  feeds: PropTypes.array,

  /**
   * Current ilter value
  */
  type: PropTypes.number,

  /**
   * The current position of the scroll feeds list. When the threashold is reached, the next page request must be triggered
  */
  currentScrollPosition: PropTypes.number,

  /**
   * This fucntion is at the moment not implmemented
  */
  jumpToNow: PropTypes.func,

  /**
   * This function is at the moment not implemented
  */
  jumpToDay: PropTypes.func,

  /**
   * This function is called the the end of the list is reached
  */
  onRequestPage: PropTypes.func,

  /**
   * Graphql flag when loading feeds
  */
  loading: PropTypes.bool,

  /**
   * Graphql error object for loaading feeds
  */
  error: PropTypes.object,

  /**
   * True: when there are more fedds on the server
   * False: when the end of the list is reached
  */
  hasMore: PropTypes.bool,

  /**
   * True: when there are more fedds on the server
   * False: when the end of the list is reached
  */
  hasMoreUp: PropTypes.bool,

  /**
   * Is true when the first page is beeng loaded
  */
  initialLoading: PropTypes.bool,

  /**
   * The number of feeds to be laoded for each page request
  */
  setPageSize: PropTypes.func,

  /**
   * Navigates to the customer screen
  */
  congratulateMember: PropTypes.func,

  /**
   * Navigates to the customer screen
  */
  openMember: PropTypes.func,

  /**
   * Navigates to the workout screen
  */
  openPlan: PropTypes.func,

  /**
   * Set the flag to mondal panel to true
  */
  showModal: PropTypes.func,

  /**
   * Flag to show or hide a modal panel
  */
  modalPanel: PropTypes.object,

  /**
   * The current filger value
  */
  eventsQuery: PropTypes.string,

  /**
   * This attribute is not used at the moment
  */
  accesslevel: PropTypes.number,

  /**
   * Customer attribute to know if the trainer is an gym or is a personal trainer
  */
  bu: PropTypes.number,

  /**
   * If the trainer is an gym using an interface to the master system
  */
  hasInterface: PropTypes.bool,

  /**
   * Function to change the current filter value
  */
  setFilter: PropTypes.func,
}

export default Dashboard;
