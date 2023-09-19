import { ReactNode } from "react";
import { ImageProps } from "next/image";
import { DisplayFieldProps } from "@shared/ui";

export type TInfoCardImageProps = Omit<ImageProps, "src"> & {
    src?: string | null;
    children?: ReactNode;
};

export type TInfoCardDisplayFields<T> = (Omit<DisplayFieldProps, "render"> & {
    name: keyof T | string;
    renderString?: (value: T[keyof T], item?: T) => ReactNode;
    hidden?: ((value: T[keyof T], item?: T) => boolean) | boolean;
})[];
