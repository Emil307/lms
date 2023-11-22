import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    userName: string;
}

export const getBreadCrumbsItems = ({ userName = "" }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Ученики", href: { pathname: "/admin/students" } },
    { title: userName },
];
