import { UserDetailResponse } from "@entities/user";
import { TBreadCrumbItem } from "@shared/ui";
import { getFullNameFromProfile } from "@shared/utils";

interface TGetBreadCrumbsProps {
    data?: UserDetailResponse;
}

export const getBreadCrumbsItems = ({ data }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Пользователи", href: { pathname: "/admin/users" } },
    {
        title: getFullNameFromProfile(data?.profile),
        href: { pathname: "/admin/users/[id]", query: { id: String(data?.id) } },
    },
];
