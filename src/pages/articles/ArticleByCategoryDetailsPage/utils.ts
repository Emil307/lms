import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    title: string;
    categoryName?: string;
    categoryId?: string;
}

export const getBreadCrumbsItems = ({
    title = "",
    categoryName = "Без категории",
    id,
    categoryId,
}: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "База знаний", href: { pathname: "/articles" } },
        { title: categoryName, href: { pathname: "/articles", query: { tab: "all", categoryId } } },
        {
            title,
            href: { pathname: "/articles/favorite/[id]", query: { id } },
        },
    ];

    return breadCrumbsItems;
};
