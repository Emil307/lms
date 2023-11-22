import { UserDetailResponse } from "@entities/user";
import { TBreadCrumbItem } from "@shared/ui";
import { getFullName } from "@shared/utils";

interface TGetBreadCrumbsProps {
    data?: UserDetailResponse;
}

export const getBreadCrumbsItems = ({ data }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Пользователи", href: { pathname: "/admin/users" } },
    {
        title: getFullName({ data: data?.profile }),
    },
];
