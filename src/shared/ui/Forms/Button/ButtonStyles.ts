import { createStyles, CSSObject } from "@mantine/core";
import { ButtonSize, ButtonVariant } from "./Button";

const getStylesForType = (varian: ButtonVariant): CSSObject => {
    switch (varian) {
        case "primary": {
            return {
                
            };
        }
        default:
            return {};
    }
};

export const useButtonStyles = createStyles((theme, { variant }: { variant: ButtonVariant }) => ({
    root: {
        ...getStylesForType(variant),
    },
}));
