import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Index extends Component {
  static propTypes = {
    height: PropTypes.string.isRequired,
    refresh: PropTypes.func, // 下拉刷新方法(return Promise)
    loadNext: PropTypes.func, // 滚动加载方法(return Promise)
    pullRate: PropTypes.number, // 拉动速率
    parentClass: PropTypes.string, // 样式定制
    refreshClass: PropTypes.string, // 样式定制
    loadNextClass: PropTypes.string, // 样式定制
    toTopClass: PropTypes.string, // 样式定制
  }
  static defaultProps = {
    height: 0,
    refresh: null,
    loadNext: null,
    pullRate: 0.3,
    parentClass: '',
    refreshClass: '',
    loadNextClass: '',
    toTopClass: '',
  }
  state = {
    dragY: 0,
    dragTransition: '',
    refreshIcon: '',
    refreshTxt: '',
    refreshDeg: '',
    loadNextIcon: '',
    loadNextTxt: '',
    showToTop: false, // 标记‘返回顶部’按钮的显示
  }
  maxOver = 50  // 触发下拉刷新操作的临界值(单位px)
  tStart = 0 // 起点
  loadFlag = false // 标记加载状态 避免重复拉动加载
  refreshFlag = false // 标记是否触发下拉刷新
  nextFlag = true // 标记是否开启滚动加载
  scrollFlag = false // 标记是在滚动中，用于判断是否滚动到顶部，为true时才能触发下拉刷新
  toTopTimer = 0 // 返回顶部的滚动条帧

  componentDidMount(){
    const { refresh } = this.props
    'function' === typeof refresh && refresh()
    const { drag, start, move, end } = this
    drag.addEventListener('touchstart', start.bind(this), { passive: false })
    drag.addEventListener('touchmove', move.bind(this), { passive: false })
    drag.addEventListener('touchend', end.bind(this), { passive: false })
  }

  scroll() {
    this.scrollFlag = false
    const { child, loadFlag, props, nextFlag } = this
    if('function' === typeof props.loadNext && !loadFlag && nextFlag && (child.scrollHeight - child.offsetHeight) * .9 < child.scrollTop){
      this.loadFlag = true
      this.setState({
        loadNextIcon: 'loading',
        loadNextTxt: '加载中...'
      })
      props.loadNext().then(rs => {
        this.setState({
          loadNextIcon: '',
          loadNextTxt: '加载成功'
        })
      }).catch(e=>{
        // 失败处理
        this.setState({
          loadNextIcon: 'error',
          loadNextTxt: '加载失败'
        })
        this.nextFlag = false // 关闭滚动加载，防止一直报错
        console.error(e)
      }).finally(r=>{
        this.loadFlag = false
      })
    }
    this.setState({
      showToTop: child.scrollTop > child.offsetHeight
    })
  }

  start (e) {
    const { loadFlag, drag, tStart, child, toTopTimer } = this
    clearInterval(toTopTimer)
    if (loadFlag) {
      // 阻止浏览器默认事件可以使加载的时候无法滑动
      // e.preventDefault()
      return
    }
    if (child.scrollTop === 0){
      this.scrollFlag = true
    }
    this.setState({
      refreshIcon: '',
      dragTransition: 'none',
    })
    this.tStart = e.touches[0].clientY
  }

  move (e) {
    const { 
      loadFlag, maxOver, tStart, scrollFlag, child
    } = this
    const {
      pullRate
    } = this.props
    if (loadFlag) {
      // e.preventDefault()
      return
    }
    if (child.scrollTop === 0) { // 顶部下拉
      if(!scrollFlag) {
        this.start(e)
      } else {
        const tPosition = (tStart - e.touches[0].clientY) * pullRate
        if (tPosition < 0) {
          e.preventDefault() // 阻止滚动条
          this.refreshFlag = maxOver < Math.abs(tPosition) // 达到临界值进入下拉刷新
          this.setState({
            refreshDeg: `rotate(${this.refreshFlag? 180 : 0 }deg)`,
            refreshTxt: this.refreshFlag? '释放更新': '下拉刷新',
            dragY: Math.abs(tPosition)
          })
        } else {
          this.refreshFlag = false
        }
      }
    } else {
      this.refreshFlag = false
    }
  }

  end (e) {
    const { 
      maxOver, loadFlag, drag, refreshFlag
    } = this
    const { refresh } = this.props
    if (loadFlag) {
      e.preventDefault()
      return
    }
    this.setState({
      dragTransition: '330ms'
    })
    if (refreshFlag && typeof refresh === 'function') {
      this.refreshFlag = false
      this.setState({
        dragY: maxOver,
        refreshIcon: 'loading',
        refreshTxt: '加载中',
        refreshDeg: 'rotate(0deg)'
      })
      refresh().then(rs => {
        this.setState({
          refreshIcon: 'success',
          refreshTxt: '加载成功'
        })
      }).catch(e=>{
        // 失败处理
        this.setState({
          refreshIcon: 'error',
          refreshTxt: '加载失败'
        })
        console.error(e)
      }).finally(r=>{
        setTimeout(() => {
          this.setState({
            dragY: 0,
          })
          setTimeout(() => {
            this.setState({
              dragTransition: 'none'
            })
            this.loadFlag = false
          }, 330)
        }, 1000)
      })
    } else {
      this.setState({
        dragY: 0,
      })
    }
    return true
  }

  toTop(){
    const { child } = this
    this.toTopTimer = setInterval(() => {
      child.scrollTop = child.scrollTop * .99
      if (child.scrollTop <= 1) {
        child.scrollTop = 0
        clearInterval(this.toTopTimer)
      }
    }, 1)
  }
  
  render() {
    const {
      dragY, dragTransition, refreshIcon, refreshTxt, refreshDeg, loadNextIcon, loadNextTxt, showToTop
    } = this.state
    const {
      height, refresh, loadNext, children, parentClass, refreshClass, loadNextClass, toTopClass
    } = this.props
    const length =  children.props ? children.props.children.length: children.length
    return (
      <div
        styleName="drag"
        className={parentClass}
        ref={e => this.drag = e}
        style={{ 
          height: height,
          transition: dragTransition,
          WebkitTransition: dragTransition,
          transform: `translate3d(0px, ${dragY}px, 0px)`,
          WebkitTransform: `translate3d(0px, ${dragY}px, 0px)`
        }}
      >
        <div
          styleName={`${'function' === typeof refresh ? '': 'hide'} refresh`}
          className={refreshClass}
        >
          <span
            styleName={refreshIcon}
            style={{ transform: refreshDeg, WebkitTransform: refreshDeg }} 
          />
          <label>{refreshTxt}</label>
        </div>
        <div
          styleName="items"
          style={{height: height}}
          ref={e => this.child = e}
          onScroll={() => this.scroll()}
        >
          {children}
          <div
            styleName={`${'function' === typeof loadNext ? '': 'hide'} loadNext`}
            className={loadNextClass}
          >
            <span styleName={loadNextIcon} />
            <label>{loadNextTxt}</label>
          </div>
        </div>
        <div
          styleName={`${showToTop ? '': 'hide'} toTop`}
          onClick={() => this.toTop()}
          className={toTopClass}
        >
          TOP
        </div>
      </div>
    )
  }
}
