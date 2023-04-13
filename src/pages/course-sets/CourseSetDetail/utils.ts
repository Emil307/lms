import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    id: string;
    courseSetName: string;
}

export const getBreadCrumbsItems = ({ id, courseSetName = "" }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Курсы", href: { pathname: "/" } },
    { title: `Топовые подборки курсов ${new Date().getFullYear()}`, href: { pathname: "/" } },
    { title: courseSetName, href: { pathname: "/course-sets/[id]", query: { id } } },
];
