/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-05-31 23:54:53
 * @LastEditTime: 2021-06-01 00:14:09
 * @LastEditors: rodchen
 */

import { ObserverItem } from '../type/LibType';

/*
 * Subject
 * 内部创建了三个方法，内部维护了一个ObserverList。
 */

export class Subject {
  private _observers = new ObserverList();

  // addObserver: 调用内部维护的ObserverList的add方法
  public addObserver(observer: Observer) {
    this._observers.add(observer);
  }

  // removeObserver: 调用内部维护的ObserverList的removeat方法
  public removeObserver(observer: Observer) {
    this._observers.removeAt(this._observers.indexOf(observer, 0));
  }

  // notify: 通知函数，用于通知观察者并且执行update函数，update是一个实现接口的方法，是一个通知的触发方法。
  public notify(context: any) {
    let observerCount = this._observers.count();
    for (let i = 0; i < observerCount; i++) {
      (<Observer>this._observers.get(i)).update(context);
    }
  }
}

/*
 * ObserverList
 * 内部维护了一个数组，4个方法用于数组的操作，这里相关的内容还是属于subject，因为ObserverList的存在是为了将subject和内部维护的observers分离开来，清晰明了的作用。
 */
class ObserverList {
  private _observerList: Observer[] = [];

  public add(obj: Observer) {
    return this._observerList.push(obj);
  }

  public count() {
    return this._observerList.length;
  }

  public get(index: number) {
    if (index > -1 && index < this._observerList.length) {
      return this._observerList[index];
    }

    throw new Error(`_observerList ${index} 未知为null`);
  }

  public indexOf(obj: Observer, startIndex: number) {
    let i = startIndex;

    while (i < this._observerList.length) {
      if (this._observerList[i] === obj) {
        return i;
      }
      i++;
    }

    return -1;
  }

  public removeAt(index: number) {
    this._observerList.splice(index, 1);
  }
}

export class Observer {
  public update: Function = () => {};
}
