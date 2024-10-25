import { createStyles } from "@mantine/core";

interface SelectItemStylesProps {
    selected?: boolean;
    isActive?: boolean;
}

export const useSelectItemStyles = createStyles((theme, { isActive, selected }: SelectItemStylesProps) => ({
    wrapper: {
        padding: 12,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        cursor: "pointer",
        borderRadius: 8,
        backgroundColor: selected ? theme.colors.primary8[0] : "",
        ":hover": {
            backgroundColor: theme.colors.primary8[0],
        },
    },
    labelWrapper: {
        alignItems: "center",
        gap: 4,
    },
    labelValue: {
        fontSize: "14px",
        lineHeight: "16px",
    },
    check: {
        width: 16,
        height: 16,
        color: theme.colors.primary[0],
    },
    ...(typeof isActive === "boolean"
        ? {
              activeBadge: {
                  width: 4,
                  height: 10,
                  marginLeft: 4,
                  borderRadius: 8,
                  backgroundColor: isActive ? theme.colors.secondary[0] : theme.colors.neutralGray300[0],
              },
          }
        : {}),
}));
