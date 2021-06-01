/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-05-31 23:54:13
 * @LastEditTime: 2021-06-01 09:35:33
 * @LastEditors: rodchen
 */
import React, { useEffect, useCallback, useState } from 'react';
import { Subject } from '../lib/subject';
import {
  getFirstDayOfMonth,
  getFirstDayOfCalendar,
  formatDayWithTwoWords,
  isCurrentMonth,
  isCurrentDay,
  getWeekLabelList,
} from '../lib/utils';
import './calenderBody.less';

interface DayItem {
  date: Date;
  monthDay: number | string;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
}

export default ({
  observer,
  weekLabelIndex = 1,
}: {
  observer: Subject;
  weekLabelIndex?: number;
}) => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [weekList, setWeekList] = useState<DayItem[][]>([]);
  const [weekLabelArray, setWeekLabelArray] = useState<string[]>([]);

  useEffect(() => {
    // 注册观察者对象
    observer.addObserver({
      update: update,
    });

    // 设置当前月的第一天，用来数据初始话以及进行日期是否为当前月判断
    setFirstDayOfMonth(getFirstDayOfMonth(new Date()));

    // 设置每周label标识数据
    setWeekLabelArray(getWeekLabelList(weekLabelIndex));

    // 初始设置当前月日历数据
    setWeekListValue(firstDayOfMonth);
  }, []);

  /**
   * 日历方法
   */
  // 点击日历
  const onClickDay = (dayItem: DayItem) => {
    // this.$emit('dayClick', dayItem)
  };

  // 设置weekList值
  const setWeekListValue = (firstDayOfmonth: Date) => {
    let newWeekList = [];
    let dayOfCalendar = getFirstDayOfCalendar(firstDayOfmonth, weekLabelIndex);

    // 遍历层数为6，因为日历显示当前月数据为6行
    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      let weekItem = [];
      // 每一周为7天
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        let dayItem: DayItem = {
          date: dayOfCalendar,
          monthDay: formatDayWithTwoWords(dayOfCalendar.getDate()),
          isCurrentMonth: isCurrentMonth(firstDayOfMonth, dayOfCalendar),
          isCurrentDay: isCurrentDay(dayOfCalendar),
        };
        weekItem.push(dayItem);

        // 当前日期加1，以此类推得到42条记录
        dayOfCalendar.setDate(dayOfCalendar.getDate() + 1);
      }

      newWeekList.push(weekItem);

      setWeekList(newWeekList);
    }
  };

  /**
   * 观察者模式相关方法
   */
  // 切换月份更新body数据
  const update = (content: Date) => {
    setFirstDayOfMonth(content);
    setWeekListValue(content);
  };

  /**
   * 工具方法
   */
  // 周六/周日标识红色字体
  const isShowRedColorForWeekLable = (index: number) => {
    return (
      index + weekLabelIndex === 6 ||
      index + weekLabelIndex === 7 ||
      (index === 0 && weekLabelIndex === 0)
    );
  };

  return (
    <div className="calendar-body">
      {/* <!-- 日历周label标识 --> */}
      <div className="calendar-body-week-label">
        {weekLabelArray.map((item, index) => (
          <div
            className={`calendar-body-week-label-day ${
              isShowRedColorForWeekLable(index) ? 'red-font' : ''
            }`}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
      {/* <!-- 日历数据，遍历日历二位数组，得到每一周数据 --> */}
      {weekList.map((weekItem: DayItem[]) => (
        <div className="calendar-body-week">
          {/* <!-- 遍历每一周数据 --> */}
          {weekItem.map((dayItem: DayItem, index: number) => (
            <div
              className={`calendar-body-week-day ${
                dayItem.isCurrentMonth ? 'calendar-body-current-month' : ''
              } ${dayItem.isCurrentDay ? 'calendar-body-current-day' : ''} ${
                isShowRedColorForWeekLable(index) ? 'red-font' : ''
              }`}
              onClick={() => onClickDay(dayItem)}
            >
              <span>{dayItem.monthDay}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
