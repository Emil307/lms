import { managerPaths, publicPaths, studentPaths, teacherPaths } from "./index";
import { Roles } from "./roles";

export const isCorrectPath = (regex: string, newUrlPath: string) => new RegExp(`^${regex}`).test(newUrlPath);

export const isPathIncluded = (pathArray: string[], newUrlPath: string) => pathArray.some((path) => isCorrectPath(path, newUrlPath));

export const isAccessAllowed = (userRole: number, newUrlPath: string) => {
    switch (userRole) {
        case Roles.administrator:
            return true;
        case Roles.manager:
            return isPathIncluded(managerPaths, newUrlPath);
        case Roles.teacher:
            return isPathIncluded(teacherPaths, newUrlPath);
        case Roles.employee:
        case Roles.student:
            return isPathIncluded(studentPaths, newUrlPath);
        default:
            return isPathIncluded(publicPaths, newUrlPath);
    }
};
