import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Транзакции", href: { pathname: "/admin/transactions" } },
    { title: name, href: { pathname: "/admin/transactions/[id]/edit", query: { id } } },
];
