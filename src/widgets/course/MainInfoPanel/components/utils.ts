export const getPlaceWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return "мест";
    }

    if (lastDigit === 1) {
        return "место";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "места";
    }

    return "мест";
};
