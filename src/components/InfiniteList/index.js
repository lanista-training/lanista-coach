import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialLoading: false,
      pageSize: 0,
    }
    this.lastScrollTop = 0;
    this.scrollListener = this.scrollListener.bind(this);
    this.direction = "DOWN"
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {initialLoading, hasMore, hasMoreUp, loading} = this.props

    if( initialLoading !== prevProps.initialLoading ){
      if ( initialLoading ) {
        console.log('=============== initialLoading started ===============')
        document.getElementById("infinte-list-wrapper").scrollTo({ top: 0 })
      } else {
        console.log('=============== initialLoading finished ===============')
        if( hasMore ){
          this.calculatePageSize();
        }
      }
    }

    if( !initialLoading && loading !== prevProps.loading ){
      if ( loading ) {
        console.log('=============== loading started ===============')
      } else {
        console.log('=============== loading finished ===============')
        if( !hasMore && !hasMoreUp ) {
          this.detachScrollListener();
        }
      }
    }
    if( this.direction == 'UP' ){
      let scrollEl = document.getElementById("infinte-list-wrapper");
      scrollEl.scrollTop = scrollEl.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop;
    }
    this.attachScrollListener();
  }

  attachScrollListener() {
    let scrollEl = document.getElementById("infinte-list-wrapper");
    if (!this.props.hasMore || !scrollEl) {
      console.log("NO ATTACHING")
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
    console.log("scrollListener")
    console.log(e)
    const {hasMore} = this.props
    if( this.lastScrollTop < e.target.scrollTop ) {
      if( (e.target.scrollHeight - e.target.scrollTop) <= (e.target.offsetHeight * 2) && hasMore) {
        this.loadMore('DOWN')
      }
    } else {
      if( e.target.scrollTop <= (e.target.offsetHeight * 2) ) {
        this.beforeScrollHeight = e.target.scrollHeight;
        this.beforeScrollTop = e.target.scrollTop;
        this.loadMore('UP')
      }

    }
    this.lastScrollTop = e.target.scrollTop
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

  loadMore(direction) {
    console.log('=============== loadMore ===============')
    const {loadMore} = this.props
    this.direction = direction
    loadMore(direction)
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
    if( initialLoading ) {
      return React.createElement('div', props, initialLoading);
    } else {
      if (hasMore) {
        childrenArray.push(loader)
      }
      return React.createElement('div', {class: listClass}, childrenArray);
    }

  }
}
