/**
 * Represents the settings for the window frame calculator.
 */
export default class WindowSettings {
    /**
     * Initializes the default settings for the  window.
     */
    constructor() {
        this.windowOpeningHeight = 0;
        this.windowOpeningWidth = 0;
        this.numberOfPaneColumns = 0;
        this.numberOfPaneRows = 0;
        this.outerFrameWidth = 0;
        this.innerFrameWidth = 0;
        this.paneHeight = 0;
        this.paneWidth = 0;
    }

    /**
     * Calculates the total number of panes based on the number of columns and rows.
     * @returns {number} The total number of panes.
     */
    numberOfPanes() {
        return this.numberOfPaneColumns * this.numberOfPaneRows;
    }
}