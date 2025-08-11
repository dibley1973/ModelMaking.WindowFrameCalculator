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

        // Draw the background
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "#EEEEEE"; // light gray background
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the outer frame
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 1;
        context.strokeStyle="#999999"; // gray border
        context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

        
        // Iterate through the number of rows and columns to draw the panes
        context.fillStyle = "#AAEEFF";  // light blue panes
        context.strokeStyle="#88AABB";  // bluey-gray border
        for (let rowIndex = 0; rowIndex < windowSettings.numberOfPaneRows; rowIndex++) {
            for (let columnIndex = 0; columnIndex < windowSettings.numberOfPaneColumns; columnIndex++) {
                // Calculate the position and size of each pane
                let startPositionX = windowSettings.outerFrameWidth + (columnIndex * windowSettings.paneWidth);
                let startPositionY = windowSettings.outerFrameWidth + (rowIndex * windowSettings.paneHeight);
                
                // Adjust x position for inner frame width if required
                if(columnIndex > 0) {
                    const spacer = windowSettings.innerFrameWidth * columnIndex;
                    startPositionX += spacer;
                }

                // Adjust y position for inner frame width if required
                if(rowIndex > 0) {
                    const spacer = windowSettings.innerFrameWidth * rowIndex;
                    startPositionY += spacer;
                }

                // Draw the pane background and frame
                const startPositionXMultiplied = startPositionX * this.pixelMultiplier;
                const startPositionYMultiplied = startPositionY * this.pixelMultiplier;

                context.fillRect(
                    startPositionXMultiplied,
                    startPositionYMultiplied,
                    windowSettings.paneWidth * this.pixelMultiplier,
                    windowSettings.paneHeight * this.pixelMultiplier);
                context.strokeRect(
                    startPositionXMultiplied,
                    startPositionYMultiplied,
                    windowSettings.paneWidth * this.pixelMultiplier,
                    windowSettings.paneHeight * this.pixelMultiplier);
                const startPostitionText = `${startPositionX}x${startPositionY}`;
                context.strokeText(
                    startPostitionText,
                    startPositionXMultiplied,
                    startPositionYMultiplied);
            }
        
        }

        // // Draw the firt pane. This will need to be in a loop once working!
        // context.strokeStyle = "#000000"; // black border for the window pane frame
        // context.strokeRect(
        //     windowSettings.outerFrameWidth * this.pixelMultiplier,
        //     windowSettings.outerFrameWidth * this.pixelMultiplier,
        //     windowSettings.paneWidth * this.pixelMultiplier,
        //     windowSettings.paneHeight * this.pixelMultiplier);

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


