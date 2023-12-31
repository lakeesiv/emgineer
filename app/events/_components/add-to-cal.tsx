"use client";

import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useTheme } from "next-themes";

import React, { FC } from "react";

interface AddToCalProps {
  start: Date;
  duration: number;
  name: string;
  description: string;
  location: string;
  size?: number;
}

const AddToCal: FC<AddToCalProps> = ({
  start,
  duration,
  name,
  description,
  location,
  size = 1,
}) => {
  const { theme } = useTheme();

  // date: YYYY-MM-DD
  // start time: HH:MM 24hr
  const localStartTimeString = new Date(
    start.getTime() - start.getTimezoneOffset() * 60000
  ).toISOString();

  const localStartTime = localStartTimeString
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");

  const localStartDate = localStartTimeString.split("T")[0];

  const localEndTimeString = new Date(
    start.getTime() +
      duration * 60 * 60 * 1000 -
      start.getTimezoneOffset() * 60000
  ).toISOString();

  const localEndTime = localEndTimeString
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");

  const localEndDate = localEndTimeString.split("T")[0];

  return (
    <AddToCalendarButton
      name={name}
      iCalFileName={name}
      description={description}
      startDate={localStartDate}
      startTime={localStartTime}
      endTime={localEndTime}
      endDate={localEndDate}
      timeZone="Europe/London"
      location={location}
      styleDark="--btn-shadow: rgba(0,0,0,0); --btn-shadow-hover: rgba(0,0,0,0); --bth-shadow-active: rgba(0,0,0,0); --list-shadow: rgba(0,0,0,0); --list-shadow-hover: rgba(0,0,0,0); --list-shadow-active: rgba(0,0,0,0);
      --btn-background: rgba(0,0,0,0); --btn-background-hover: rgba(0,0,0,0);"
      styleLight="--btn-shadow: rgba(0,0,0,0); --btn-shadow-hover: rgba(0,0,0,0); --bth-shadow-active: rgba(0,0,0,0); --list-shadow: rgba(0,0,0,0); --list-shadow-hover: rgba(0,0,0,0); --list-shadow-active: rgba(0,0,0,0);
      --btn-background: rgba(0,0,0,0); --btn-background-hover: rgba(0,0,0,0);"
      options="'Google','iCal','Microsoft365'"
      trigger="click"
      hideTextLabelButton
      hideBackground
      hideCheckmark
      size={`${size}`}
      label=" "
      lightMode={theme}
    />
  );
};

export default AddToCal;
