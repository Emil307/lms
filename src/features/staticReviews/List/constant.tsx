import { Avatar, CSSObject, MantineTheme, Text } from "@mantine/core";
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { Camera } from "react-feather";
import { AdminStaticReview } from "@entities/staticReview";
import { Tooltip } from "@shared/ui";

export const columnOrder = ["avatarUrl", "fullName", "position", "videoName", "quote", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminStaticReview>["columns"] = [
    {
        header: "Фото",
        accessorKey: "avatarUrl",
        Cell: ({ cell }) => (
            <>
                <Avatar
                    src={cell.getValue() as string}
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
        accessorKey: "fullName",
    },
    {
        header: "Об авторе",
        accessorKey: "position",
    },
    {
        header: "Видео",
        accessorKey: "videoName",
    },
    {
        header: "Краткий отзыв",
        accessorKey: "quote",
        Cell: ({ cell }) => (
            <>
                <Tooltip label={cell.getValue() as string}>
                    <Text lineClamp={1}>{cell.getValue() as string}</Text>
                </Tooltip>
            </>
        ),
    },
];

export const getStylesForCell = (theme: MantineTheme, cell: MRT_Cell<AdminStaticReview>): CSSObject => {
    return {
        ":first-of-type": {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                backgroundColor: cell.row.original.isActive ? theme.colors.done[0] : theme.colors.light[0],
                width: 4,
                borderRadius: "0 8px 8px 0",
                height: "100%",
                top: 1,
                bottom: 1,
                left: 0,
            },
        },
    };
};
