import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    userName: string;
}

export const getBreadCrumbsItems = ({ userName }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Пользователи", href: { pathname: "/admin/users" } },
    { title: userName },
];
