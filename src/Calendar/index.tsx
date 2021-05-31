import React from 'react';
import CalendarBody from './components/CalendarBody';
import CalendarHeader from './components/CalendarHeader';
import { initObserver } from './lib/utils';
import { Subject } from './lib/subject';

export default ({ weekLabelIndex = 1 }: { weekLabelIndex: number }) => {
  let calendarObserver: Subject = initObserver();
  debugger;

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
