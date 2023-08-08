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
  const dateString = start.toISOString().split("T")[0];
  // start time: HH:MM 24hr
  const localStartTime = new Date(
    start.getTime() - start.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");
  const localEndTime = new Date(
    start.getTime() +
      duration * 60 * 60 * 1000 -
      start.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");

  return (
    <AddToCalendarButton
      name={name}
      description={description}
      startDate={dateString}
      startTime={localStartTime}
      endTime={localEndTime}
      timeZone="Europe/London"
      location={location}
      styleDark="--btn-shadow: none; --btn-shadow-hover: none; --bth-shadow-active: none; --list-shadow: none; --list-shadow-hover: none; --list-shadow-active: none;
      --btn-background: var(--background); --btn-background-hover: var(--foreground);"
      styleLight="--btn-shadow: none; --btn-shadow-hover: none; --bth-shadow-active: none; --list-shadow: none; --list-shadow-hover: none; --list-shadow-active: none;
      --btn-background: var(--background); --btn-background-hover: var(--foreground);"
      options="'Apple','Google','iCal'"
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
