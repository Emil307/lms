import { TInfoCardDisplayFields } from "@components/InfoCard";
import { GetAdminGroupResponse } from "@entities/group";

export const fields: TInfoCardDisplayFields<GetAdminGroupResponse> = [
    {
        name: "course.name",
        label: "Учебный курс",
    },
    { name: "name", label: "Название группы" },
    { name: "maxStudentsCount", label: "Максимальная численность" },
];
