import { CSSObject, MantineTheme, NotificationStylesNames } from "@mantine/core";
import { ToastType } from "./constants";

const getColorsByType = (theme: MantineTheme, type: ToastType) => {
    switch (type) {
        case ToastType.INFO:
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };
        case ToastType.SUCCESS:
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.done[0] };
        case ToastType.WARN:
            return { backgroundColor: theme.colors.warning16[0], color: theme.colors.warning[0] };
        case ToastType.ERROR:
            return { backgroundColor: theme.colors.error16[0], color: theme.colors.error[0] };
        case ToastType.IMAGE:
            return { backgroundColor: theme.colors.grayLight[0], color: theme.colors.gray45[0] };
        default:
            return { backgroundColor: theme.colors.white[0], color: theme.colors.white[0] };
    }
};

const getStyles =
    ({ type, isMinimized }: { type: ToastType; isMinimized?: boolean }) =>
    (theme: MantineTheme): Partial<Record<NotificationStylesNames, CSSObject>> => ({
        root: {
            borderRadius: 16,
            padding: "8px 16px 8px 8px",
            boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08) !important",

            ...(isMinimized && {
                padding: "11px 12px 11px 11px",
                borderRadius: 8,
                boxShadow: "none !important",
                backgroundColor: getColorsByType(theme, type).backgroundColor,
            }),
        },
        title: {
            marginBottom: 0,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "24px",

            ...(isMinimized && {
                fontSize: 14,
                lineHeight: "18px",
                color: theme.colors.gray45,
            }),
        },
        description: {
            fontWeight: 500,
            fontSize: 12,
            lineHeight: "16px",
        },
        icon: {
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: 8,
            backgroundColor: `${isMinimized ? "transparent" : getColorsByType(theme, type).backgroundColor} !important`,
            color: `${getColorsByType(theme, type).color} !important`,

            ...(isMinimized && {
                width: 24,
                height: 24,
            }),

            img: {
                borderRadius: 8,
            },
        },
        closeButton: {
            color: theme.colors.primary,

            ":hover": {
                backgroundColor: "transparent",
            },

            ...(isMinimized && {
                minHeight: "auto",
                minWidth: "auto",
                height: 24,
                width: 24,
                backgroundColor: "white !important",
                borderRadius: "50%",
            }),
        },
        loader: {
            width: 32,
            height: 32,
            margin: 16,
            marginRight: 32,
            circle: {
                stroke: theme.colors.grayLight,

                "& + path": {
                    stroke: theme.colors.done,
                },
            },
        },
    });

export default getStyles;
