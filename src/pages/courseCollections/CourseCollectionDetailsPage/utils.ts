import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    id: string;
    name?: string;
}

export const getBreadCrumbsItems = ({ id, name = "" }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Курсы", href: { pathname: "/courses" } },
    { title: `Топовые подборки курсов ${new Date().getFullYear()}`, href: { pathname: "/course-collections" } },
    { title: name, href: { pathname: "/course-collections/[id]", query: { id } } },
];
