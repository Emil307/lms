import { Route } from "nextjs-routes";

export const popularSections: { label: string; href: Route }[] = [
    //TODO: Заменить позднее на категории курсов
    {
        label: "Консалтинг",
        href: { pathname: "/" },
    },
    {
        label: "Краудфандинг",
        href: { pathname: "/" },
    },
    {
        label: "Стартап",
        href: { pathname: "/" },
    },
    {
        label: "Лизинг",
        href: { pathname: "/" },
    },
    {
        label: "Все курсы",
        href: { pathname: "/courses" },
    },
];

export const pageSections: { label: string; href: Route }[] = [
    {
        label: "О проекте",
        href: { pathname: "/about" },
    },
    //TODO: Заменить позднее урл
    {
        label: "Консультация",
        href: { pathname: "/" },
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
