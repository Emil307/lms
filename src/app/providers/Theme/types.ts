import { DefaultMantineColor } from "@mantine/core";
import { Tuple } from "@mantine/core";

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<Colors, Tuple<string, 10>>;
    }
    export type Colors =
        | "primary"
        | "background"
        | "neutral_gray"
        | "primaryHover"
        | "primary16"
        | "primary8"
        | "secondary"
        | "secondaryHover"
        | "secondary16"
        | "secondary8"
        | "dark"
        | "gray45"
        | "gray20"
        | "grayLight"
        | "light"
        | "white"
        | "white56"
        | "white16"
        | "info"
        | "info16"
        | "done"
        | "doneDark"
        | "done16"
        | "error"
        | "errorDark"
        | "error16"
        | "warning"
        | "warning16"
        | "shadowGray"
        | DefaultMantineColor;
}
