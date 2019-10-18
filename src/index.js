export default class Inswitch {
    /**
     * @param {String} containerSelector
     * @return {void}
     */
    constructor(containerSelector) {
        document.addEventListener('DOMContentLoaded', () => {
            this.setup(containerSelector);
        }, false);
    }

    /**
     * @param {String} containerSelector
     * @return {void}
     */
    setup(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.inputs = this.container.querySelectorAll('input');
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].dataset.inswitchId = i;
            this.inputs[i].dataset.previousLength = 0;
            this.inputs[i].addEventListener('keyup', this, false);
            this.inputs[i].addEventListener('keydown', (event) => {
                event.target.dataset.previousLength = event.target.value.length;
            }, false);
        }
    }

    /**
     * @param {int} id
     * @return {void}
     */
    focusWithCursorAtEnd(id)
    {
        let inputElement = document.querySelector('[data-inswitch-id="'+id+'"]');
        let value = inputElement.value;
        inputElement.value = '';
        inputElement.value = value;
        inputElement.focus();
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    focusOnNextInput(event)
    {
        if (!['Backspace','Tab','Delete'].includes(event.key)
            && event.target.value.length >= event.target.maxLength
        ) {
            let nextId = parseInt(event.target.dataset.inswitchId) + 1;
            if (nextId < this.inputs.length) {
                this.focusWithCursorAtEnd(nextId);
            }
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    focusOnPreviousInput(event)
    {
        let previousId = parseInt(event.target.dataset.inswitchId) - 1;
        if (previousId >= 0) {
            this.focusWithCursorAtEnd(previousId);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    handleEvent(event) {
        if (event.key === 'Backspace'
            && event.target.value.length === 0
            && parseInt(event.target.dataset.previousLength) === 0
        ) {
            this.focusOnPreviousInput(event);
        } else {
            this.focusOnNextInput(event);
        }
    }
};
export var __useDefault = true;
