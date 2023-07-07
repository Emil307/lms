import { TInfoCardDisplayFields } from "@components/InfoCard";
import { GetAdminCourseCollectionResponse } from "@entities/courseCollection";

export const fields: TInfoCardDisplayFields<GetAdminCourseCollectionResponse> = [{ name: "name", label: "Название" }];
