import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { ScheduleLine } from "@entities/group";
import { getHumanDate } from "@shared/utils";

export const columns: MRT_ColumnDef<ScheduleLine>["columns"] = [
    {
        header: "Дата занятия",
        accessorKey: "date",
        Cell: ({ cell }) => (
            <>
                {getHumanDate(new Date(cell.getValue() as string), {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
    },
    {
        header: "Время занятия",
        accessorKey: "timings",
        accessorFn: (row) => {
            const timingsRow = row.timings.data
                .map((time) => `${dayjs(time.from).format("HH:mm")} - ${dayjs(time.to).format("HH:mm")}`)
                .join(", ");
            return (
                <Text sx={(theme) => ({ fontWeight: 500, fontSize: 14, lineHeight: "16px", color: theme.colors.dark[0] })}>
                    {timingsRow}
                </Text>
            );
        },
    },
];
