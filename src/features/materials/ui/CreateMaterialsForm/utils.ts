import { CreateMaterialsDataForm } from "@features/materials";
import { CreateMaterialsFormValidationSchema } from "./types";

export const getInitialValues = (sessionStorageData: CreateMaterialsDataForm | null): CreateMaterialsFormValidationSchema => ({
    materials: sessionStorageData?.materials || [],
});
