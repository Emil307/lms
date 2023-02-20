import { TextInput as MInput } from "@mantine/core";
import { memo } from "react";
export interface InputProps extends React.ComponentProps<typeof MInput> {}

const MemoizedInput = memo(function Input(props: InputProps) {
    return <MInput {...props} />;
});

export default MemoizedInput;
