/*
 * Responsible for rendering the canvas window in the application.
 */
export default class CanvasWindowRenderer {
    /**
     * Initializes the canvas window renderer.
     * @param {CanvasWindowSettings} canvasWindowSettings - Settings for the canvas window.
     */
    constructor(canvasWindowSettings) {
        console.log('CanvasWindowRenderer initialized');
        this.canvasWindowSettings = canvasWindowSettings;

        this.canvas = document.getElementById(canvasWindowSettings.canvasElementId);
        if (!this.canvas) {
            throw new Error(`Canvas element with ID ${canvasWindowSettings.canvasElementId} not found.`);
        }
        
        this.canvasContext = this.canvas.getContext('2d');
        
        this.drawWindowFrame();
    }

    /**
     * Draws the window frame on the canvas.
     * */
    drawWindowFrame() {
        const context = this.canvasContext;

        this.resizeCanvas();
        //context.fillStyle = "white";

        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "#00FFFF";
        context.fillRect(0,0,canvas.width,canvas.height);//for white background

        context.globalCompositeOperation = "source-over";
        context.lineWidth = 1;
        context.strokeStyle="#FF0000";
        context.strokeRect(0, 0, canvas.width, canvas.height); //for red border
    }

    /**
     * Resizes the canvas based on the window pixel ratio and dimensions.
     */
    resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * pixelRatio * this.canvasWindowSettings.windowOpeningWidth;
        this.canvas.height = this.canvas.clientHeight * pixelRatio * this.canvasWindowSettings.windowOpeningHeight;
        //this.context.scale(pixelRatio, pixelRatio);
        console.log(`Canvas resized to ${this.canvas.width}x${this.canvas.height}`);
    }
}


