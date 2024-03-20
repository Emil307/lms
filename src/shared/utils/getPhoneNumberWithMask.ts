import { createDefaultMaskGenerator, mask as getMask } from "react-hook-mask"
import { defaultPhoneMask } from "@shared/ui"

interface GetPhoneNumberWithMaskProps {
    mask?: string
    phoneNumber?: string | null
}

export const getPhoneNumberWithMask = ({ mask = defaultPhoneMask, phoneNumber }: GetPhoneNumberWithMaskProps) => {
    const maskGenerator = createDefaultMaskGenerator(mask)

    return getMask(phoneNumber || "", maskGenerator)
}