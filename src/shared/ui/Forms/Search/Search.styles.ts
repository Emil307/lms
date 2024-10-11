import { createStyles, CSSObject } from "@mantine/core";
import { SearchSize } from "./Search";

const getInputStylesForSize = (size: SearchSize): CSSObject => {
    switch (size) {
        case "large":
            return {
                height: 56,
                borderRadius: 12,
                padding: "17px 40px 17px 48px",
            };
        case "medium":
            return {
                height: 48,
                borderRadius: 8,
                padding: "16px 40px",
            };

        default:
            return {};
    }
};

const getIconStylesForSize = (size: SearchSize): CSSObject => {
    switch (size) {
        case "large":
            return {
                svg: {
                    width: 24,
                    height: 24,
                },
            };
        case "medium":
            return {
                svg: {
                    width: 16,
                    height: 16,
                },
            };

        default:
            return {};
    }
};

export const useSearchStyles = createStyles((theme, { size }: { size: SearchSize }) => ({
    root: {
        "&:hover .mantine-TextInput-input": {
            backgroundColor: theme.colors.white[0],
            border: "1px solid transparent !important",
            boxShadow: "0px 0px 16px 0px #00126E0A, 0px 1px 2px 0px #00126E0A",
        },
        input: {
            ...getInputStylesForSize(size),
            backgroundColor: theme.colors.neutralLight[0],
            border: "1px solid transparent",
            lineHeight: 16,
            ":focus": {
                backgroundColor: theme.colors.white[0],
                border: `1px solid ${theme.colors.neutral_gray300[0]}`,
                boxShadow: "0px 0px 16px 0px #00126E0A, 0px 1px 2px 0px #00126E0A",
            },
            ":placeholder-shown": {
                backgroundColor: theme.colors.white[0],
                border: `1px solid ${theme.colors.neutral_gray300[0]}`,
            },
        },
        svg: {
            cursor: "pointer",
        },
    },
    icon: {
        marginLeft: 10,
        ...getIconStylesForSize(size),
    },
}));
