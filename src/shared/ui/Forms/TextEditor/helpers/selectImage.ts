export const selectImage = (): Promise<File> => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    return new Promise((resolve) => {
        input.addEventListener("change", () => {
            const files = input.files;
            if (!files) {
                return;
            }
            resolve(files[0]);
        });
    });
};
