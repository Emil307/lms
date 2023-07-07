import { ThemeIcon } from "@mantine/core";
import * as FeatherIcons from "react-feather";

interface GetIconProps {
    iconName: string;
}

export const getIcon = ({ iconName }: GetIconProps) => {
    const IconFeater = iconName in FeatherIcons ? FeatherIcons[iconName as keyof typeof FeatherIcons] : null;
    if (IconFeater) {
        return <IconFeater width={64} height={64} strokeWidth={1} />;
    }

    return (
        <ThemeIcon variant="outline" w={64} h={64} color="gray20" sx={{ border: "none" }}>
            <FeatherIcons.Image />
        </ThemeIcon>
    );
};
