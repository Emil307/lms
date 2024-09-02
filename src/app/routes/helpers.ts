import { Route } from "nextjs-routes";
import { RoleName, Roles } from "@shared/types";
import { adminPaths, managerPaths, publicPaths, studentPaths, teacherPaths } from "./index";

export const isCorrectPath = (regex: string, newUrlPath: string) => new RegExp(`^${regex}`).test(newUrlPath);

export const isPathIncluded = (pathArray: string[], newUrlPath: string) => pathArray.some((path) => isCorrectPath(path, newUrlPath));

export const isAccessAllowed = (userRole: string | undefined, newUrlPath: string) => {
    switch (userRole) {
        case Roles.administrator:
            return isPathIncluded(adminPaths, newUrlPath);
        case Roles.manager:
            return isPathIncluded(managerPaths, newUrlPath);
        case Roles.teacher:
            return isPathIncluded(teacherPaths, newUrlPath);
        case Roles.student:
            return isPathIncluded(studentPaths, newUrlPath);
        default:
            return isPathIncluded(publicPaths, newUrlPath);
    }
};

export const getStartPage = (userRole?: RoleName): Route => {
    switch (userRole) {
        case Roles.administrator:
        case Roles.manager:
        case Roles.teacher:
            return { pathname: "/admin" };
        case Roles.student:
            return { pathname: "/cabinet" };
        default:
            return { pathname: "/" };
    }
};
