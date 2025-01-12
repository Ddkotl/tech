"use client";

import { useEffect, useState } from "react";

export const TimeAgo = ({ date }: { date: Date }) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!currentTime) {
    return <span>Загрузка...</span>; // Показываем текст, пока не загрузилось текущее время
  }
  const timeDiff = currentTime.getTime() - new Date(date).getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    // Если прошло более 24 часов, показываем дату в формате день/месяц/год
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы начинаются с 0
    const year = date.getFullYear();
    return (
      <span>{`${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`}</span>
    );
  }

  if (hours >= 1) {
    // Если прошло меньше 24 часов, показываем количество часов назад
    if (hours >= 2 && hours <= 4) {
      return <span>{`${hours} часа назад`}</span>;
    }
    return <span>{`${hours} час${hours > 1 ? "ов" : ""} назад`}</span>;
  }

  if (minutes >= 1) {
    // Если прошло меньше часа, показываем количество минут назад
    if (minutes === 1) {
      return <span>{`${minutes} минуту назад`}</span>;
    }
    if (minutes >= 2 && minutes <= 4) {
      return <span>{`${minutes} минуты назад`}</span>;
    }

    return <span>{`${minutes} минут назад`}</span>;
  }

  // Если прошло меньше минуты, показываем "менее минуты назад"
  return <span>Только что</span>;
};
