import { Box, BoxProps, Accordion } from "@mantine/core";
import { useMemo, useState } from "react";
import { Heading } from "@shared/ui";
import { CourseDetails } from "@entities/course";
import useStyles from "./ProgramTrainingList.styles";
import { ProgramModule } from "./components";

export interface ProgramTrainingListProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
}

const ProgramTrainingList = ({ data, ...props }: ProgramTrainingListProps) => {
    const { classes } = useStyles();
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
        <Box {...props} className={classes.root}>
            <Heading order={2} mb={32}>
                Программа обучения
            </Heading>
            <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
                {renderModules}
            </Accordion>
        </Box>
    );
};

export default ProgramTrainingList;
