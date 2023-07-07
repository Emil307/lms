import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";
import { NotificationType } from "@entities/notification";

dayjs.extend(updateLocale);
dayjs.extend(calendar);

export const getFormatCreatedAt = (date: Date): string => {
    return dayjs(date).calendar(null, {
        sameDay: "HH:mm", // The same day ( Today at 2:30 AM )
        lastDay: "[Вчера], HH:mm ", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "DD.MM.YYYY",
        sameElse: "DD.MM.YYYY", // Everything else ( 7/10/2011 )
    });
};

export const getNameTypeNotification = (type: NotificationType): string => {
    switch (type) {
        case "supportMessage":
            return "Новое сообщение";
        default:
            return "";
    }
};
