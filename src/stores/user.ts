import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

export class UserStore {
  @observable userInfo = null;
  @computed
  get isLogin(): boolean {
    return !!this.userInfo;
  }
}
