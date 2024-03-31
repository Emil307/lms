import { Box, BoxProps, Flex } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useGroupModules } from "@entities/group";
import { EmptyData, Loader } from "@shared/ui";
import IconEmptyBox from "@public/icons/emptyBox.svg";
import { useIntersection } from "@shared/utils";
import { ProgramModule } from "./components";
import { initialParams } from "./constants";
import useStyles from "./MaterialsProgramTrainingList.styles";

export interface MaterialsProgramTrainingListProps extends Omit<BoxProps, "children"> {
    groupId: string;
}

const MaterialsProgramTrainingList = ({ groupId, ...props }: MaterialsProgramTrainingListProps) => {
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
                    <ProgramModule data={module} numberModule={index + 1} />
                </Box>
            )),
        [groupModulesData?.data]
    );

    if (isLoading) {
        return <Loader />;
    }

    if (!groupModulesData?.data.length) {
        return <EmptyData title="Материалы отсутствуют" description="" icon={<IconEmptyBox />} />;
    }

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            {renderModules}
            {isFetching && <Loader />}
        </Flex>
    );
};

export default MaterialsProgramTrainingList;
