import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    courseId: string;
    title: string;
}

export const getBreadCrumbsItems = ({ courseId, title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/article-collection" } },
    { title: "Мои курсы", href: { pathname: "/article-collection/my-courses" } },
    {
        title,
        href: { pathname: "/article-collection/my-courses/[courseId]", query: { courseId } },
    },
];
