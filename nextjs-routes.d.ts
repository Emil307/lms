// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
// nextjs-routes version: 1.0.8
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  export type Route =
    | StaticRoute<"/about">
    | DynamicRoute<"/admin/groups/[id]/composition", { "id": string }>
    | DynamicRoute<"/admin/groups/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/groups/[id]", { "id": string }>
    | DynamicRoute<"/admin/groups/[id]/schedule", { "id": string }>
    | StaticRoute<"/admin/groups/create">
    | StaticRoute<"/admin/groups">
    | DynamicRoute<"/admin/settings/article-packages/[id]/articles", { "id": string }>
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
    | StaticRoute<"/admin/settings/main-page/advantages">
    | StaticRoute<"/admin/settings/main-page/banner">
    | DynamicRoute<"/admin/settings/main-page/reviews/[id]/edit", { "id": string }>
    | StaticRoute<"/admin/settings/main-page/reviews/create">
    | StaticRoute<"/admin/settings/main-page/reviews">
    | StaticRoute<"/admin/settings/tags">
    | DynamicRoute<"/admin/students/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/students/[id]", { "id": string }>
    | StaticRoute<"/admin/students/create">
    | StaticRoute<"/admin/students">
    | DynamicRoute<"/admin/users/[id]/edit", { "id": string }>
    | DynamicRoute<"/admin/users/[id]", { "id": string }>
    | StaticRoute<"/admin/users/create">
    | StaticRoute<"/admin/users">
    | StaticRoute<"/api/hello">
    | DynamicRoute<"/article-collection/[categoryId]", { "categoryId": string }>
    | DynamicRoute<"/article-collection/favorite/[articleId]", { "articleId": string }>
    | StaticRoute<"/article-collection/favorite">
    | StaticRoute<"/article-collection">
    | DynamicRoute<"/article-collection/my-courses/[courseId]", { "courseId": string }>
    | StaticRoute<"/article-collection/my-courses">
    | StaticRoute<"/auth/forgot-password">
    | StaticRoute<"/auth">
    | StaticRoute<"/auth/recovery-password">
    | StaticRoute<"/auth/sign-up">
    | StaticRoute<"/contacts">
    | DynamicRoute<"/course-packages/[id]", { "id": string }>
    | DynamicRoute<"/course-sets/[id]", { "id": string }>
    | StaticRoute<"/course-sets">
    | DynamicRoute<"/courses/[id]", { "id": string }>
    | StaticRoute<"/courses">
    | StaticRoute<"/faq">
    | StaticRoute<"/">
    | StaticRoute<"/my-courses/favorite">
    | StaticRoute<"/my-courses">
    | StaticRoute<"/profile/edit">
    | StaticRoute<"/profile/settings">
    | StaticRoute<"/ui">
    | StaticRoute<"/userAgreement">;

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

  type Query = { query?: { [key: string]: string | string[] | undefined } };
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  export interface LinkProps
    extends Omit<NextLinkProps, "href" | "locale">,
      AnchorHTMLAttributes<HTMLAnchorElement> {
    href: Route | StaticRoute | Query;
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
  type Query = { query?: { [key: string]: string | string[] | undefined } };

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
          url: Route | StaticRoute | Query,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        replace(
          url: Route | StaticRoute | Query,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        route: P;
      };

  export function useRouter<P extends Route["pathname"]>(): NextRouter<P>;
}
