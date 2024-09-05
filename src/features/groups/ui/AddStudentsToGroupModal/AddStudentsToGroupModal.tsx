import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useAttachStudentsToGroup } from "@entities/group";
import { UserFromList } from "@entities/user";
import { AdminCourseStudentsRequestExtraFilter, courseApi } from "@entities/course";
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
            <ManagedDataGrid<UserFromList, unknown, AdminCourseStudentsRequestExtraFilter>
                queryKey={[QueryKeys.GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.STUDENT]]}
                queryFunction={(params) => courseApi.getAdminCourseStudents(adaptGetAdminStudentsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "attachableToCourse"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Учеников"
                initialState={{
                    columnOrder,
                }}
                extraFilterParams={{ attachableToCourse: courseId }}
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
