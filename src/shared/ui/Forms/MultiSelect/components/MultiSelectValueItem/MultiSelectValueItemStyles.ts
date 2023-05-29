import { createStyles } from "@mantine/core";

export const useMultiSelectValueItemStyles = createStyles((theme, { isActive }: { isActive?: boolean }) => ({
    value: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 4,
        lineHeight: 16,
        borderRadius: 4,
        margin: "calc(10px / 2 - 2px) calc(10px / 2)",
        maxWidth: "calc(100% - 20px)",
        backgroundColor: theme.colors.primary8[0],
    },
    valueWrapper: {
        alignItems: "baseline",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    valueLabel: {
        color: theme.colors.dark[0],
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    ...(typeof isActive === "boolean"
        ? {
              activeBadge: {
                  width: 4,
                  height: 10,
                  marginRight: 4,
                  marginLeft: 4,
                  borderRadius: 8,
                  backgroundColor: isActive ? theme.colors.done[0] : theme.colors.gray20[0],
              },
          }
        : {}),
    valueRemove: {
        minWidth: 16,
        minHeight: 16,
        width: 16,
        height: 16,
        color: theme.colors.primary[0],
        svg: {
            strokeWidth: 1,
            path: {
                stroke: theme.colors.primary[0],
            },
        },
    },
}));
