import { NextResponse } from "next/server";
import { ECookies } from "@app/config/axios/cookies";
import { publicPaths, logoutPath, isAccessAllowed, isPathIncluded, errorPaths } from "@app/routes";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if (url.pathname === logoutPath) {
        return NextResponse.next();
    }

    const isErrorPath = isPathIncluded(errorPaths, url.pathname);
    if (isErrorPath) {
        return NextResponse.next();
    }

    //TODO Сделать проверку на существование страницы, в противном случае редирект на 404

    const token = req.cookies.get(ECookies.TOKEN)?.value;
    const userRole = req.cookies.get(ECookies.USER_ROLE)?.value;
    const isUserAuth = token && userRole;

    // Получаем значение action из query параметра
    const action = url.searchParams.get("action");
    const isAuthAction = action === "auth";
    const isPublicPage = isPathIncluded(publicPaths, url.pathname);

    // Пользователь авторизован, но пытается зайти на страницу авторизации
    if (isAuthAction && isUserAuth) {
        return NextResponse.redirect(url.origin);
    }

    // Неавторизованный пользователь пытается зайти на публичную страницу или страницу авторизации
    if ((isAuthAction || isPublicPage) && !isUserAuth) {
        return NextResponse.next();
    }

    // Неавторизованный пользователь пытается зайти на приватную страницу
    if (!isAuthAction && !isPublicPage && !isUserAuth) {
        url.pathname = logoutPath;
        // return NextResponse.redirect(url);
    }

    // Проверка доступа пользователя к странице на основе его роли
    const userHasAccessToPage = isAccessAllowed(userRole, url.pathname);
    if (userHasAccessToPage) {
        return NextResponse.next();
    }

    // Если доступ запрещен, перенаправляем на главную страницу
    return NextResponse.redirect(url.origin);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|site.webmanifest|.*\\..*|favicon.ico).*)"],
};
