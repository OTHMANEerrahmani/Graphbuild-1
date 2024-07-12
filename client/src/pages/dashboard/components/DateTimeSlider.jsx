import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import { format, parseISO } from "date-fns";

const DateTimeSlider = ({
  data,
  dateRangeSince,
  setDateRangeSince, // Corrected prop name
  dateRangeUntil,
  setDateRangeUntil,
}) => {
  if (!data?.insights?.data || data.insights.data.length === 0) {
    return null;
  }

  const initialStartDate = parseISO(data.insights.data[0].date_start);
  const initialEndDate = parseISO(
    data.insights.data[data.insights.data.length - 1].date_stop
  );

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const onSliderChange = ([start, end]) => {
    setStartDate(new Date(start));
    setEndDate(new Date(end));

    setDateRangeSince(format(startDate, "yyyy-MM-dd"));
    setDateRangeUntil(format(endDate, "yyyy-MM-dd"));


  };

  return (
    <div className="flex flex-col space-y-4 w-44">
      <div className="flex flex-row justify-between text-sm">
        <div>{format(startDate, "yyyy-MM-dd")}</div>
        <div>{format(endDate, "yyyy-MM-dd")}</div>
      </div>
      <Slider
        className="w-full h-2 bg-gray-200 rounded-full flex items-center"
        thumbClassName="w-4 h-4 bg-blue-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
        trackClassName="bg-blue-300 h-2 rounded-full"
        value={[startDate.getTime(), endDate.getTime()]}
        min={initialStartDate.getTime()}
        max={initialEndDate.getTime()}
        onChange={onSliderChange}
        renderThumb={(props, state) => <div {...props} />}
      />
    </div>
  );
};

export default DateTimeSlider;
