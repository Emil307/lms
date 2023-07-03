import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    title: string;
}

export const getBreadCrumbsItems = ({ title = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "База знаний", href: { pathname: "/articles" } },
        //TODO:
        { title: "Избранное", href: { pathname: "/articles", query: { tab: "favorite" } } },
        {
            title,
            href: { pathname: "/articles/favorite/[id]", query: { id } },
        },
    ];

    return breadCrumbsItems;
};
