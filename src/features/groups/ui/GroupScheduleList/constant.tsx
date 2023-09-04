import dayjs from "dayjs";
import { AdminGroupScheduleFromList } from "@entities/group";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["date", "timings", "mrt-row-actions"];

export const columns: TColumns<AdminGroupScheduleFromList> = [
    {
        header: "Дата занятия",
        accessorKey: "date",
        accessorFn: ({ date }) => dayjs(date).format("DD.MM.YYYY"),
    },
    {
        header: "Время занятия",
        accessorKey: "timings",
        accessorFn: (row) => {
            const timingsRow = row.timings
                .map((timing) => `${dayjs(timing.from).format("HH:mm")} - ${dayjs(timing.to).format("HH:mm")}`)
                .join(", ");

            return timingsRow;
        },
    },
];
