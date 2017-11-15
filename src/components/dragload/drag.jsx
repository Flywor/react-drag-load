import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './drag.scss';

export default class DragLoad extends Component {
  static propTypes = {
    refresh: PropTypes.func,
    loadNext: PropTypes.func,
  };
  static defaultProps = {
    refresh: undefined,
    loadNext: undefined,
  };

  maxOver = 10 * 5  // 触发加载操作的临界值(单位rem)
  scrollRate = 0.3 // 拉动速率
  tStart = 0 // 起点
  loadFlag = false // 标记加载状态 避免重复拉动加载
  refreshFlag = false // 标记是否触发下拉刷新
  nextFlag = false // 标记是否触发上拉加载
  scrollFlag = false // 标记是在滚动中，用于判断是否滚动到底部或者顶部，为true时才能触发上拉加载/下拉刷新
  isTop = false // 标记是否滚动到顶部，用于控制‘返回顶部’按钮的显示(暂无)
  haveData = true // 标记列表是否为空(显示空数据提示)
  dataLength = 0 // 记录列表数据长度(是否还有下一页的判断)
  hasNext = true // 标记是否还有下一页

  componentDidMount(){
    const { drag, child, start, move, end, scroll } = this
    drag.addEventListener('touchstart', start.bind(this), { passive: false })
    drag.addEventListener('touchmove', move.bind(this), {passive: false })
    drag.addEventListener('touchend', end.bind(this), { passive: false })
    child.addEventListener('scroll', scroll.bind(this), { passive: false })
  }

  scroll() {
    this.scrollFlag = false
  }

  start (e) {
    const { loadFlag, refreshIcon, loadNextIcon, drag, tStart, child } = this
    if (loadFlag) {
      // 阻止浏览器默认事件可以使加载的时候无法滑动
      // e.preventDefault()
      return
    }
    if (child.scrollTop === 0 || child.scrollHeight - child.offsetHeight < child.scrollTop + 5){
      this.scrollFlag = true
    }
    refreshIcon.className = ''
    loadNextIcon.className = ''
    this.tStart = e.touches[0].clientY
    this.changeTransition(drag, 'none')
  }

  move (e) {
    const { 
      loadFlag, maxOver, scrollRate, tStart, scrollFlag, hasNext,
      drag, child, refreshIcon, refreshTxt, loadNextIcon, loadNextTxt
    } = this
    if (loadFlag || !this.haveData) {
      // e.preventDefault()
      return
    }
    const tPosition = (tStart - e.touches[0].clientY) * scrollRate
    if (child.scrollTop === 0 && scrollFlag) { // 顶部下拉
      if (tPosition < 0) {
        e.preventDefault() // 阻止滚动条
        if (maxOver < Math.abs(tPosition)) { // 达到临界值进入下拉刷新
          this.refreshFlag = true
          this.changeDeg(refreshIcon, 180);
          refreshTxt.innerText = '释放更新'
        } else {
          this.refreshFlag = false
          this.changeDeg(refreshIcon, 0);
          refreshTxt.innerText = '下拉刷新'
        }
        this.changeY(drag, `${Math.abs(tPosition)}`);
      } else {
        this.refreshFlag = false
      }
    } else if (child.scrollHeight - child.offsetHeight < child.scrollTop + 5 && scrollFlag) { // 底部上拉
      if (tPosition > 0) {
        e.preventDefault()
        if(!hasNext){
          this.nextFlag = false;
          loadNextTxt.innerText = '已加载全部';
          loadNextIcon.className= 'nomore';
        }else if (maxOver < Math.abs(tPosition)) { // 达到临界值进入上拉加载
          this.nextFlag = true;
          this.changeDeg(loadNextIcon, 180);
          loadNextTxt.innerText = '释放加载';
        } else {
          this.nextFlag = false;
          this.changeDeg(loadNextIcon, 0);
          loadNextTxt.innerText = '上拉加载';
        }
        this.changeY(drag, `-${tPosition}`);
      } else {
        this.nextFlag = false;
      }
    } else {
      this.refreshFlag = false;
      this.nextFlag = false;
    }
  }

  end (e) {
    const { 
      maxOver, loadFlag, refreshFlag, nextFlag,
      drag, refreshIcon, refreshTxt, loadNextIcon, loadNextTxt 
    } = this;
    const { refresh, loadNext } = this.props;
    if (loadFlag ) {
      e.preventDefault();
      return;
    }
    this.changeTransition(drag, '330ms')
    if (refreshFlag && typeof refresh === 'function') {
      this.refreshFlag = false;
      this.changeY(drag, `${maxOver}`);
      this.doDragEnd(refreshIcon, refreshTxt, refresh, 0);
    } else if (nextFlag && typeof loadNext === 'function') {
      this.nextFlag = false;
      this.changeY(drag, `-${maxOver}`);
      this.doDragEnd(loadNextIcon, loadNextTxt, loadNext, 1);
    } else {
      this.changeY(drag, 0);
    }
  }

  doDragEnd(icon, txt, callback, dic){
    const { 
      drag
    } = this;
    this.loadFlag = true;
    icon.className = 'loading';
    this.changeDeg(icon, 0);
    txt.innerText = '加载中';
    callback().then(rs => {
      icon.className = 'success';
      txt.innerText = '加载成功';
      if(dic == 1){
        this.changeY(drag, 0);
        this.loadFlag = false;
        const length =  this.props.children.props.children.length;
        this.hasNext = length !== this.dataLength;
        if(this.hasNext){
          this.dataLength = length;
        }
        return;
      }
      this.hasNext  = true;
      this.dataLength = 0;
    }).catch(e=>{
      // 失败处理
      icon.className = 'error'
      txt.innerText = '加载失败'
    }).then(r=>{
      setTimeout(() => {
        this.changeY(drag, 0);
        setTimeout(() => {
          this.changeTransition(drag, 'none')
          this.loadFlag = false
        }, 330);
      }, 1000);
    });
  }

  changeY(drag, y){
    const style = `translate3d(0, ${y}px, 0)`
    this.doTransform(drag, style)
  }

  changeDeg(icon, deg){
    const style = `rotate(${deg}deg)`
    this.doTransform(icon, style)
  }

  doTransform(ele, val){
    ele.style.webkitTransform = val
    ele.style.MozTransform = val
    ele.style.msTransform = val
    ele.style.OTransform = val
    ele.style.transform = val
  }

  changeTransition(e, val){
    e.style.webkitTransition = val
    e.style.MozTransition = val
    e.style.msTransition = val
    e.style.OTransition = val
    e.style.transition = val
  }
  
  render() {
    const { refresh, loadNext, children } = this.props;
    const length =  children.props ? children.props.children.length: children.length;
    this.haveData = length > 0;
    return (
      <div styleName="dragload">
        <div
          ref={e=> {this.drag = e}}
          styleName="drag"
        >
          <div styleName="refresh" style={{ display: typeof refresh === 'function'? 'flex': 'none' }}>
            <div>
              <span ref={e=> {this.refreshIcon = e}}></span>
              <label ref={e=> {this.refreshTxt = e}}></label>
            </div>
          </div>
          <div styleName="items" ref={e=> {this.child = e}}>
            {this.haveData ? children : (<div styleName="noData">没有数据哦</div>) }
          </div>
          <div styleName="loadNext" style={{ display: typeof loadNext === 'function'? 'flex': 'none' }}>
            <div>
              <span ref={e=> {this.loadNextIcon = e}}></span>
              <label ref={e=> {this.loadNextTxt = e}}></label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
