import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    studentFio: string;
}

export const getBreadCrumbsItems = ({ studentFio }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Домашние задания", href: { pathname: "/admin/homeworks" } },
    { title: studentFio },
];
