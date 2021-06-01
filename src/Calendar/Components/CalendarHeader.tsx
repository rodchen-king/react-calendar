/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-05-31 23:54:30
 * @LastEditTime: 2021-06-01 09:42:40
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
  const observerNotify = (currentFirstDayOfMonth: Date) => {
    setHeaderContent(getHeaderContent(currentFirstDayOfMonth));
    observer.notify(currentFirstDayOfMonth);
  };

  /**
   * 页面操作
   */
  const goPrev = () => {
    const preFirstDayOfMonth = getFirstDayOfPrevMonth(firstDayOfMonth);
    setFirstDayOfMonth(preFirstDayOfMonth);
    observerNotify(preFirstDayOfMonth);
  };

  const goNext = () => {
    const nextFirstDayOfMonth = getFirstDayOfNextMonth(firstDayOfMonth);

    setFirstDayOfMonth(nextFirstDayOfMonth);
    observerNotify(nextFirstDayOfMonth);
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
