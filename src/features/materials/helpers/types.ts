import { z } from "zod";
import { ReactNode } from "react";
import { FileFormat } from "@shared/ui";
import { $UploadedFile } from "@shared/types";

export type MaterialFile = z.infer<typeof $materialFile>;

export type CreateMaterialsDataForm = z.infer<typeof $createMaterialsDataForm>;

export interface FileTypeCard {
    id: number;
    title: string;
    icon: ReactNode;
    type: "document" | "video";
    fileFormats: FileFormat[];
    description?: string;
}

export const $materialFile = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
});

export const $createMaterialsDataForm = z.object({
    materials: $UploadedFile.array().min(1, "Минимум 1 один файл"),
    files: $materialFile.array(),
    categoryIds: z.string().array(),
    isBinding: z.boolean(),
});
