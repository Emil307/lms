import { UpdateUploadedFilesRequest, UploadedFileFromList } from "@entities/storage";
import { getArrayUniqueByKey } from "@shared/utils";
import { CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY, MaterialFile } from "@features/materials/helpers";
import { UpdateMaterialsFormValidation } from "./types";

interface TGetInitialValues {
    sessionStorageData: CreateMaterialsDataForm | null;
    data?: UploadedFileFromList;
}

export const getInitialValues = ({ sessionStorageData, data }: TGetInitialValues): UpdateMaterialsFormValidation => {
    const materials = sessionStorageData?.materials || [];
    const categoryIds = sessionStorageData?.categoryIds || [];
    const isBinding = !!sessionStorageData?.isBinding;

    if (data) {
        const { id, name, extension, categories } = data;
        const initialValues = {
            isBinding: isBinding || !!categories.length,
            categoryIds: categoryIds.length ? categoryIds : categories.map((category) => String(category.id)),
            materials: materials.length
                ? materials.map((material) => ({ ...material, name: material.name.replace(new RegExp(`.${material.extension}$`), "") }))
                : [{ id, name: name.replace(new RegExp(`.${extension}$`), ""), extension }],
        };
        sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...initialValues }));
        return initialValues;
    }

    const files = sessionStorageData?.files || [];

    if (!files.length) {
        return {
            isBinding: false,
            categoryIds: [],
            materials: [],
        };
    }

    const objectFiles = files.reduce(
        (prev, { id, name, extension }) => ({ ...prev, [id]: { id, name, extension } }),
        {} as { [key: number]: MaterialFile }
    );
    const filesArr = files.map(({ id, name, extension }) => ({ id, name: name.replace(new RegExp(`.${extension}$`), ""), extension }));

    const materialValues = materials.reduce((prev, curr) => {
        if (objectFiles[curr.id]) {
            return [...prev, curr];
        }
        return prev;
    }, [] as MaterialFile[]);

    return {
        isBinding,
        categoryIds,
        materials: getArrayUniqueByKey(materialValues.concat(filesArr), "id"),
    };
};

export const adaptUpdateMaterialsFormRequest = (data: UpdateMaterialsFormValidation): UpdateUploadedFilesRequest => {
    const isBinding = data.isBinding && !!data.categoryIds.length;
    return {
        files: data.materials.map(({ id, name, extension }) => ({ id, name: `${name}.${extension}` })),
        categoryIds: isBinding ? data.categoryIds.map((id) => Number(id)) : [],
    };
};
