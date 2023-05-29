import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    packageName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ packageName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: packageName, href: { pathname: "/course-packages/[id]", query: { id } } },
];
