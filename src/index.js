export default class Inswitch {
    /**
     * @param {String} containerSelector
     */
    constructor(containerSelector) {
        document.addEventListener('DOMContentLoaded', () => {
            this.setup(containerSelector);
        }, false);
    }

    /**
     * @param {String} containerSelector
     */
    setup(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.inputs = this.container.querySelectorAll('input');
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].dataset.inswitchId = i;
            this.inputs[i].addEventListener("keydown", Inswitch.handleInput, false);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {boolean}
     */
    static isNumericOrSpecialKey(event) {
        let isSpecialKey = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete'].includes(event.key);
        let number = parseInt(event.key);
        return (isSpecialKey || (number >= 0 && number <= 9));
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    static dropLastKeystroke(event) {
        event.target.value = event.target.value.replace(event.key, '');
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    static focusOnNextInput(event)
    {
        if (!['Backspace','Tab','Delete'].includes(event.key) && event.target.value.length >= event.target.maxLength) {
            let nextId = parseInt(event.target.dataset.inswitchId) + 1;
            if (nextId < 3) {
                document.querySelector('[data-inswitch-id="'+nextId+'"]').focus();
            }
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    static focusOnPreviousInput(event)
    {
        let previousId = parseInt(event.target.dataset.inswitchId) - 1;
        if (previousId >= 0) {
            document.querySelector('[data-inswitch-id="'+previousId+'"]').focus();
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    static handleInput(event) {
        if (!Inswitch.isNumericOrSpecialKey(event)) {
            Inswitch.dropLastKeystroke(event);
        }
        // If input is empty and backspace is pressed, go to previous input if applicable
        if (event.key === 'Backspace' && event.target.value.length === 0) {
            Inswitch.focusOnPreviousInput(event);
        } else {
            // If input reaches maxlength, go to next input if applicable
            Inswitch.focusOnNextInput(event);
        }
    }
}
