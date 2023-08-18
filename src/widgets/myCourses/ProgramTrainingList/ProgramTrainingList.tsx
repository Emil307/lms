import { Box, BoxProps, Flex } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useIntersection } from "@mantine/hooks";
import { useGroupModules } from "@entities/group";
import { Loader } from "@shared/ui";
import { ProgramModule } from "./components";
import { initialParams } from "./constants";
import useStyles from "./ProgramTrainingList.styles";

export interface ProgramTrainingListProps extends Omit<BoxProps, "children"> {
    groupId: string;
    courseId?: number;
}

const ProgramTrainingList = ({ groupId, courseId, ...props }: ProgramTrainingListProps) => {
    const { classes, cx } = useStyles();

    const { data: groupModulesData, hasNextPage, fetchNextPage, isLoading, isFetching } = useGroupModules({ ...initialParams, groupId });
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderModules = useMemo(
        () =>
            groupModulesData?.data.map((module, index) => (
                <Box key={module.id} ref={lastElemRef}>
                    <ProgramModule data={module} numberModule={index + 1} groupId={groupId} />
                </Box>
            )),
        [groupModulesData?.data]
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            {renderModules}
            {isFetching && <Loader />}
        </Flex>
    );
};

export default ProgramTrainingList;
