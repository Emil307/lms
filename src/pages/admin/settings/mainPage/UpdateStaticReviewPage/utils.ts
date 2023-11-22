import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name: string;
}

export const getBreadCrumbsItems = ({ name }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Титульная страница", href: { pathname: "/admin/settings/main-page/reviews" } },
    { title: "Отзывы", href: { pathname: "/admin/settings/main-page/reviews" } },
    {
        title: name,
    },
];
