import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Транзакции", href: { pathname: "/admin/transactions" } },
    { title: name },
];
