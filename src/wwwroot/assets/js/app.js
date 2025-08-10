/**
 * App class for managing application state and behavior.
 */
class App {
    constructor() {
        console.log('App initialized');
        this.assignElements();
        this.validateElements();

        this.canvasWindowSettings = new CanvasWindowSettings();
        this.canvasWindowSettings.setCanvasElementId('window-canvas');
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
        this.calculatAndSetPaneWidth();
        this.calculateAndSetPaneHeight();

        // Initialize the canvas window renderer with the settings
        const canvasWindowRenderer = new CanvasWindowRenderer(this.canvasWindowSettings);
        canvasWindowRenderer.resizeCanvas();
        canvasWindowRenderer.drawWindowFrame();
    }

    calculateAndSetPaneHeight() {
        const windowHeight = parseFloat(this.windowOpeningHeightField.value);
        const outerFrameWidth = parseFloat(this.outerFrameWidthField.value);
        const innerFrameWidth = parseFloat(this.innerFrameWidthField.value);
        const numberOfRows = parseInt(this.numberOfPaneRowsField.value, 10);
        
        if (isNaN(windowHeight) || isNaN(outerFrameWidth) || isNaN(innerFrameWidth) || isNaN(numberOfRows)) {
            console.error('Invalid input values for pane height calculation');
            return;
        }

        const totalOuterFrameHeight = outerFrameWidth * 2; // Outer frame on both sides
        const totalInnerFrameHeight = innerFrameWidth * (numberOfRows - 1); // Inner frame between rows
        const totalFrameHeight = totalOuterFrameHeight + totalInnerFrameHeight;
        const paneHeight = (windowHeight - totalFrameHeight) / numberOfRows;

        if (paneHeight <= 0) {
            console.error('Calculated pane height is not valid');
        }

        this.paneHeightElemnt.textContent = `${paneHeight.toFixed(2)}`;
    }
    /**
     * Calculates and sets the pane width based on the input fields.
     * Assumes the formula:
     * Pane Width = (Window Width - (Outer Frame Width * 2) - (Inner Frame Width * (Number of Columns - 1))) / Number of Columns
     * @returns {void}
     * @throws {Error} If any of the input values are invalid or missing.
     */
    calculatAndSetPaneWidth() {
        const windowWidth = parseFloat(this.windowOpeningWidthField.value);
        const outerFrameWidth = parseFloat(this.outerFrameWidthField.value);
        const innerFrameWidth = parseFloat(this.innerFrameWidthField.value);
        const numberOfColumns = parseInt(this.numberOfPaneColumnsField.value, 10);

        if (isNaN(windowWidth) || isNaN(outerFrameWidth) || isNaN(innerFrameWidth) || isNaN(numberOfColumns)) {
            console.error('Invalid input values for pane width calculation');
            return;
        }

        const totalOuterFrameWidth = outerFrameWidth * 2; // Outer frame on both sides
        const totalInnerFrameWidth = innerFrameWidth * (numberOfColumns - 1); // Inner frame between columns
        const totalFrameWidth = totalOuterFrameWidth + totalInnerFrameWidth;
        const paneWidth = (windowWidth - totalFrameWidth) / numberOfColumns;

        if (paneWidth <= 0) {
            console.error('Calculated pane width is not valid');
        }

        this.paneWidthElemnt.textContent = `${paneWidth.toFixed(2)}`;
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