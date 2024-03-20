import React, { useCallback, useState } from "react"
import { MaskGenerator, useWebMask } from "react-hook-mask"
import { MantineSize, TextInput, TextInputProps } from "@mantine/core"
import { AlertTriangle } from "react-feather";
import { useInputStyles } from "@shared/styles"
import { Paragraph } from "@shared/ui"

type MantineInputProps = TextInputProps & React.ComponentPropsWithRef<"input">

export interface MaskedInputProps extends Omit<MantineInputProps, "onChange" | "size"> {
    onChange?: (val: string) => void
    maskGenerator: MaskGenerator
    keepMask?: boolean
    size?: MantineSize
}

export function MaskedInput({ keepMask = false, maskGenerator, value, size, error, ...props }: MaskedInputProps) {
    const [focused, setFocused] = useState(false);

    const { classes } = useInputStyles({
        floating: !!value?.toString().length || focused,
        icon: props.icon,
        size,
    });

    const maskProps = useWebMask({
        maskGenerator,
        value: value as string,
        onChange: (val) => props.onChange?.(val),
        keepMask,
    })

    const renderError = useCallback(() => {
        if (!error) {
            return null
        }
        return (
            <>
                <AlertTriangle />
                <Paragraph variant="text-smaller">{error}</Paragraph>
            </>
        )
    }, [error]);

    return (
        <TextInput
            {...props}
            {...maskProps}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
                props.onBlur && props.onBlur(event);
                setFocused(false);
            }}
            classNames={classes}
            className={(props.className)}
            error={renderError()}
        />
    )
}
