import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Титульная страница", href: { pathname: "/admin/settings/main-page/reviews" } },
    { title: "Отзывы", href: { pathname: "/admin/settings/main-page/reviews" } },
    {
        title: name,
        href: { pathname: "/admin/settings/main-page/reviews/[id]/edit", query: { id } },
        maxWidth: 300,
    },
];
