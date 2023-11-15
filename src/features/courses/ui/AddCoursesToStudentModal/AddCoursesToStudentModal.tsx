import { Box, BoxProps } from "@mantine/core";
import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { useAttachCoursesToStudent } from "@entities/course";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminCoursesRequest } from "./utils";
import { StudentCourseListExtraParams } from "./types";

export interface AddCoursesToStudentModalProps extends Omit<BoxProps, "children"> {
    studentId: string;
    onClose: () => void;
}

const AddCoursesToStudentModal = ({ studentId, onClose, ...props }: AddCoursesToStudentModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const attachCoursesToStudent = useAttachCoursesToStudent({ studentId });

    const handleSubmit = () => {
        attachCoursesToStudent.mutate(
            { ids: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminCourseFromList, unknown, StudentCourseListExtraParams>
                queryKey={QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES}
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
                disabledSubmit={!selected.length}
                mt={14}
            />
        </Box>
    );
};

export default AddCoursesToStudentModal;
