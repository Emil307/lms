import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminArticlePackageFromList, articlePackageApi, useAttachArticlePackagesToStudent } from "@entities/articlePackage";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminArticlePackagesRequest } from "./utils";
import { StudentArticlePackageListExtraParams } from "./types";

export interface AddArticlePackagesToStudentModalProps {
    studentId: string;
    onClose: () => void;
}

const AddArticlePackagesToStudentModal = ({ studentId, onClose }: AddArticlePackagesToStudentModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const { mutate: attachArticlePackagesToStudent, isLoading } = useAttachArticlePackagesToStudent({ studentId });

    const handleSubmit = () => {
        attachArticlePackagesToStudent(
            { articlePackageIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            <ManagedDataGrid<AdminArticlePackageFromList, unknown, StudentArticlePackageListExtraParams>
                queryKey={[
                    QueryKeys.GET_ADMIN_NO_STUDENT_ARTICLE_PACKAGES,
                    [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.STUDENT],
                ]}
                queryFunction={(params) => articlePackageApi.getAdminArticlePackages(adaptGetAdminArticlePackagesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Пакетов"
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

export default AddArticlePackagesToStudentModal;
