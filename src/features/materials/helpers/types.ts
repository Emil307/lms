import { z } from "zod";
import { ReactNode } from "react";
import { FileFormat } from "@shared/ui";
import { $UploadedFile } from "@shared/types";
import { $UploadedFileFromList } from "@entities/storage";

export interface IMaterialTypeCard {
    id: number;
    title: string;
    description: string;
    icon: ReactNode;
    type: "document" | "video" | "images";
    fileFormats: FileFormat[];
}

export type CreateMaterialsDataForm = z.infer<typeof $createMaterialsDataForm>;

export type MaterialFile = z.infer<typeof $MaterialFile>;

export const $MaterialFile = $UploadedFileFromList.pick({
    id: true,
    name: true,
    extension: true,
});

export const $createMaterialsDataForm = z.object({
    files: z.array($UploadedFile).min(1, "Минимум 1 файл"),
    materials: z.array($MaterialFile),
    categoryIds: z.array(z.string()),
    isBinding: z.boolean(),
});
