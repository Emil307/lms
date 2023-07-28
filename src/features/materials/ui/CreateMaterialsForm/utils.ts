import { CreateMaterialsDataForm } from "@features/materials";
import { CreateMaterialsFormValidation } from "./types";

export const getInitialValues = (sessionStorageData: CreateMaterialsDataForm | null): CreateMaterialsFormValidation => ({
    materials: sessionStorageData?.materials || [],
});
