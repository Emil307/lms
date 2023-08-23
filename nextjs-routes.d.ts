// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
// nextjs-routes version: 1.0.8
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  import type {
    GetServerSidePropsContext as NextGetServerSidePropsContext,
    GetServerSidePropsResult as NextGetServerSidePropsResult
  } from "nextjs";

  export type Route =
    | StaticRoute<"/about">
    | StaticRoute<"/admin/analytics/student-report">
    | DynamicRoute<"/admin/articles/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/articles/[id]", { "id": string }>
    | StaticRoute<"/admin/articles/create">
    | StaticRoute<"/admin/articles">
    | DynamicRoute<"/admin/courses/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/courses/[id]", { "id": string }>
    | DynamicRoute<"/admin/courses/[id]/modules/[moduleId]", { "id": string; "moduleId": string }>
    | DynamicRoute<"/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]/edit/homework", { "id": string; "moduleId": string; "lessonId": string }>
    | DynamicRoute<"/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]/edit", { "id": string; "moduleId": string; "lessonId": string }>
    | DynamicRoute<"/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]/edit/test", { "id": string; "moduleId": string; "lessonId": string }>
    | DynamicRoute<"/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]", { "id": string; "moduleId": string; "lessonId": string }>
    | StaticRoute<"/admin/courses/create">
    | StaticRoute<"/admin/courses">
    | DynamicRoute<"/admin/groups/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/groups/[id]", { "id": string }>
    | StaticRoute<"/admin/groups/create">
    | StaticRoute<"/admin/groups">
    | DynamicRoute<"/admin/homeworks/[id]", { "id": string }>
    | StaticRoute<"/admin/homeworks">
    | DynamicRoute<"/admin/lessons/[lessonId]/edit/homework", { "lessonId": string }>
    | DynamicRoute<"/admin/lessons/[lessonId]/edit", { "lessonId": string }>
    | DynamicRoute<"/admin/lessons/[lessonId]/edit/test", { "lessonId": string }>
    | DynamicRoute<"/admin/lessons/[lessonId]", { "lessonId": string }>
    | StaticRoute<"/admin/lessons">
    | StaticRoute<"/admin/messages">
    | DynamicRoute<"/admin/settings/article-packages/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/settings/article-packages/[id]", { "id": string }>
    | StaticRoute<"/admin/settings/article-packages/create">
    | StaticRoute<"/admin/settings/article-packages">
    | DynamicRoute<"/admin/settings/authors/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/settings/authors/[id]", { "id": string }>
    | StaticRoute<"/admin/settings/authors/create">
    | StaticRoute<"/admin/settings/authors">
    | DynamicRoute<"/admin/settings/categories/[id]", { "id": string }>
    | StaticRoute<"/admin/settings/categories">
    | DynamicRoute<"/admin/settings/course-collections/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/settings/course-collections/[id]", { "id": string }>
    | StaticRoute<"/admin/settings/course-collections/create">
    | StaticRoute<"/admin/settings/course-collections">
    | DynamicRoute<"/admin/settings/course-packages/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/settings/course-packages/[id]", { "id": string }>
    | StaticRoute<"/admin/settings/course-packages/create">
    | StaticRoute<"/admin/settings/course-packages">
    | DynamicRoute<"/admin/settings/course-reviews/[id]", { "id": string }>
    | StaticRoute<"/admin/settings/course-reviews">
    | StaticRoute<"/admin/settings/main-page/advantages">
    | StaticRoute<"/admin/settings/main-page/banner/edit">
    | StaticRoute<"/admin/settings/main-page/banner">
    | DynamicRoute<"/admin/settings/main-page/reviews/[id]/edit", { "id": string }>
    | StaticRoute<"/admin/settings/main-page/reviews/create">
    | StaticRoute<"/admin/settings/main-page/reviews">
    | StaticRoute<"/admin/settings/materials">
    | StaticRoute<"/admin/settings/tags">
    | StaticRoute<"/admin/static-pages/about">
    | StaticRoute<"/admin/static-pages/contacts">
    | StaticRoute<"/admin/static-pages/faq">
    | StaticRoute<"/admin/static-pages/user-agreement">
    | DynamicRoute<"/admin/students/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/students/[id]", { "id": string }>
    | StaticRoute<"/admin/students/create">
    | StaticRoute<"/admin/students">
    | DynamicRoute<"/admin/transactions/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/transactions/[id]", { "id": string }>
    | StaticRoute<"/admin/transactions/create">
    | StaticRoute<"/admin/transactions">
    | DynamicRoute<"/admin/users/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/users/[id]", { "id": string }>
    | StaticRoute<"/admin/users/create">
    | StaticRoute<"/admin/users">
    | StaticRoute<"/api/external-icons">
    | DynamicRoute<"/articles/[id]", { "id": string }>
    | DynamicRoute<"/articles/by-category/[categoryId]/article/[id]", { "categoryId": string; "id": string }>
    | DynamicRoute<"/articles/favorite/[id]", { "id": string }>
    | StaticRoute<"/articles">
    | DynamicRoute<"/articles/my/[id]", { "id": string }>
    | StaticRoute<"/auth/forgot-password">
    | StaticRoute<"/auth">
    | StaticRoute<"/auth/recovery-password">
    | StaticRoute<"/auth/sign-up">
    | StaticRoute<"/cabinet">
    | StaticRoute<"/contacts">
    | DynamicRoute<"/course-collections/[id]", { "id": string }>
    | StaticRoute<"/course-collections">
    | DynamicRoute<"/course-packages/[id]", { "id": string }>
    | DynamicRoute<"/courses/[id]", { "id": string }>
    | StaticRoute<"/courses">
    | StaticRoute<"/faq">
    | StaticRoute<"/">
    | StaticRoute<"/logout">
    | DynamicRoute<"/my-courses/[id]", { "id": string }>
    | DynamicRoute<"/my-courses/[id]/lessons/[lessonId]", { "id": string; "lessonId": string }>
    | StaticRoute<"/my-courses/favorite">
    | StaticRoute<"/my-courses">
    | StaticRoute<"/profile/edit">
    | StaticRoute<"/profile">
    | StaticRoute<"/support">
    | StaticRoute<"/transactions">
    | StaticRoute<"/ui">
    | StaticRoute<"/user-agreement">;

  interface StaticRoute<Pathname> {
    pathname: Pathname;
    query?: Query | undefined;
    hash?: string | null | undefined;
  }

  interface DynamicRoute<Pathname, Parameters> {
    pathname: Pathname;
    query: Parameters & Query;
    hash?: string | null | undefined;
  }

  interface Query {
    [key: string]: string | string[] | undefined;
  };

  export type RoutedQuery<P extends Route["pathname"]> = Extract<
    Route,
    { pathname: P }
  >["query"];

  export type Locale = undefined;

  /**
   * A typesafe utility function for generating paths in your application.
   *
   * route({ pathname: "/foos/[foo]", query: { foo: "bar" }}) will produce "/foos/bar".
   */
  export declare function route(r: Route): string;

  /**
   * Nearly identical to GetServerSidePropsContext from next, but further narrows
   * types based on nextjs-route's route data.
   */
  export type GetServerSidePropsContext<
    Pathname extends Route["pathname"] = Route["pathname"],
    Preview extends NextGetServerSidePropsContext["previewData"] = NextGetServerSidePropsContext["previewData"]
  > = Omit<NextGetServerSidePropsContext, 'params' | 'query' | 'defaultLocale' | 'locale' | 'locales'> & {
    params: Extract<Route, { pathname: Pathname }>["query"];
    query: Query;
    defaultLocale?: undefined;
    locale?: Locale;
    locales?: undefined;
  };

  /**
   * Nearly identical to GetServerSideProps from next, but further narrows
   * types based on nextjs-route's route data.
   */
  export type GetServerSideProps<
    Props extends { [key: string]: any } = { [key: string]: any },
    Pathname extends Route["pathname"] = Route["pathname"],
    Preview extends NextGetServerSideProps["previewData"] = NextGetServerSideProps["previewData"]
  > = (
    context: GetServerSidePropsContext<Pathname, Preview>
  ) => Promise<NextGetServerSidePropsResult<Props>>
}

