export const getAnswerLetter = (answerIndex: number) => {
    switch (answerIndex) {
        case 1:
            return "А";
        case 2:
            return "Б";
        case 3:
            return "В";
        case 4:
            return "Г";
        case 5:
            return "Д";
        default:
            return "А";
    }
};
