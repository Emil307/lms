import { Avatar } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { Camera } from "react-feather";
import { AdminStaticReviewFromList } from "@entities/staticReview";

export const columnOrder = ["authorAvatar.absolutePath", "lastName", "position", "video.name", "quote", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminStaticReviewFromList>["columns"] = [
    {
        header: "Фото",
        accessorKey: "authorAvatar.absolutePath",
        Cell: ({ row }) => (
            <>
                <Avatar
                    src={row.original.authorAvatar?.absolutePath}
                    mih={32}
                    miw={32}
                    w={32}
                    h={32}
                    radius={50}
                    styles={(theme) => ({
                        root: {
                            backgroundColor: theme.colors.light[0],
                        },
                        placeholder: {
                            backgroundColor: theme.colors.light[0],
                            svg: {
                                color: theme.colors.gray45[0],
                            },
                            path: {
                                strokeWidth: 1,
                            },
                            circle: {
                                strokeWidth: 1,
                            },
                        },
                    })}>
                    <Camera width={18} />
                </Avatar>
            </>
        ),
        enableSorting: false,
    },
    {
        header: "ФИО",
        accessorKey: "lastName",
        accessorFn: (row) => {
            if (!row.lastName || !row.firstName) {
                return "";
            }
            return `${row.lastName} ${row.firstName}`;
        },
    },
    {
        header: "Об авторе",
        accessorKey: "position",
    },
    {
        header: "Видео",
        accessorKey: "video.name",
    },
    {
        header: "Краткий отзыв",
        accessorKey: "quote",
    },
];
