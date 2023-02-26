import { DefaultMantineColor } from "@mantine/core";
import { Tuple } from "@mantine/core";

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<Colors, Tuple<string, 10>>;
    }
    export type Colors = "primary" | "background" | "neutral_gray" | DefaultMantineColor;
}


