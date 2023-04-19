import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    fullName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ fullName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Титульная страница", href: { pathname: "/admin/settings/main-page/reviews" } },
    { title: "Отзывы", href: { pathname: "/admin/settings/main-page/reviews" } },
    { title: fullName, href: { pathname: "/admin/settings/main-page/reviews/[id]/edit", query: { id } } },
];
