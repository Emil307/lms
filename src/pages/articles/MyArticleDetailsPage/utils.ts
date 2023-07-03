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
        { title: "Мои статьи", href: { pathname: "/articles", query: { tab: "my-articles" } } },
        {
            title,
            href: { pathname: "/articles/my/[id]", query: { id } },
        },
    ];

    return breadCrumbsItems;
};
