import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {ECookies} from "@app/config/axios/cookies";
import {authPaths, publicPaths, logoutPath, isAccessAllowed, isPathIncluded, allPaths, notFoundPath} from "@app/routes";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if (url.pathname === logoutPath) {
        return NextResponse.next();
    }

    if (url.pathname === "/ui") {
        return NextResponse.next();
    }

    //TODO Сделать проверку на существование страницы, в противном случае редирект на 404

    const token = req.cookies.get(ECookies.TOKEN)?.value;
    const userRole = Number(req.cookies.get(ECookies.USER_ROLE)?.value);

    const isUserAuth = token && userRole;
    const isAuthPage = isPathIncluded(authPaths, url.pathname);
    const isPublicPage = isPathIncluded(publicPaths, url.pathname);

    const authUserTryToAuthPage = isAuthPage && isUserAuth;
    const notAuthUserTryToNotPrivatePage = (isAuthPage || isPublicPage) && !isUserAuth;
    const notAuthUserTryToPrivatePage = !isAuthPage && !isPublicPage && !isUserAuth;

    if (authUserTryToAuthPage) {
        return NextResponse.redirect(url.origin);
    }

    if (notAuthUserTryToNotPrivatePage) {
        return NextResponse.next();
    }

    if (notAuthUserTryToPrivatePage) {
        url.search = `redirect=${url.pathname}`;
        url.pathname = logoutPath;
        return NextResponse.redirect(url);
    }

    const userHasAccessToPage = isAccessAllowed(userRole, url.pathname);

    if (userHasAccessToPage) {
        return NextResponse.next();
    }

    return NextResponse.redirect(url.origin);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
