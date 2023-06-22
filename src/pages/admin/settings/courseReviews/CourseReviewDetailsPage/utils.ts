import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    authorName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ authorName = "", id }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Отзывы", href: { pathname: "/admin/settings/course-reviews" } },
    { title: authorName, href: { pathname: "/admin/settings/course-reviews/[id]", query: { id } } },
];
