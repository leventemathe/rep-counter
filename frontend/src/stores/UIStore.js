import { observable, decorate } from 'mobx';

export default class UIStore {
  lastOpenList = '0';
}

decorate(UIStore, {
  lastOpenList: observable,
});
