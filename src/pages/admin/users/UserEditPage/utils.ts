import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    userName: string;
    id: string;
}

export const getBreadCrumbsItems = ({ userName, id }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Пользователи", href: { pathname: "/admin/users" } },
    { title: userName, href: { pathname: "/admin/users/[id]/edit", query: { id } } },
];
