import { IconBook2 } from "@tabler/icons-react";
import { Heart } from "react-feather";
import { TBreadCrumbItem } from "@shared/ui";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { PageTitle } from "./types";

export const tabsList = [
    { id: 1, label: "Все", value: "all" },
    { id: 2, label: "Мои статьи", value: "my-articles" },
    { id: 3, label: "Избранное", value: "favorite" },
];

export const titleList: PageTitle[] = [
    {
        id: 1,
        label: "База знаний",
        value: "all",
        icon: <IconBook2 height={36} width={36} />,
    },
    { id: 2, label: "Мои статьи", value: "my-articles", icon: <IconBook2 height={36} width={36} /> },
    { id: 3, label: "Избранное", value: "favorite", icon: <Heart height={36} width={36} /> },
];

export const initialBreadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/articles" } },
];

export const initialFilterValues: ArticleAndArticleCategoryFiltersForm = {
    userId: 0,
    query: "",
    tags: [],
    subcategoryIds: [],
};
