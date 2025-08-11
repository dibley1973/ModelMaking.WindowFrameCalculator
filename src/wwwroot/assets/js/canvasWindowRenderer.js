/*
 * Responsible for rendering the canvas window in the application.
 */
export default class CanvasWindowRenderer {
    /**
     * Initializes the canvas window renderer.
     * @param {string} canvasElementId - The HTML element ID of the canvas.
     * @param {*} pixelMultiplier - The multiplier for pixel dimensions.
     * @throws Will throw an error if the canvas element is not found.
     */
    constructor(canvasElementId, pixelMultiplier) {
        this.pixelMultiplier = pixelMultiplier;
        
        //this.canvas = document.getElementById(canvasWindowSettings.canvasElementId);
        this.canvas = document.getElementById(canvasElementId);
        if (!this.canvas) {
            throw new Error(`Canvas element with ID ${canvasElementId} not found.`);
        }
        
        this.canvasContext = this.canvas.getContext('2d');
        //this.resizeCanvas();

        console.log('CanvasWindowRenderer initialized');
    }

    /**
     * Draws the window frame on the canvas.
     * @param {WindowSettings} windowSettings - Settings for the canvas window.
     * */
    drawWindowFrame(windowSettings) {
        console.log('Drawing window frame...');

        this.resizeCanvas(windowSettings);
        
        //this.windowSettings = windowSettings;

        const context = this.canvasContext;


        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "#EEEEEE"; // light gray background
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        context.globalCompositeOperation = "source-over";
        context.lineWidth = 1;
        context.strokeStyle="#999999"; // gray border
        context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

        context.strokeStyle = "#000000"; // black border for the window pane frame
        context.strokeRect(windowSettings.outerFrameWidth, windowSettings.outerFrameWidth, windowSettings.paneWidth, windowSettings.paneHeight);

        console.log(`Window frame drawn with pane dimensions: ${windowSettings.paneWidth} x ${windowSettings.paneHeight}`);
    }

    /**
     * Resizes the canvas based on the window pixel ratio and dimensions.
     * @param {WindowSettings} windowSettings - Settings for the canvas window.
     */
    resizeCanvas(windowSettings) {
        console.log('Resizing canvas...');
        
        //const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.pixelMultiplier * windowSettings.windowOpeningWidth;
        //this.canvas.width = this.canvas.clientWidth * pixelRatio * this.canvasWindowSettings.windowOpeningWidth;
        this.canvas.height = this.pixelMultiplier * windowSettings.windowOpeningHeight;
        //this.canvas.height = this.canvas.clientHeight * pixelRatio * this.canvasWindowSettings.windowOpeningHeight;

        console.log(`Canvas resized to ${this.canvas.width} x ${this.canvas.height}`);
    }
}


