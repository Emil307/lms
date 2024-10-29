import { Tuple } from "@mantine/core";

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<Colors, Tuple<string, 10>>;
    }
    export type DefaultMantineColorWithoutEmpty =
        | "dark"
        | "gray"
        | "red"
        | "pink"
        | "grape"
        | "violet"
        | "indigo"
        | "blue"
        | "cyan"
        | "green"
        | "lime"
        | "yellow"
        | "orange"
        | "teal";
    export type Colors =
        | "primary"
        | "primaryHover"
        | "primary16"
        | "primary8"
        | "secondary"
        | "secondaryHover"
        | "secondary16"
        | "secondary8"
        | "dark"
        | "darkHover"
        | "neutralMain50"
        | "neutralGray300"
        | "neutralGray200"
        | "neutralGray100"
        | "neutralWhite"
        | "neutralWhite50"
        | "neutralWhite16"
        | "info"
        | "info20"
        | "done"
        | "doneDark"
        | "done20"
        | "error"
        | "errorDark"
        | "error20"
        | "warning"
        | "warning20"
        | "gray20"
        | "neutralLight"
        | "neutral_main50"
        | "gray45"
        | "white"
        | "neutral_gray"
        | "grayLight"
        | "white56"
        | DefaultMantineColorWithoutEmpty;
}
