import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    fullName?: string;
}

export const getBreadCrumbsItems = ({ fullName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Авторы курсов", href: { pathname: "/admin/settings/authors" } },
    { title: fullName, href: { pathname: "/admin/settings/authors/[id]/edit", query: { id } } },
];
