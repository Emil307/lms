import { defaultTheme } from "@app/providers/Theme/theme";
import { useMediaQuery } from "@mantine/hooks";
import { DeepPartial } from "@mantine/styles/lib/theme/types/DeepPartial";
import { MantineSizes } from "@mantine/core";
import { MantineSize } from "@mantine/styles/lib/theme/types/MantineSize";

export const useMedia = (value: MantineSize) => {
    const breakpoints = defaultTheme.breakpoints as DeepPartial<MantineSizes>;

    return useMediaQuery(`(max-width: ${breakpoints[value as keyof typeof defaultTheme.breakpoints] - 1}px)`);
};
