import { createStyles, CSSObject, MantineSize, MantineTheme } from "@mantine/core";
import { ReactNode } from "react";

export const useInputStyles = createStyles(
    (
        theme,
        {
            floating,
            icon,
            rightSection,
            size,
            statusSuccess,
            isActive,
        }: {
            floating: boolean;
            icon?: ReactNode;
            rightSection?: ReactNode;
            size?: MantineSize;
            clearable?: boolean;
            statusSuccess?: boolean;
            isActive?: boolean;
        },
    ) => ({
        root: {
            position: "relative",
            ":hover": {
                label: {
                    color: theme.colors.dark[0],
                    cursor: "pointer",
                },
            },
        },
        wrapper: {
            marginBottom: 0,
            ...getActiveBadgeStyles({ theme, size, icon, isActive }),
        },
        label: {
            position: "absolute",
            zIndex: 2,
            top: size === "sm" ? 16 : 20,
            left: icon ? "50px" : "18px",
            transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease, padding 150ms ease",
            transform: floating ? `translate(0px, -6px)` : "none",
            fontSize: floating ? "10px" : "14px",
            lineHeight: floating ? "12px" : "16px",
            color: theme.colors.neutralMain50[0],
            pointerEvents: "none",
        },
        icon: {
            width: "50px",
        },
        input: {
            height: size === "sm" ? 48 : 56,
            paddingTop: size === "sm" ? 24 : 28,
            paddingLeft: 18,
            paddingRight: rightSection ? 50 : 18,
            paddingBottom: 8,
            border: statusSuccess ? `1px solid ${theme.colors.secondary[0]}` : `1px solid ${theme.colors.neutralGray300[0]}`,
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "16px",

            "&.mantine-Select-input": {
                paddingLeft: typeof isActive === "boolean" ? 27 : 18,
            },

            "&.mantine-Select-withIcon": {
                paddingLeft: typeof isActive === "boolean" ? 59 : 50,
            },

            ".mantine-TimeInput-controls": {
                height: size === "sm" ? "auto" : 34,
                opacity: floating ? 1 : 0,
            },

            ".mantine-TimeRangeInput-inputWrapper": {
                opacity: floating ? 1 : 0,
            },

            ":hover, :focus": {
                boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
                border: statusSuccess ? `1px solid ${theme.colors.secondary[0]}` : "1px solid rgba(0,0,0,0.0)",
            },
            ":disabled": {
                border: "1px solid rgba(0, 4, 41, 0.2)",
                color: theme.colors.dark[0],
            },
            "&[aria-invalid=true]": {
                border: `1px solid ${theme.colors.warning[0]}`,
            },
        },
        withIcon: {
            paddingLeft: 50,
        },
        rightSection: {
            width: "50px",
            cursor: "pointer",
            pointerEvents: "none",
        },

        error: {
            display: "flex",
            gap: 4,
            marginTop: 4,

            svg: {
                width: 16,
                height: 16,
                color: theme.colors.warning[0],
            },

            "> p": {
                width: "calc(100% - 20px)",
                paddingTop: 2,
            },
        },
        description: {
            display: "flex",
            flexDirection: "column",

            "> div": {
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 4,

                svg: {
                    width: "16px !important",
                    height: "16px !important",
                },

                "> div:first-type": {
                    alignSelf: "flex-start",
                },

                "> p": {
                    width: "calc(100% - 20px)",
                    paddingTop: 2,
                },
            },
        },
    }),
);

interface GetActiveBadgeStylesProps {
    theme: MantineTheme;
    size?: MantineSize;
    icon?: ReactNode;
    isActive?: boolean;
}

const getActiveBadgeStyles = ({ theme, icon, size, isActive }: GetActiveBadgeStylesProps): CSSObject => {
    if (typeof isActive !== "boolean") {
        return {};
    }

    return {
        ":before": {
            content: "''",
            position: "absolute",
            bottom: getActiveBadgePosition({ size }),
            left: icon ? 51 : 19,
            width: 4,
            height: 10,
            borderRadius: 8,
            backgroundColor: isActive ? theme.colors.secondary[0] : theme.colors.neutralGray300[0],
        },
    };
};

const getActiveBadgePosition = ({ size }: Pick<GetActiveBadgeStylesProps, "size">) => {
    switch (size) {
        case "sm":
            return 10;
        case "md":
            return 12;
        default:
            return 12;
    }
};
