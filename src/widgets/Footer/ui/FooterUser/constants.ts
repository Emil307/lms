import { Route } from "nextjs-routes";

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
