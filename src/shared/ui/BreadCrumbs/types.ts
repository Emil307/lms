import { Route } from "nextjs-routes";

export type TBreadCrumbItem = {
    title: string;
    href: Route;
    maxWidth?: number | string;
};
