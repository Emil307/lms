import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "" }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Курсы", href: { pathname: "/courses" } },
    { title: `Топовые подборки курсов ${new Date().getFullYear()}`, href: { pathname: "/course-collections" } },
    { title: name },
];
