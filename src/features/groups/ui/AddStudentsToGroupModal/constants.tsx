import { UserFromList } from "@entities/user";
import { getFullName } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";
import { AttachArticlesToArticlePackageFormValidation } from "./types";

export const initialValues: AttachArticlesToArticlePackageFormValidation = {
    ids: [],
};

export const columnOrder = ["mrt-row-select", "profile"];

export const columns: TColumns<UserFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 60,
    },
    {
        header: "Ученик",
        accessorKey: "profile",
        id: "fullName",
        accessorFn: ({ profile }) => getFullName({ data: profile }),
    },
];
