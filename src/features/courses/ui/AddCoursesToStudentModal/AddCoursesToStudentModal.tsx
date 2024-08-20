import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi, useAttachCoursesToStudent } from "@entities/course";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminCoursesRequest } from "./utils";
import { StudentCourseListExtraParams } from "./types";

export interface AddCoursesToStudentModalProps {
    studentId: string;
    onClose: () => void;
}

const AddCoursesToStudentModal = ({ studentId, onClose }: AddCoursesToStudentModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const { mutate: attachCoursesToStudent, isLoading } = useAttachCoursesToStudent({ studentId });

    const handleSubmit = () => {
        attachCoursesToStudent(
            { ids: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            <ManagedDataGrid<AdminCourseFromList, unknown, StudentCourseListExtraParams>
                queryKey={[
                    QueryKeys.GET_ADMIN_NO_STUDENT_COURSES,
                    [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER, EntityNames.STUDENT],
                ]}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Курсов"
                extraFilterParams={{ studentId }}
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

export default AddCoursesToStudentModal;
