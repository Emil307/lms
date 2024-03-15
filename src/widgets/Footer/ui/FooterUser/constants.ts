import { Route } from "nextjs-routes";

export const pageSections: { label: string; href: Route }[] = [
    {
        label: "О проекте",
        href: { pathname: "/about" },
    },
    {
        label: "Поддержка",
        href: { pathname: "/support" },
    },
    {
        label: "Вопрос-ответ",
        href: { pathname: "/faq" },
    },
    {
        label: "Контактные данные",
        href: { pathname: "/contacts" },
    },
];
