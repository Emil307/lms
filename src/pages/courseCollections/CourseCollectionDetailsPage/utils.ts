import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    name?: string;
    isTablet?: boolean;
}

export const getBreadCrumbsItems = ({ name = "", isTablet }: TGetBreadCrumbsProps): TBreadCrumbItem[] => {
    return [
        { title: "Главная страница", href: { pathname: "/" } },
        !isTablet && { title: "Курсы", href: { pathname: "/courses" } },
        !isTablet && { title: `Подборки`, href: { pathname: "/course-collections" } },
        isTablet && { title: "..." },
        { title: name },
    ].filter(Boolean) as TBreadCrumbItem[];
};
