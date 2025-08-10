/**
 * Represents the settings for a canvas window.
 */
export default class CanvasWindowSettings {
    /**
     * Initializes the default settings for the canvas window.
     */
    constructor() {
        this.canvasElementId = '';
        this.windowPixelRatio = 10;
        this.windowOpeningHeight = 0;
        this.windowOpeningWidth = 0;
        this.numberOfPaneColumns = 0;
        this.numberOfPaneRows = 0;
        this.outerFrameWidth = 0;
        this.innerFrameWidth = 0;
        this.paneHeight = 0;
        this.paneWidth = 0;
    }

    setCanvasElementId(id) {
        this.canvasElementId = id;
    }

    setWindowPixelRatio(ratio) {
        this.windowPixelRatio = ratio;
    }

    setWindowOpeningHeight(height) {
        this.windowOpeningHeight = height;
    }

    setWindowOpeningWidth(width) {
        this.windowOpeningWidth = width;
    }

    setNumberOfPaneColumns(columns) {
        this.numberOfPaneColumns = columns;
    }

    setNumberOfPaneRows(rows) {
        this.numberOfPaneRows = rows;
    }

    setOuterFrameWidth(width) {
        this.outerFrameWidth = width;
    }

    setInnerFrameWidth(width) {
        this.innerFrameWidth = width;
    }

    setPaneHeight(height) {
        this.paneHeight = height;
    }

    setPaneWidth(width) {
        this.paneWidth = width;
    }

}
