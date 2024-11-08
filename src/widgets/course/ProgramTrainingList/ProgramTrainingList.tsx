import { Box, BoxProps, Accordion, Stack } from "@mantine/core";
import { useMemo, useState } from "react";
import { Heading } from "@shared/ui";
import { CourseDetails } from "@entities/course";
import { ProgramModule } from "./components";

export interface ProgramTrainingListProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const ProgramTrainingList = ({ data, ...props }: ProgramTrainingListProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const renderModules = useMemo(
        () =>
            data.modules.map((programModule, index) => {
                const isSelected = selected.includes(`${programModule.name}_${programModule.id}`);
                return <ProgramModule key={programModule.id} data={programModule} numberModule={index + 1} isSelected={isSelected} />;
            }),
        [data, selected]
    );

    if (data.modules.length === 0) {
        return null;
    }

    return (
        <Box {...props} w="100%">
            <Stack spacing={32}>
                <Heading order={1} color="dark">
                    Программа обучения
                </Heading>
                <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
                    {renderModules}
                </Accordion>
            </Stack>
        </Box>
    );
};

export default ProgramTrainingList;
