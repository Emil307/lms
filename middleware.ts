import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const token = req.cookies.get("TOKEN")?.value || "";

    const unathPaths = ["/auth", "/auth/forgot-password", "/auth/recovery-password", "/auth/sign-up"];
    const publicPaths = ["/", "/courses", "/about", "/faq", "/contacts", "/user-agreement"];
    const disabledRedirectUrls = ["/logout"];

    if (publicPaths.includes(url.pathname)) {
        return NextResponse.next();
    }

    if (token && unathPaths.includes(url.pathname)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (token) {
        return NextResponse.next();
    }

    if (!token && unathPaths.includes(url.pathname)) {
        return NextResponse.next();
    }

    if (disabledRedirectUrls.includes(req.nextUrl.pathname)) {
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }

    url.search = `redirect=${req.nextUrl.pathname}`;
    url.pathname = "/auth";

    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
