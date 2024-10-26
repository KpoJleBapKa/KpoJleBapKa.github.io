export const openModal = (modalId: string): void => {
    const modal = document.getElementById(modalId) as HTMLElement;
    modal.style.display = "block";
};

export const closeModal = (modalId: string): void => {
    const modal = document.getElementById(modalId) as HTMLElement;
    modal.style.display = "none";
};

export const setupCloseModalHandlers = (): void => {
    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function(this: HTMLElement) {
            closeModal(this.parentElement?.parentElement?.id as string);
        });
    }

    window.onclick = function(event: MouseEvent) {
        const chooseModal = document.getElementById("chooseModal") as HTMLElement;
        const resultModal = document.getElementById("resultModal") as HTMLElement;
        if (event.target == chooseModal) {
            closeModal("chooseModal");
        }
        if (event.target == resultModal) {
            closeModal("resultModal");
        }
    };
};
