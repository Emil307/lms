import { Box, Flex } from "@mantine/core";
import { BoxProps } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminGroupScheduleFromList, AdminGroupStudentsExtraFilters, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@shared/types";
import { columnOrder, columns } from "./constant";
import { CreateGroupScheduleButton, ListMenu } from "./components";
import useStyles from "./GroupScheduleList.styles";

export interface GroupScheduleListProps extends BoxProps {
    groupId: string;
}

const GroupScheduleList = ({ groupId, ...props }: GroupScheduleListProps) => {
    const { classes } = useStyles();

    const userRole = useUserRole();

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Расписание группы</Heading>
                <CreateGroupScheduleButton groupId={groupId} hidden={userRole?.name === Roles.teacher} />
            </Flex>

            <ManagedDataGrid<AdminGroupScheduleFromList, unknown, AdminGroupStudentsExtraFilters>
                queryKey={[QueryKeys.GET_ADMIN_GROUP_SCHEDULES, [EntityNames.GROUP]]}
                queryFunction={(params) => groupApi.getAdminGroupSchedules(params)}
                queryCacheKeys={["page", "perPage", "sort", "groupId"]}
                columns={columns}
                countName="Занятий"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ groupId }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default GroupScheduleList;
