import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    authorName?: string;
}

export const getBreadCrumbsItems = ({ authorName = "" }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Отзывы", href: { pathname: "/admin/settings/course-reviews" } },
    { title: authorName },
];
