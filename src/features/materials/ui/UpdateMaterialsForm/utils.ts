import { REGEXP_FILE_EXTENSION } from "@shared/constant";
import { UpdateUploadedFilesRequest } from "@entities/storage";
import { CreateMaterialsDataForm } from "@features/materials";
import { UploadedFile } from "@shared/types";
import { MaterialFile, UpdateMaterialsFormValidation } from "./types";

interface TGetInitialValues {
    sessionStorageData: CreateMaterialsDataForm | null;
    data: MaterialFile[];
    hasCategories?: boolean;
}

export const getInitialValues = ({
    sessionStorageData,
    data,
    hasCategories = false,
}: TGetInitialValues): UpdateMaterialsFormValidation => ({
    files: data,
    isBinding: hasCategories,
    ...sessionStorageData,
});

export const adaptUpdateMaterialsInitialValues = (data: UploadedFile[]): Partial<UpdateMaterialsFormValidation> => {
    return {
        files: data.map((file) => ({ id: file.id, name: file.name.replace(REGEXP_FILE_EXTENSION, ""), extension: file.extension })),
    };
};

export const adaptUpdateMaterialsFormRequest = (
    data: UpdateMaterialsFormValidation,
    categoryIds?: string[]
): UpdateUploadedFilesRequest => {
    const isBinding = data.isBinding && !!categoryIds?.length;
    return {
        files: data.files.map(({ id, name }) => ({ id, name })),
        categoryIds: isBinding ? categoryIds.map((id) => Number(id)) : [],
    };
};
