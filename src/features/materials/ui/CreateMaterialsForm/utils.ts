import { CreateMaterialsDataForm } from "@features/materials/helpers";
import { CreateMaterialsFormValidation } from "./types";

export const getInitialValues = (sessionStorageData: CreateMaterialsDataForm | null): CreateMaterialsFormValidation => ({
    files: sessionStorageData?.files || [],
});
