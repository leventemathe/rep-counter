import { observable, decorate } from 'mobx';

export default class UIStore {
  lastOpenList = '0';

  error = '';
}

decorate(UIStore, {
  lastOpenList: observable,
  error: observable,
});
