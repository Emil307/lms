export const authPath = "/auth";

export const logoutPath = "/logout";

export const authPaths = ["/auth"];

export const publicPaths = [
    "/$",
    "/courses$",
    "/courses/\\d+",
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
    "/admin/students/\\d+",
    "/admin/groups$",
    "/admin/groups/\\d+",
    "/admin/courses$",
    "/admin/courses/\\d+$",
    "/admin/courses/\\d+/module/\\d+$",
    "/admin/courses/\\d+/module/\\d+/lesson/\\d+$",
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
