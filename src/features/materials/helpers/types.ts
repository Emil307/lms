import { z } from "zod";
import { ReactNode } from "react";
import { $uploadedFile, FileFormat } from "@shared/ui";

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
    materials: $uploadedFile.array().min(1, "Минимум 1 один файл"),
    files: $materialFile.array(),
    categoryIds: z.string().array(),
    isBinding: z.boolean(),
});
