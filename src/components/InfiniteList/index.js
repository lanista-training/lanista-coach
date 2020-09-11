import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialLoading: false,
      pageSize: 0,
    }
    this.scrollListener = this.scrollListener.bind(this)
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {initialLoading, hasMore, hasMoreUp, loading} = this.props

    if( initialLoading !== prevProps.initialLoading ){
      if ( initialLoading ) {
        //console.log('=============== initialLoading started ===============')
        document.getElementById("infinte-list-wrapper").scrollTo({ top: 0 })
      } else {
        //console.log('=============== initialLoading finished ===============')
        if( hasMore ){
          this.calculatePageSize();
        }
      }
    }

    if( !initialLoading && loading !== prevProps.loading ){
      if ( loading ) {
        //console.log('=============== loading started ===============')
      } else {
        //console.log('=============== loading finished ===============')
        if( !hasMore && !hasMoreUp ) {
          this.detachScrollListener();
        }
      }
    }
    this.attachScrollListener();
  }

  attachScrollListener() {
    let scrollEl = document.getElementById("infinte-list-wrapper");
    if (!this.props.hasMore || !scrollEl) {
      return;
    }
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
    );
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
    );
  }

  detachScrollListener() {
    let scrollEl = document.getElementById("infinte-list-wrapper");
    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
    );
    scrollEl.removeEventListener(
      'resize',
      this.scrollListener,
    );
  }

  scrollListener(e) {
    const {hasMore} = this.props
    if( (e.target.scrollHeight - e.target.scrollTop) <= (e.target.offsetHeight * 2) && hasMore ) {
      this.loadMore()
    }
  }

  isPassiveSupported() {
    let passive = false;
    const testOptions = {
      get passive() {
        passive = true;
      }
    };

    try {
      document.addEventListener('test', null, testOptions);
      document.removeEventListener('test', null, testOptions);
    } catch (e) {
      // ignore
    }
    return passive;
  }

  calculatePageSize() {
    const {children} = this.props
    const wrapper = document.getElementById("infinte-list-wrapper")
    const list = wrapper.firstChild
    const itemHeight = list.offsetHeight / children.length
    const itemsOnPage = wrapper.offsetHeight / itemHeight
    this.props.setPageSize(Math.ceil(itemsOnPage))
  }

  loadMore() {
    //console.log('=============== loadMore ===============')
    const {loadMore} = this.props
    loadMore()
  }

  render() {
    const {
      children,
      props,
      hasMore,
      hasMoreUp,
      loader,
      initialLoading,
      listClass,
    } = this.props;

    const childrenArray = [children];

    //console.log("childrenArray")
    //console.log(childrenArray)

    if( initialLoading ) {
      return React.createElement('div', props, initialLoading);
    } else {
      if (hasMore) {
        childrenArray.push(loader)
      }
      return React.createElement('div', {class: 'infinity-list'}, childrenArray);
    }

  }
}
