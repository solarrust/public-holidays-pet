import React from "react";
import { Holiday } from "@/types";
import { format } from "date-fns";

export default function Results({
  holidaysList,
  today,
}: {
  holidaysList: Holiday[];
  today: string;
}) {
  const formattedHolidaysList = holidaysList
    .map((item) => {
      const englishName =
        item.name.find((n) => n.language === "EN")?.text || "";
      let isToday: boolean = false;

      if (item.startDate.toString() === today) {
        isToday = true;
      }

      return {
        ...item,
        name: englishName,
        isToday,
      };
    })
    .filter((item) => item.nationwide);

  const holidaysBeforeToday = formattedHolidaysList.filter(
    (item) => item.startDate.toString() < today
  );

  const holidaysAfterToday = formattedHolidaysList.filter(
    (item) => item.startDate.toString() >= today
  );

  return (
    <>
      <div className="join join-vertical w-full mt-8">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Holidays before today
          </div>
          <div className="collapse-content">
            <ul className="grid gap-2 mt-8 text-2xl">
              {holidaysBeforeToday.map((item: any) => (
                <li key={item.id}>
                  <span className="font-bold">
                    {format(item.startDate, "d MMMM yyyy, EEEE")}
                  </span>{" "}
                  — {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Holidays today and after
          </div>
          <div className="collapse-content">
            <ul className="grid gap-2 mt-8 text-2xl">
              {holidaysAfterToday.map((item: any) => (
                <li key={item.id}>
                  <span className="font-bold">
                    {format(item.startDate, "d MMMM yyyy, EEEE")}{" "}
                    {item.isToday ? "(Today)" : null}
                  </span>{" "}
                  — {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
