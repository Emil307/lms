import { Box, BoxProps } from "@mantine/core";
import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminAddGroupStudentsExtraFilters, useAttachStudentsToGroup } from "@entities/group";
import { UserFromList, userApi } from "@entities/user";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminStudentsRequest } from "./utils";

export interface AddStudentsToGroupModalProps extends Omit<BoxProps, "children"> {
    groupId: string;
    courseId: number;
    onClose: () => void;
}

const AddStudentsToGroupModal = ({ groupId, courseId, onClose, ...props }: AddStudentsToGroupModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const attachStudentsToGroup = useAttachStudentsToGroup({ groupId });

    const handleSubmit = () => {
        attachStudentsToGroup.mutate(
            { ids: selected.map((item) => Number(item)) },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<UserFromList, unknown, AdminAddGroupStudentsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP}
                queryFunction={(params) => userApi.getAdminStudents(adaptGetAdminStudentsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "groupId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Учеников"
                extraFilterParams={{ groupId, courseId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}
            />
            <ControlButtons
                variant="modalTable"
                cancelButtonText="Отмена"
                submitButtonText="Добавить"
                onClose={onClose}
                onSubmit={handleSubmit}
                disabledSubmit={!selected.length}
                mt={14}
            />
        </Box>
    );
};

export default AddStudentsToGroupModal;
