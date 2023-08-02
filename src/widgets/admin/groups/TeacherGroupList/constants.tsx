import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminGroupFromList } from "@entities/group";
import useStyles from "./TeacherGroupList.styles";
import { Badge } from "@mantine/core";

export const columnOrder = ["id", "name", "createdAt", "category.name", "isActive"];

export const columns: MRT_ColumnDef<AdminGroupFromList>["columns"] = [
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
            return (
                //TODO: displayName как беки добавят
                <Badge variant="outline" className={classes.status}>
                    {row.original.status.name}
                </Badge>
            );
        },
        size: 240,
    },
];
