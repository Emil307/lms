import { Box } from "@mantine/core";
import { Paragraph } from "@shared/ui";

export const CountAppliedFilters = ({ countAppliedFilters }: { countAppliedFilters: number }) => {
    if (!countAppliedFilters || countAppliedFilters === 0) {
        return null;
    }

    return (
        <Box
            style={{
                marginLeft: 8,
                borderRadius: 8,
                paddingBlock: 4,
                paddingInline: 8,
                backgroundColor: "#18233A",
                color: "#fff",
                height: 24,
            }}>
            <Paragraph variant="text-caption" color="neutralWhite">
                {countAppliedFilters}
            </Paragraph>
        </Box>
    );
};
