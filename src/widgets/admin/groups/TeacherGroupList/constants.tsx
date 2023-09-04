import dayjs from "dayjs";
import { Badge } from "@mantine/core";
import { AdminGroupFromList } from "@entities/group";
import useStyles from "./TeacherGroupList.styles";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "createdAt", "category.name", "isActive"];

export const columns: TColumns<AdminGroupFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 135,
    },
    {
        header: "Номер группы",
        accessorKey: "name",
        size: 240,
    },
    {
        header: "Название курса",
        accessorKey: "course.name",
        size: 692,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
        size: 240,
    },
    {
        header: "Статус",
        accessorKey: "status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ statusType: row.original.status.type });
            return <Badge className={classes.status}>{row.original.status.name}</Badge>;
        },
        size: 240,
    },
];
