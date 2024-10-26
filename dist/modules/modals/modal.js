"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCloseModalHandlers = exports.closeModal = exports.openModal = void 0;
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
};
exports.openModal = openModal;
const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
};
exports.closeModal = closeModal;
const setupCloseModalHandlers = () => {
    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function () {
            var _a, _b;
            (0, exports.closeModal)((_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id);
        });
    }
    window.onclick = function (event) {
        const chooseModal = document.getElementById("chooseModal");
        const resultModal = document.getElementById("resultModal");
        if (event.target == chooseModal) {
            (0, exports.closeModal)("chooseModal");
        }
        if (event.target == resultModal) {
            (0, exports.closeModal)("resultModal");
        }
    };
};
exports.setupCloseModalHandlers = setupCloseModalHandlers;
