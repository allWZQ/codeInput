import { ContextStore } from './context';
export class GlobalStores {
  static instance: GlobalStores = null;
  contextStore: ContextStore = new ContextStore();
  constructor() {
    if (GlobalStores.instance) {
      return GlobalStores.instance;
    }
    GlobalStores.instance = this;
    return this;
  }
}