// prettier-ignore
declare module "next/link" {
  import type { Route } from "nextjs-routes";
  import type { LinkProps as NextLinkProps } from "next/dist/client/link";
  import type {
    AnchorHTMLAttributes,
    DetailedReactHTMLElement,
    MouseEventHandler,
    PropsWithChildren,
  } from "react";
  export * from "next/dist/client/link";

  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  export interface LinkProps
    extends Omit<NextLinkProps, "href" | "locale">,
      AnchorHTMLAttributes<HTMLAnchorElement> {
    href: Route | StaticRoute | Omit<Route, "pathname">
    locale?: false;
  }

  type LinkReactElement = DetailedReactHTMLElement<
    {
      onMouseEnter?: MouseEventHandler<Element> | undefined;
      onClick: MouseEventHandler;
      href?: string | undefined;
      ref?: any;
    },
    HTMLElement
  >;

  declare function Link(props: PropsWithChildren<LinkProps>): LinkReactElement;

  export default Link;
}

// prettier-ignore
declare module "next/router" {
  import type { Locale, Route, RoutedQuery } from "nextjs-routes";
  import type { NextRouter as Router } from "next/dist/client/router";
  export * from "next/dist/client/router";
  export { default } from "next/dist/client/router";

  type NextTransitionOptions = NonNullable<Parameters<Router["push"]>[2]>;
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  interface TransitionOptions extends Omit<NextTransitionOptions, "locale"> {
    locale?: false;
  }

  export type NextRouter<P extends Route["pathname"] = Route["pathname"]> =
    Extract<Route, { pathname: P }> &
      Omit<
        Router,
        | "push"
        | "replace"
        | "locale"
        | "locales"
        | "defaultLocale"
        | "domainLocales"
      > & {
        defaultLocale?: undefined;
        domainLocales?: undefined;
        locale?: Locale;
        locales?: undefined;
        push(
          url: Route | StaticRoute | Omit<Route, "pathname">,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        replace(
          url: Route | StaticRoute | Omit<Route, "pathname">,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        route: P;
      };

  export function useRouter<P extends Route["pathname"]>(): NextRouter<P>;
}
