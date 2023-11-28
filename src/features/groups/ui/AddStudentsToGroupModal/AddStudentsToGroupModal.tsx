import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminAddGroupStudentsExtraFilters, useAttachStudentsToGroup } from "@entities/group";
import { UserFromList, userApi } from "@entities/user";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminStudentsRequest } from "./utils";

export interface AddStudentsToGroupModalProps {
    groupId: string;
    courseId: number;
    onClose: () => void;
}

const AddStudentsToGroupModal = ({ groupId, courseId, onClose }: AddStudentsToGroupModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const { mutate: attachStudentsToGroup, isLoading } = useAttachStudentsToGroup({ groupId });

    const handleSubmit = () => {
        attachStudentsToGroup(
            { ids: selected.map((item) => Number(item)) },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            <ManagedDataGrid<UserFromList, unknown, AdminAddGroupStudentsExtraFilters>
                queryKey={[QueryKeys.GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.STUDENT]]}
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
                isLoading={isLoading}
                disabledSubmit={!selected.length}
                mt={24}
            />
        </>
    );
};

export default AddStudentsToGroupModal;
