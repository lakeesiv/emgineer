"use client";
// TODO: Validate time works with timezones

import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useTheme } from "next-themes";

import React, { FC } from "react";

interface AddToCalProps {
  start: Date;
  duration: number;
  name: string;
  description: string;
  location: string;
}

const AddToCal: FC<AddToCalProps> = ({
  start,
  duration,
  name,
  description,
  location,
}) => {
  const { theme } = useTheme();

  // date: YYYY-MM-DD
  const dateString = start.toISOString().split("T")[0];
  // start time: HH:MM 24hr
  const startTime = start
    .toISOString()
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");
  // end time: HH:MM 24hr
  const endTime = new Date(start.getTime() + duration * 60 * 60 * 1000)
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
      startTime={startTime}
      endTime={endTime}
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
      size="1"
      label=" "
      lightMode={theme}
    />
  );
};

export default AddToCal;
