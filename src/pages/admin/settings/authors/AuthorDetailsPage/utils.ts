import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    authorName?: string;
}

export const getBreadCrumbsItems = ({ authorName = "" }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Авторы курсов", href: { pathname: "/admin/settings/authors" } },
    { title: authorName },
];
