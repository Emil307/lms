export const getAnswerLetterFromRussianAlphabet = (answerIndex: number) => {
    const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ";

    return alphabet[answerIndex - 1];
};
