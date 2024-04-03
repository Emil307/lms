import { useIntersection as useMantineIntersection } from "@mantine/hooks";

interface UseIntersectionReturnType<T extends HTMLElement> {
    ref: (element: T) => void;
    entry: IntersectionObserverEntry | null;
}

export const useIntersection = <T extends HTMLElement = any>(options?: Parameters<typeof useMantineIntersection>[0]) => {
    const { ref, entry } = useMantineIntersection(options);

    return { ref, entry } as UseIntersectionReturnType<T>;
};
