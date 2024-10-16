import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    title: string;
}

export const getBreadCrumbsItems = ({ title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главный баннер", href: { pathname: "/admin/static-pages/main-page/banner" } },
    { title },
];
