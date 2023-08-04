import { Box, BoxProps, Accordion } from "@mantine/core";
import { useMemo, useState } from "react";
import { isMyCourse } from "@shared/utils";
import { Heading } from "@shared/ui";
import { GetCourseResponse } from "@entities/course";
import useStyles from "./ProgramTrainingList.styles";
import { AboutCourseInfo, ProgramModule } from "./components";

export interface ProgramTrainingListProps extends Omit<BoxProps, "children"> {
    data: GetCourseResponse;
}

const ProgramTrainingList = ({ data, ...props }: ProgramTrainingListProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const renderModules = useMemo(() => {
        if (isMyCourse(data)) {
            return null;
        }

        return data.modules.map((programModule, index) => {
            const isSelected = selected.includes(`${programModule.name}_${programModule.id}`);
            return <ProgramModule key={programModule.id} data={programModule} numberModule={index + 1} isSelected={isSelected} />;
        });
    }, [data, selected]);

    return (
        <Box {...props} className={classes.root}>
            <Heading order={2} mb={32}>
                Программа обучения
            </Heading>
            <AboutCourseInfo data={data} />
            <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
                {renderModules}
            </Accordion>
        </Box>
    );
};

export default ProgramTrainingList;
