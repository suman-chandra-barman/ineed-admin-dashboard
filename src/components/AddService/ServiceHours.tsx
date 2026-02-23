"use client";

import { useState, useEffect, useRef } from "react";
import { ServiceHour } from "@/app/types/service.type";

interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface ServiceHoursProps {
  onChange?: (hours: ServiceHour[]) => void;
  initialHours?: ServiceHour[];
}

export default function ServiceHours({
  onChange,
  initialHours,
}: ServiceHoursProps) {
  const initializedRef = useRef(false);

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: "Sat",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
    {
      day: "Sun",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
    {
      day: "Mon",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
    {
      day: "Tue",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
    {
      day: "Wed",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
    {
      day: "Thu",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
    {
      day: "Fri",
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    },
  ]);

  // Initialize schedule from initialHours prop only once
  useEffect(() => {
    if (initialHours && initialHours.length > 0 && !initializedRef.current) {
      const dayNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
      const newSchedule = initialHours.map((hour, index) => ({
        day: dayNames[hour.day_of_week] || dayNames[index],
        enabled: !hour.is_closed,
        startTime: hour.from_time || "09:00",
        endTime: hour.to_time || "18:00",
      }));
      setSchedule(newSchedule);
      initializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialHours]);

  // Convert schedule to API format and notify parent
  useEffect(() => {
    if (onChange && initializedRef.current) {
      const serviceHours: ServiceHour[] = schedule.map((item, index) => ({
        day_of_week: index,
        from_time: item.startTime,
        to_time: item.endTime,
        is_closed: !item.enabled,
      }));
      onChange(serviceHours);
    }
  }, [schedule, onChange]);

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

            {/* Time */}
            <div className="flex items-center gap-4">
              {/* start time  */}
              <input
                type="time"
                value={item.startTime}
                onChange={(e) => updateTime(index, "startTime", e.target.value)}
                disabled={!item.enabled}
                className="px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              to
              {/* end time  */}
              <input
                type="time"
                value={item.endTime}
                onChange={(e) => updateTime(index, "endTime", e.target.value)}
                disabled={!item.enabled}
                className="px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
