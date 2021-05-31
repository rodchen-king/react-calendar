/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-05-31 23:54:30
 * @LastEditTime: 2021-06-01 02:10:14
 * @LastEditors: rodchen
 */
import React, { useEffect, useCallback, useState } from 'react';
import { Subject } from '../lib/subject';
import {
  getHeaderContent,
  getFirstDayOfMonth,
  getFirstDayOfNextMonth,
  getFirstDayOfPrevMonth,
} from '../lib/utils';
import './calenderHeader.less';

export default ({ observer }: { observer: Subject }) => {
  // 页面绑定数据
  const [headerContent, setHeaderContent] = useState<string>('');
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(new Date());

  let leftArrow = '<';
  let rightArrow = '>';

  useEffect(() => {
    setHeaderContent(getHeaderContent(new Date()));
    setFirstDayOfMonth(new Date());
  }, []);

  /**
   * 主题发布信息，通知观察者
   */
  const observerNotify = () => {
    setHeaderContent(getHeaderContent(firstDayOfMonth));
    observer.notify(firstDayOfMonth);
  };

  /**
   * 页面操作
   */
  const goPrev = () => {
    setFirstDayOfMonth(getFirstDayOfPrevMonth(firstDayOfMonth));
    observerNotify();
  };

  const goNext = () => {
    setFirstDayOfMonth(getFirstDayOfNextMonth(firstDayOfMonth));
    observerNotify();
  };

  return (
    <div className="calendar-header">
      <div className="header-center">
        <span className="prev-month" onClick={goPrev}>
          {leftArrow}
        </span>
        <span className="title">{headerContent}</span>
        <span className="next-month" onClick={goNext}>
          {rightArrow}
        </span>
      </div>
    </div>
  );
};
