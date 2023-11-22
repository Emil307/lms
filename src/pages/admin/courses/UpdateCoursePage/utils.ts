import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseName: string;
}

export const getBreadCrumbsItems = ({ courseName }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Курсы", href: { pathname: "/admin/courses" } },
    { title: courseName },
];
