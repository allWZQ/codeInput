class Drag {
  disX: number;
  disY: number;
  box: Element;
  m: any;
  u: any;
  title: Element;
  constructor(id, title) {
    this.disX = 0;
    this.disY = 0;
    this.box = document.getElementsByClassName(id)[0];
    this.title = document.getElementById(title);
    this.m = this.move.bind(this);
    this.u = this.up.bind(this);
  }
  init() {
    this.title.addEventListener('mousedown', this.down.bind(this));
    this.box.style.width = 'auto';
    this.box.style.position = 'absolute';
    this.box.style.left = (window.innerWidth - this.box.offsetWidth) / 2 + 'px';
    return '绑定成功';
  }
  down(ev) {
    this.disX = ev.pageX - this.box.offsetLeft;
    this.disY = ev.pageY - this.box.offsetTop;
    document.addEventListener('mousemove', this.m);
    document.addEventListener('mouseup', this.u);
  }
  move(ev) {
    this.box.style.left = ev.pageX - this.disX + 'px';
    this.box.style.top = ev.pageY - this.disY + 'px';
    // 防止拖出窗口
    if (this.box.offsetLeft <= 0) {
      this.box.style.left = 0 + 'px';
    }
    if (this.box.offsetLeft >= window.innerWidth - this.box.offsetWidth) {
      this.box.style.left = window.innerWidth - this.box.offsetWidth + 'px';
    }
    if (this.box.offsetTop <= 0) {
      this.box.style.top = 0 + 'px';
    }
    // if (this.box.offsetTop >= window.innerHeight - this.box.offsetHeight) {
    //   this.box.style.top = window.innerHeight - this.box.offsetHeight + 'px';
    // }
  }
  up() {
    document.removeEventListener('mousemove', this.m);
    document.removeEventListener('mouseup', this.u);
  }
}

export default Drag;
