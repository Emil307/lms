export const normalizeRange = (arr: [number, number], minVal: number, maxVal: number): [number, number] => {
    let [a, b] = arr;

    if (a > b) {
        [a, b] = [b, a];
    }

    a = Math.max(minVal, Math.min(a, maxVal));
    b = Math.max(minVal, Math.min(b, maxVal));

    return [a, b];
};
