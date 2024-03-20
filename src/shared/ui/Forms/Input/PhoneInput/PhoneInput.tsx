import { BoxProps } from "@mantine/core"
import { createDefaultMaskGenerator } from "react-hook-mask"
import { defaultPhoneCode, defaultPhoneMask } from "./constants"
import { MaskedInput, MaskedInputProps } from "../MaskedInput"

export interface PhoneInputProps extends Omit<MaskedInputProps, "maskGenerator"> {
    mask?: string
    code?: string
    wrapperProps?: Omit<BoxProps, "children">
}

export const PhoneInput = ({
    code = defaultPhoneCode,
    mask = defaultPhoneMask,
    onChange = () => undefined,
    wrapperProps,
    ...props
}: PhoneInputProps) => {
    const phoneMask = createDefaultMaskGenerator(mask)

    const handleChangeMaskedInput = (value: string) => {
        if (value) {
            return onChange(code.slice(1) + value)
        }
        return onChange(value)
    }

    return (
        <MaskedInput
            {...props}
            maskGenerator={phoneMask}
            className={props.className}
            onChange={handleChangeMaskedInput}
        />
    )
}
