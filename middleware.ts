import { NextResponse } from "next/server";
import { ECookies } from "@app/config/axios/cookies";
import { publicPaths, logoutPath, isAccessAllowed, isPathIncluded, errorPaths } from "@app/routes";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Если пользователь выходит, пропускаем дальше
    if (url.pathname === logoutPath) {
        return NextResponse.next();
    }

    // Пропускаем обработку для страниц с ошибками
    const isErrorPath = isPathIncluded(errorPaths, url.pathname);
    if (isErrorPath) {
        return NextResponse.next();
    }

    // Получаем токен авторизации и роль пользователя из cookies
    const token = req.cookies.get(ECookies.TOKEN)?.value;
    const userRole = req.cookies.get(ECookies.USER_ROLE)?.value;
    const isUserAuth = token && userRole;

    // Получаем значение action из query параметра
    const action = url.searchParams.get("action");
    const isAuthAction = action === "auth";
    const isPublicPage = isPathIncluded(publicPaths, url.pathname);

    // Пользователь авторизован и пытается зайти на страницу авторизации, перенаправляем на главную
    if (isAuthAction && isUserAuth) {
        return NextResponse.redirect(url.origin);
    }

    // Неавторизованный пользователь пытается зайти на публичную страницу или страницу авторизации
    if ((isAuthAction || isPublicPage) && !isUserAuth) {
        return NextResponse.next();
    }

    // Неавторизованный пользователь пытается зайти на приватную страницу
    if (!isAuthAction && !isPublicPage && !isUserAuth) {
        // Сохраняем текущий путь, чтобы после авторизации вернуть на эту страницу
        const redirectTo = url.pathname + url.search;
        // Перенаправляем на главную с параметром для открытия авторизационного дровера
        url.pathname = "/";
        url.searchParams.set("action", "auth");
        url.searchParams.set("redirect", redirectTo); // Сохраняем параметр для возврата
        return NextResponse.redirect(url);
    }

    // После авторизации проверяем, есть ли параметр редиректа и проверяем роль пользователя
    const redirectParam = url.searchParams.get("redirect");
    if (isUserAuth && redirectParam) {
        const userHasAccessToRedirectPath = isAccessAllowed(userRole, redirectParam);

        if (userHasAccessToRedirectPath) {
            // Перенаправляем на сохраненную страницу
            return NextResponse.redirect(new URL(redirectParam, url.origin));
        } else {
            // Если доступ запрещен, остаемся на главной или перенаправляем на страницу с ошибкой
            return NextResponse.redirect(url.origin);
        }
    }

    // Проверка доступа пользователя к текущей странице на основе его роли
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
