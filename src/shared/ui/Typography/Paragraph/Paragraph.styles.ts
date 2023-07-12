import { CSSObject, createStyles } from "@mantine/core";
import { ParagraphVariant } from "./types";

interface CreateStylesParams {
    variant: ParagraphVariant;
}

export default createStyles((theme, { variant }: CreateStylesParams) => ({
    root: {
        margin: 0,
        ...getStylesByVariant({ variant }),
    },
}));

const getStylesByVariant = ({ variant }: CreateStylesParams): CSSObject => {
    switch (variant) {
        case "large": {
            return {
                fontWeight: 500,
                fontSize: 18,
                lineHeight: "24px",
            };
        }
        case "small-m": {
            return {
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "24px",
            };
        }
        case "small-semi": {
            return {
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "24px",
            };
        }
        case "text-small-m": {
            return {
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "16px",
            };
        }
        case "text-small-semi": {
            return {
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "16px",
            };
        }
        case "text-caption": {
            return {
                fontWeight: 500,
                fontSize: 12,
                lineHeight: "16px",
            };
        }

        case "text-smaller": {
            return {
                fontWeight: 400,
                fontSize: 10,
                lineHeight: "12px",
            };
        }
        case "text-micro": {
            return {
                fontWeight: 400,
                fontSize: 8,
                lineHeight: "8px",
            };
        }

        default:
            return {};
    }
};
