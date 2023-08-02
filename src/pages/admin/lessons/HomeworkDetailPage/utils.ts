import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    homeworkAnswerId: number;
    studentFio: string;
}

export const getBreadCrumbsItems = ({ homeworkAnswerId, studentFio }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Домашние задания", href: { pathname: "/admin/homeworks" } },
    { title: studentFio, href: { pathname: "/admin/homeworks/[id]", query: { id: String(homeworkAnswerId) } } },
];
