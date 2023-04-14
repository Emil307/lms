import { UserDetailResponse } from "@entities/user";
import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    data?: UserDetailResponse;
}

export const getBreadCrumbsItems = ({ data }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Пользователи", href: { pathname: "/admin/users" } },
    {
        title: `${data?.firstName} ${data?.patronymic} ${data?.lastName}`,
        href: { pathname: "/admin/users/[id]", query: { id: String(data?.id) } },
    },
];
