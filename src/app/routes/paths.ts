export const authPath = "/auth";

export const logoutPath = "/logout";

export const notFoundPath = "/404";

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
    "/admin/students$",
    "/admin/students/(\\d+|\\[\\w+])$",
    "/admin/groups$",
    "/admin/groups/(\\d+|\\[\\w+])$",
    "/admin/courses$",
    "/admin/courses/(\\d+|\\[\\w+])$",
    "/admin/courses/(\\d+|\\[\\w+])/module/(\\d+|\\[\\w+])$",
    "/admin/courses/(\\d+|\\[\\w+])/module/(\\d+|\\[\\w+])/lesson/(\\d+|\\[\\w+])$",
    "/admin/homeworks",
    //TODO: аналитика
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
]);

export const allPaths = managerPaths.concat(authPaths).concat([logoutPath]);
