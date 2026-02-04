"use client";

import { useState } from "react";

interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  startPeriod: string;
  endTime: string;
  endPeriod: string;
}

export default function ServiceHours() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: "Sat",
      enabled: true,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "am",
    },
    {
      day: "Sun",
      enabled: false,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "pm",
    },
    {
      day: "Mon",
      enabled: false,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "pm",
    },
    {
      day: "Tue",
      enabled: false,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "pm",
    },
    {
      day: "Wed",
      enabled: false,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "pm",
    },
    {
      day: "Thu",
      enabled: false,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "pm",
    },
    {
      day: "Fri",
      enabled: false,
      startTime: "00:00",
      startPeriod: "am",
      endTime: "00:00",
      endPeriod: "pm",
    },
  ]);

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setSchedule(newSchedule);
  };

  const updateTime = (
    index: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const updatePeriod = (
    index: number,
    field: "startPeriod" | "endPeriod",
    value: string,
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Service Hours
      </h2>

      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div key={item.day} className="flex items-center gap-3">
            {/* Checkbox and Day */}
            <label className="flex items-center gap-2 w-16 cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => toggleDay(index)}
                className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {item.day}
              </span>
            </label>

            {/* Start Time */}
            <div className="flex items-center gap-1 flex-1">
              <input
                type="time"
                value={item.startTime}
                onChange={(e) => updateTime(index, "startTime", e.target.value)}
                disabled={!item.enabled}
                className="px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed w-24"
              />
              <select
                value={item.startPeriod}
                onChange={(e) =>
                  updatePeriod(index, "startPeriod", e.target.value)
                }
                disabled={!item.enabled}
                className="px-2 py-1.5 bg-orange-50 border border-orange-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>

            {/* End Time */}
            <div className="flex items-center gap-1 flex-1">
              <input
                type="time"
                value={item.endTime}
                onChange={(e) => updateTime(index, "endTime", e.target.value)}
                disabled={!item.enabled}
                className="px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed w-24"
              />
              <select
                value={item.endPeriod}
                onChange={(e) =>
                  updatePeriod(index, "endPeriod", e.target.value)
                }
                disabled={!item.enabled}
                className="px-2 py-1.5 bg-orange-50 border border-orange-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
