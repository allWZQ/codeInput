import { MobXProviderContext } from 'mobx-react';
import React from 'react';
export function useStores() {
  return React.useContext(MobXProviderContext);
}

export function useInjectedStore(name: string) {
  let mobxContext = React.useContext(MobXProviderContext);
  return mobxContext[name] || null;
}
