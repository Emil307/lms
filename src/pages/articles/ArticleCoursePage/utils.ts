import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    courseId: string;
    title: string;
}

export const getBreadCrumbsItems = ({ courseId, title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/articles" } },
    { title: "Мои курсы", href: { pathname: "/articles/my-courses" } },
    {
        title,
        href: { pathname: "/articles/my-courses/[courseId]", query: { courseId } },
    },
];
