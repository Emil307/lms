import { Paper } from "@mantine/core";
import { Paragraph } from "@shared/ui";

interface AvailableGroupInfoBadgeProps {
    title: string | null;
    grayColor?: boolean;
}

export const AvailableGroupInfoBadge = ({ title, grayColor }: AvailableGroupInfoBadgeProps) => {
    if (!title) {
        return null;
    }

    return (
        <Paper radius={8} p="6px 10px" bg={grayColor ? "neutralGray100" : "neutralWhite"}>
            <Paragraph variant="text-caption" color="neutralMain50">
                {title}
            </Paragraph>
        </Paper>
    );
};
