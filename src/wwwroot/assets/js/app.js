/**
 * App class for managing application state and behavior.
 */
class App {
    constructor() {
        console.log('App initialized');
        this.assignElements();
        this.validateElements();

    }

    assignElements() {
        this.form = document.getElementById('calculator-form');

        this.windowOpeningHeightField = document.getElementById('window-opening-height');
        this.windowOpeningWidthField = document.getElementById('window-opening-width');
        this.numberOfPaneColumnsField = document.getElementById('number-of-columns-of-panes');
        this.numberOfPaneRowsField = document.getElementById('number-of-rows-of-panes');
        this.outerFrameWidthField = document.getElementById('outer-frame-width');
        this.innerFrameWidthField = document.getElementById('inner-frame-width');

        this.submitButton = document.getElementById('calculate-sizes');
        this.submitButton.addEventListener('click', this.calculateSizes.bind(this));
        
        this.paneWidthElemnt = document.getElementById('pane-width');
        this.paneHeightElemnt = document.getElementById('pane-height');

        /* TODO: uncomment when reset functionality is needed in issue #4
        this.resetButton = document.getElementById('reset-form');
        this.resetButton.addEventListener('click', this.handleReset.bind(this));
        */
    }

    /**
     * Handles the submit button click event.
     * Prevents default form submission and logs a message.
     */
    calculateSizes(event) {
        event.preventDefault();
        console.log('Form submitted, calculating sizes');
        // Additional logic for form submission can be added here
    }

    /**
     * Validates the presence of required elements.
     */
    validateElements() {
        var errors = [];

        if (!this.form) {
            errors.push('Form element is missing');
        }
        if (!this.windowOpeningHeightField) {
            errors.push('Window opening height field is missing');
        }
        if (!this.windowOpeningWidthField) {
            errors.push('Window opening width field is missing');
        }
        if (!this.numberOfPaneColumnsField) {
            errors.push('Number of pane columns field is missing');
        }
        if (!this.numberOfPaneRowsField) {
            errors.push('Number of pane rows field is missing');
        }
        if (!this.outerFrameWidthField) {
            errors.push('Outer frame width field is missing');
        }
        if (!this.innerFrameWidthField) {
            errors.push('Inner frame width field is missing');
        }
        if (!this.submitButton) {
            errors.push('Submit button is missing');
        }
        /* TODO: uncomment when reset functionality is needed in issue #4
        if (!this.resetButton) {
            errors.push('Reset button is missing');
        }
        */
        if (!this.paneWidthElemnt) {
            errors.push('Pane width element is missing');
        }
        if (!this.paneHeightElemnt) {   
            errors.push('Pane height element is missing');
        }

        if (errors.length > 0) {
            console.error('Validation errors:', errors.join(', '));
            throw new Error('Validation failed: ' + errors.join(', '));
        } else {
            console.log('All elements are present and valid');
        }
    }
}

const app = new App();