import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.locale("ru");
dayjs.extend(calendar);

export const getFormatCreatedAt = (date: Date): string => {
    return dayjs(date).calendar(null, {
        sameDay: "Сегодня", // The same day ( Today at 2:30 AM )
        lastDay: "Вчера", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "D MMM, dddd",
        sameElse: "DD/MM/YYYY", // Everything else ( 7/10/2011 )
    });
};
