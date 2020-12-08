import { observable, action } from 'mobx';
import * as H from 'history';

export class ContextStore {
  static BUFFER_TIME = 0.3 * 1000;
  @observable history: H.History;
  @observable isBufferring: boolean;
  @action
  setHistory = (history: H.History) => {
    this.history = history;
  };

  /**
   * 开始启动缓冲器，防止重复点击的重复跳转
   */
  startBuffer = () => {
    this.isBufferring = true;
    setTimeout(() => {
      this.isBufferring = false;
    }, ContextStore.BUFFER_TIME);
  };

  @action
  goBack = () => {
    if (this.isBufferring) {
      return;
    }
    this.startBuffer();
    this.history?.goBack();
  };

  @action
  push = (url: string, noShareMemory?: boolean) => {
    this.startBuffer();
    if (noShareMemory) {
      window.open(url);
    } else {
      this.history.push(url);
    }
  };
}
