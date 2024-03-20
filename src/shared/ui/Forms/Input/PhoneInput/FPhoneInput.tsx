import React from "react"
import { useField } from "formik"
import { PhoneInput, PhoneInputProps } from "./PhoneInput"

export interface FPhoneInputProps extends PhoneInputProps {
    name: string
}

export function FPhoneInput({ ...props }: FPhoneInputProps) {
    const [field, meta, helpers] = useField<string>(props.name)

    const error = React.useMemo(() => meta.touched && meta.error, [meta.error, meta.touched])

    const handleChange = (value: string) => {
        helpers.setValue(value)
    }

    return (
        <PhoneInput
            {...props}
            onChange={handleChange}
            onBlur={field.onBlur}
            value={field.value}
            error={error}
        />
    )
}
