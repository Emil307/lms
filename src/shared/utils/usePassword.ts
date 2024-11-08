import { useToggle } from "@mantine/hooks";

export interface UsePasswordProps {
    isPasswordVisible: boolean;
    toggleVisibility: () => void;
}

export const usePassword = (): UsePasswordProps => {
    const [isPasswordVisible, toggleVisibility] = useToggle();

    return { isPasswordVisible, toggleVisibility };
};
