// import { useCallback } from 'react';

// type Props = {
//   selectedDates: Date[];
//   setSelectedDates: (dates: Date[] | ((d: Date[]) => Date[])) => void;
//   baseYear?: number;
//   baseMonth?: number;  // 0-indexed: 0 = Jan, 10 = Nov
// };

// const normalize = (year: number, month: number, day: number) =>
//   new Date(year, month, day, 0, 0, 0, 0);

// export const useDateSelection = ({
//   selectedDates,
//   setSelectedDates,
//   baseYear = 2025,
//   baseMonth = 10,
// }: Props) => {
//   const toTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();

//   const handleSelectDate = useCallback(
//     (day: number) => {
//       const clicked = normalize(baseYear, baseMonth, day);

//       setSelectedDates((prev) => {
//         const prevTimes = prev.map((d) => toTime(d));

//         if (prev.length === 0) {
//           return [clicked];
//         }

//         if (prev.length === 1) {
//           const single = prev[0];
//           if (toTime(single) === toTime(clicked)) {
//             // toggle off
//             return [];
//           }
//           const sorted = [single, clicked].sort((a, b) => a.getTime() - b.getTime());
//           return sorted;
//         }

//         // prev is a range (>=2). Make explicit behavior:
//         // - clicking an endpoint toggles selection to that single day
//         // - clicking outside range -> start new single selection
//         // - clicking inside range -> reset to single clicked
//         const first = prev[0];
//         const last = prev[prev.length - 1];
//         const tClicked = toTime(clicked);
//         const tFirst = toTime(first);
//         const tLast = toTime(last);

//         if (tClicked === tFirst || tClicked === tLast) {
//           return [clicked];
//         }

//         // clicking anywhere else resets to single clicked
//         return [clicked];
//       });
//     },
//     [baseYear, baseMonth, setSelectedDates],
//   );

//   const isDateSelected = useCallback(
//     (day: number) => {
//       if (!selectedDates || selectedDates.length === 0) return false;
//       const dayDate = normalize(baseYear, baseMonth, day).getTime();

//       if (selectedDates.length >= 2) {
//         const first = selectedDates[0];
//         const last = selectedDates[selectedDates.length - 1];
//         const tFirst = toTime(first);
//         const tLast = toTime(last);
//         return dayDate >= tFirst && dayDate <= tLast;
//       }

//       return selectedDates.some((d) => toTime(d) === dayDate);
//     },
//     [selectedDates, baseYear, baseMonth],
//   );

//   const isFirstSelected = useCallback(
//     (day: number) =>
//       selectedDates.length > 0 && toTime(selectedDates[0]) === normalize(baseYear, baseMonth, day).getTime(),
//     [selectedDates, baseYear, baseMonth],
//   );

//   const isLastSelected = useCallback(
//     (day: number) =>
//       selectedDates.length > 1 &&
//     toTime(selectedDates[selectedDates.length - 1]) === normalize(baseYear, baseMonth, day).getTime(),
//     [selectedDates, baseYear, baseMonth],
//   );

//   return { handleSelectDate, isDateSelected, isFirstSelected, isLastSelected };
// };

// /**
//  * Copyright 2024 Google LLC
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *      http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

import { useCallback } from 'react';

type Props = {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
};

export const useDateSelection = ({
  selectedDates,
  setSelectedDates,
}: Props) => {
  const handleSelectDate = useCallback(
    (day: number) => {
      const newDate = new Date(2025, 10, day);
      const newDates = (() => {
        const existingIndex = selectedDates.findIndex(
          (date) => date.getDate() === day,
        );

        if (selectedDates.length > 0) {
          if (day < selectedDates[0].getDate()) {
            return [newDate];
          } else if (existingIndex === -1 && selectedDates.length === 1) {
            return [selectedDates[0], newDate];
          }
        }

        return [newDate];
      })();
      setSelectedDates(newDates);
    },
    [selectedDates, setSelectedDates],
  );

  const isDateSelected = useCallback(
    (day: number) => {
      const dayDate = new Date(2025, 10, day);
      if (selectedDates.length >= 2) {
        const firstDate = selectedDates[0];
        const lastDate = selectedDates[selectedDates.length - 1];
        return dayDate >= firstDate && dayDate <= lastDate;
      }
      return selectedDates.some((date) => date.getDate() === day);
    },
    [selectedDates],
  );

  const isFirstSelected = useCallback(
    (day: number) =>
      selectedDates.length > 0 && selectedDates[0].getDate() === day,
    [selectedDates],
  );

  const isLastSelected = useCallback(
    (day: number) =>
      selectedDates.length > 1 &&
      selectedDates[selectedDates.length - 1].getDate() === day,
    [selectedDates],
  );

  return { handleSelectDate, isDateSelected, isFirstSelected, isLastSelected };
};
