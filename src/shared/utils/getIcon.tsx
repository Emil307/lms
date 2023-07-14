import { MantineColor, ThemeIcon } from "@mantine/core";
import * as FeatherIcons from "react-feather";

interface GetIconProps {
    iconName?: string;
    size?: number;
    color?: MantineColor;
    strokeWidth?: number;
}

export const getIcon = ({ iconName, color = "gray20", size = 64, strokeWidth = 1 }: GetIconProps) => {
    const IconFeater = iconName && iconName in FeatherIcons ? FeatherIcons[iconName as keyof typeof FeatherIcons] : null;

    if (IconFeater) {
        return <IconFeater width={size} height={size} strokeWidth={strokeWidth} />;
    }

    return (
        <ThemeIcon color={color} sx={{ svg: { strokeWidth } }}>
            <FeatherIcons.Image width={size} height={size} />
        </ThemeIcon>
    );
};
