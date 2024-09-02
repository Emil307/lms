import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";
import { Route } from "nextjs-routes";
import { NotificationFromList, NotificationHomeworkMessageType, NotificationSupportMessageType } from "@entities/notification";
import { ADMIN_MESSAGES_QUERY_SEARCH_NAME, ADMIN_MESSAGES_QUERY_SELECT_NAME } from "@entities/support";
import { getFullName } from "@shared/utils";
import { RoleName, Roles } from "@shared/types";
import { NotificationData } from "./types";

dayjs.extend(updateLocale);
dayjs.extend(calendar);

export const getFormatCreatedAt = (date: Date): string => {
    return dayjs(date).calendar(null, {
        sameDay: "HH:mm", // The same day ( Today at 2:30 AM )
        lastDay: "[Вчера], HH:mm ", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "DD.MM.YYYY, HH:mm",
        sameElse: "DD.MM.YYYY, HH:mm", // Everything else ( 7/10/2011 )
    });
};

const getHomeworkMessageLink = (data: NotificationHomeworkMessageType, userRole?: RoleName): Route => {
    switch (userRole) {
        case Roles.administrator:
        case Roles.manager:
        case Roles.teacher:
            return {
                pathname: "/admin/homeworks/[id]",
                query: { id: String(data.homeworkAnswerId), tab: "chat" },
            };
        default:
            return {
                pathname: "/my-courses/[id]/lessons/[lessonId]",
                query: { id: String(data.groupId), lessonId: String(data.lessonId), tab: "homework" },
            };
    }
};

const getSupportMessageLink = (data: NotificationSupportMessageType, userRole?: RoleName): Route => {
    switch (userRole) {
        case Roles.administrator:
        case Roles.manager:
        case Roles.teacher:
            return {
                pathname: "/admin/messages",
                query: {
                    [ADMIN_MESSAGES_QUERY_SEARCH_NAME]: getFullName({ data: data.sender.profile }),
                    [ADMIN_MESSAGES_QUERY_SELECT_NAME]: String(data.sender.id),
                },
            };
        default:
            return {
                pathname: "/support",
            };
    }
};

export const prepareNotificationData = (data: NotificationFromList, userRole?: RoleName): NotificationData => {
    switch (data.type) {
        case "groupAdded":
            return {
                title: "Открыт доступ к курсу",
                content: data.course.name,
                userData: data.teacher,
                link: {
                    pathname: "/my-courses/[id]",
                    query: { id: String(data.groupId) },
                },
            };
        case "invoiceForPayment":
            return {
                title: "Сформирован счет на оплату",
                content: data.entity.name,
                userData: data.student,
                link: {
                    pathname: "/admin/transactions",
                },
            };
        case "newHomework":
            return {
                title: "Новое домашнее задание",
                content: data.lessonName,
                userData: data.sender,
                link: {
                    pathname: "/admin/homeworks/[id]",
                    query: { id: String(data.homeworkAnswerId) },
                },
            };
        case "homeworkChecked":
            return {
                title: "Домашнее задание проверено",
                content: data.lessonName,
                userData: data.sender,
                link: {
                    pathname: "/my-courses/[id]/lessons/[lessonId]",
                    query: { id: String(data.groupId), lessonId: String(data.lessonId) },
                },
            };
        case "homeworkMessage":
            return {
                title: "Новое сообщение",
                content: data.content,
                userData: data.sender,
                link: getHomeworkMessageLink(data, userRole),
            };
        case "supportMessage":
            return {
                title: "Новое сообщение",
                content: data.message,
                userData: data.sender,
                link: getSupportMessageLink(data, userRole),
            };
    }
};
