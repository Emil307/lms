import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    title: string;
    isFavorite: boolean;
}

export const getBreadCrumbsItems = ({ title = "", id, isFavorite }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "База знаний", href: { pathname: "/articles" } },
        {
            title,
            href: { pathname: "/articles/[id]", query: { id, tab: "favorite" } },
        },
    ];

    if (isFavorite) {
        breadCrumbsItems.splice(2, 0, { title: "Избранное", href: { pathname: "/articles", query: { tab: "favorite" } } });
    }

    return breadCrumbsItems;
};
