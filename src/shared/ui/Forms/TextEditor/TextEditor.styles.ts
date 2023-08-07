import { CSSObject, MantineTheme, createStyles } from "@mantine/core";
import { textEditorContentStyles } from "@shared/styles";

interface TCreateStylesParams {
    isError: boolean;
    statusSuccess: boolean;
    readonly: boolean;
}

interface TGetStylesByStatus extends TCreateStylesParams {
    theme: MantineTheme;
}

// @ts-ignore
export default createStyles((theme, { isError, statusSuccess, readonly }: TCreateStylesParams) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        ...getStylesByStatus({ theme, isError, statusSuccess }),
    },
    toolbar: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        ...(readonly && {
            pointerEvents: "none",
        }),
    },
    typographyStylesProvider: {
        flex: 1,
        overflow: "auto",
        fontWeight: 500,
        color: theme.colors.dark[0],
        lineHeight: "16px",
    },
    content: {
        height: "100%",
        overflowY: "auto",
        borderRadius: 8,

        ...(readonly && {
            pointerEvents: "none",
        }),

        ".column-resize-handle": {
            position: "absolute",
            right: -1,
            top: 0,
            bottom: -2,
            width: 2,
            backgroundColor: theme.colors.gray45[0],
            pointerEvents: "none",
        },

        ".resize-cursor": {
            cursor: "ew-resize",
            /* @ts-ignore */
            cursor: "col-resize",
        },

        ".ProseMirror": {
            height: "100%",
            paddingBottom: 16,
        },
        ...textEditorContentStyles(theme),
    },

    controlsGroup: {
        button: {
            ":hover, &[data-active]": {
                backgroundColor: theme.colors.gray20[0],
            },
            svg: {
                color: theme.colors.gray45[0],
            },
            ":first-of-type": {
                borderRadius: "8px 0px 0px 8px !important",
            },
            ":last-of-type": {
                borderRadius: "0px 8px 8px 0px !important",
            },
        },
    },
    error: {
        marginTop: 4,
        gap: 4,
    },
    description: {
        alignItems: "flex-start",
        marginTop: 4,
        gap: 4,
    },
    wrapperIcon: {
        width: 16,
        height: 16,
    },
}));

const getStylesByStatus = ({ theme, isError, statusSuccess }: Omit<TGetStylesByStatus, "readonly">): CSSObject => {
    if (isError) {
        return {
            border: `1px solid ${theme.colors.warning[0]}`,
        };
    }

    if (statusSuccess) {
        return {
            border: `1px solid ${theme.colors.done[0]}`,
        };
    }

    return {
        border: `1px solid ${theme.colors.gray20[0]}`,
    };
};
