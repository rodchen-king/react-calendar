/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-05-31 23:27:57
 * @LastEditTime: 2021-06-01 09:43:30
 * @LastEditors: rodchen
 */
import React from 'react';
import CalendarBody from './components/CalendarBody';
import CalendarHeader from './components/CalendarHeader';
import { initObserver } from './lib/utils';
import { Subject } from './lib/subject';

export default ({ weekLabelIndex = 1 }: { weekLabelIndex: number }) => {
  let calendarObserver: Subject = initObserver();

  return (
    <div>
      <CalendarHeader observer={calendarObserver} />
      <CalendarBody
        observer={calendarObserver}
        weekLabelIndex={weekLabelIndex}
      />
    </div>
  );
};
