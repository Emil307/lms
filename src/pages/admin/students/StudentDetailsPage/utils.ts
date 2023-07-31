import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    userName: string;
    id: string;
}

export const getBreadCrumbsItems = ({ userName = "", id }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Ученики", href: { pathname: "/admin/students" } },
    { title: userName, href: { pathname: "/admin/students/[id]", query: { id } } },
];
