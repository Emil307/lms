import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    title: string;
}

export const getBreadCrumbsItems = ({ title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Титульная страница", href: { pathname: "/admin/settings/main-page/reviews" } },
    { title: "Главный баннер", href: { pathname: "/admin/settings/main-page/banner" } },
    { title, href: { pathname: "/admin/settings/main-page/banner/edit" } },
];
