import React from "react";
import { FrequencyUnit } from "types";

interface ChoreProgressBarProps {
  recurrence: number;
  frequencyUnit: FrequencyUnit;
  dueDate: Date;
}

const ChoreProgressBar: React.FC<ChoreProgressBarProps> = ({
  recurrence,
  frequencyUnit,
  dueDate
}) => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const currentDate = new Date().getTime(); // Get current timestamp
  const dueDateObj = dueDate.getTime(); // Get dueDate timestamp
  const timeDifference = dueDateObj - currentDate;
  const daysUntilChoreIsDue = Math.ceil(timeDifference / MS_PER_DAY);
  let choreRecurrenceInDays = 0;

  switch (frequencyUnit) {
    case "days":
      choreRecurrenceInDays = recurrence;
      break;
    case "weeks":
      choreRecurrenceInDays = recurrence * 7;
      break;
    case "months":
      choreRecurrenceInDays = recurrence * 30;
      break;
    default:
      break;
  }

  const isChoreDue = daysUntilChoreIsDue <= 0;
  const progressPercentage = isChoreDue
    ? 100
    : daysUntilChoreIsDue >= choreRecurrenceInDays
    ? 0
    : ((choreRecurrenceInDays - daysUntilChoreIsDue) / choreRecurrenceInDays) * 100;

  const getColor = () => {
    const hue = (100 - progressPercentage) * 1.2; // Scale hue from 120 to 0
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "lightgrey",
          height: "20px",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: getColor(),
            height: "100%"
          }}
        />
      </div>
      {daysUntilChoreIsDue >= 0 ? (
        <p>Days until chore is due: {daysUntilChoreIsDue} {daysUntilChoreIsDue === 1 ? "day" : "days"}</p>
      ) : (
        <p>Chore was due {Math.abs(daysUntilChoreIsDue)} {Math.abs(daysUntilChoreIsDue) === 1 ? "day" : "days"} ago</p>
      )}
    </div>
  );
};

export default ChoreProgressBar;
