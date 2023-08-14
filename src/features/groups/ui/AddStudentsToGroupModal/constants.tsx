import { MRT_ColumnDef } from "mantine-react-table";
import { UserFromList } from "@entities/user";
import { getFullName } from "@shared/utils";
import { AttachArticlesToArticlePackageFormValidation } from "./types";

export const initialValues: AttachArticlesToArticlePackageFormValidation = {
    ids: [],
};

export const columnOrder = ["mrt-row-select", "profile"];

export const columns: MRT_ColumnDef<UserFromList>["columns"] = [
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
