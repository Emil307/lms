import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    authorName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ authorName = "", id }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Авторы курсов", href: { pathname: "/admin/settings/authors" } },
    { title: authorName, href: { pathname: "/admin/settings/authors/[id]", query: { id } } },
];
