import { Route } from "nextjs-routes";

export const getPageSections = (isUserAuth = false) => {
    const sections: { label: string; href: Route }[] = [
        {
            label: "О проекте",
            href: { pathname: "/about" },
        },
    ];
    if (isUserAuth) {
        sections.push({
            label: "Поддержка",
            href: { pathname: "/support" },
        });
    }
    sections.push(
        {
            label: "Вопрос-ответ",
            href: { pathname: "/faq" },
        },
        {
            label: "Контактные данные",
            href: { pathname: "/contacts" },
        }
    );
    return sections;
};
