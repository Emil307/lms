export const authPath = "/auth";

export const logoutPath = "/logout";

export const notFoundPath = "/404";
export const serverErrorPath = "/500";

export const errorPaths = [notFoundPath, serverErrorPath];

export const authPaths = ["/auth"];

export const publicPaths = [
    "/$",
    "/courses$",
    "/courses/(\\d+|\\[\\w+])$",
    "/course-collections",
    "/course-packages",
    "/about",
    "/faq",
    "/contacts",
    "/user-agreement",
];

export const studentPaths = publicPaths.concat([
    "/profile",
    "/courses/favorite",
    "/articles",
    "/my-courses",
    "/transactions",
    "/support",
    "/cabinet",
]);

export const teacherPaths = studentPaths.concat([
    "/admin$",
    "/admin/students$",
    "/admin/students/(\\d+|\\[\\w+])$",
    "/admin/students/(\\d+|\\[\\w+])/statistics/(\\d+|\\[\\w+])$",
    "/admin/groups$",
    "/admin/groups/(\\d+|\\[\\w+])$",
    "/admin/groups/(\\d+|\\[\\w+])/statistics/(\\d+|\\[\\w+])$",
    "/admin/courses$",
    "/admin/courses/(\\d+|\\[\\w+])$",
    "/admin/courses/(\\d+|\\[\\w+])/statistics",
    "/admin/courses/(\\d+|\\[\\w+])/modules/(\\d+|\\[\\w+])$",
    "/admin/courses/(\\d+|\\[\\w+])/modules/(\\d+|\\[\\w+])/lessons/(\\d+|\\[\\w+])$",
    "/admin/lessons$",
    "/admin/lessons/(\\d+|\\[\\w+])$",
    "/admin/articles$",
    "/admin/articles/(\\d+|\\[\\w+])$",
    "/admin/homeworks",
]);

export const managerPaths = teacherPaths.concat([
    "/admin/articles",
    "/admin/courses",
    "/admin/groups",
    "/admin/lessons",
    "/admin/messages",
    "/admin/static-pages",
    "/admin/students",
    "/admin/transactions",
    "/admin/users",
    "/admin/analytics",
]);

export const adminPaths = managerPaths.concat(["/admin/settings"]);

export const allPaths = adminPaths.concat(authPaths).concat([logoutPath]);
