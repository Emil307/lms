import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    fullName?: string;
}

export const getBreadCrumbsItems = ({ fullName = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Авторы курсов", href: { pathname: "/admin/settings/authors" } },
    { title: fullName },
];
