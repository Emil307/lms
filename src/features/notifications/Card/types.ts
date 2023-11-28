import { Route } from "nextjs-routes";
import { NotificationUser } from "@entities/notification";

export type NotificationData = {
    userData: NotificationUser;
    title: string;
    content: string;
    link: Route;
};
