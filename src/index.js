export default class DateInputHelper {
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
            if (event.target.dataset.nextId) {
                document.getElementById(event.target.dataset.nextId).focus();
            }
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    static focusOnPreviousInput(event)
    {
        if (event.target.dataset.previousId) {
            document.getElementById(event.target.dataset.previousId).focus();
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @return {void}
     */
    static handleDobInput(event) {
        if (!DateInputHelper.isNumericOrSpecialKey(event)) {
            DateInputHelper.dropLastKeystroke(event);
        }
        // If input is empty and backspace is pressed, go to previous input if applicable
        if (event.key === 'Backspace' && event.target.value.length === 0) {
            DateInputHelper.focusOnPreviousInput(event);
        } else {
            // If input reaches maxlength, go to next input if applicable
            DateInputHelper.focusOnNextInput(event);
        }
    }
}
