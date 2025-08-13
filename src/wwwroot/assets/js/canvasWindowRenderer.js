/*
 * Responsible for rendering the canvas window in the application.
 */
export default class CanvasWindowRenderer {
    #canvas
    #canvasContext
    #fontSize
    #pixelMultiplier;
    
    /**
     * Initializes the canvas window renderer.
     * @param {string} canvasElementId - The HTML element ID of the canvas.
     * @param {*} pixelMultiplier - The multiplier for pixel dimensions.
     * @throws Will throw an error if the canvas element is not found.
     **/
    constructor(canvasElementId, pixelMultiplier) {
        this.#pixelMultiplier = pixelMultiplier;
        this.#fontSize = 20; // Default font size
        
        //this.#canvas = document.getElementById(canvasWindowSettings.canvasElementId);
        this.#canvas = document.getElementById(canvasElementId);
        if (!this.#canvas) {
            throw new Error(`Canvas element with ID ${canvasElementId} not found.`);
        }
        
        this.#canvasContext = this.#canvas.getContext('2d');

        console.log('CanvasWindowRenderer initialized for element:', canvasElementId);
    }


    /**
     * Draws the window frame on the canvas.
     * @param {WindowSettings} windowSettings - Settings for the canvas window.
     * @throws Will throw an error if the windowSettings object is invalid.
     * @returns {CanvasWindowRenderer} The instance of the CanvasWindowRenderer for method chaining
     **/
    drawWindowFrame(windowSettings) {
        console.log('Drawing window frame...');

        // Validate the windowSettings object
        if (!windowSettings || typeof windowSettings !== 'object') {
            throw new Error('Invalid window settings provided.');
        }

        this.#resizeCanvas(windowSettings)
            .#drawWindowBackground()
            .#drawWindowBorder()
            .#drawWindowPanes(windowSettings);       

        console.log(`Window frame drawn with pane dimensions: ${windowSettings.paneWidth} x ${windowSettings.paneHeight}`);
    }

    /**
     * Draws the window panes based on the provided settings.
     * @param {WindowSettings} windowSettings - Settings for the window panes.
     * @returns {CanvasWindowRenderer} The instance of the CanvasWindowRenderer for method chaining
     **/
    #drawWindowPanes(windowSettings) {
        console.log('Drawing window panes...');

        const context = this.#canvasContext;

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
                const startPositionXMultiplied = startPositionX * this.#pixelMultiplier;
                const startPositionYMultiplied = startPositionY * this.#pixelMultiplier;

                // Draw filled rectangle for the pane
                context.fillRect(
                    startPositionXMultiplied,
                    startPositionYMultiplied,
                    windowSettings.paneWidth * this.#pixelMultiplier,
                    windowSettings.paneHeight * this.#pixelMultiplier);

                // Draw the border for the pane
                context.strokeRect(
                    startPositionXMultiplied,
                    startPositionYMultiplied,
                    windowSettings.paneWidth * this.#pixelMultiplier,
                    windowSettings.paneHeight * this.#pixelMultiplier);

                // Draw the top-left corner position as dimensions text
                const topLeftPositionText = `${startPositionX}x${startPositionY}`;
                context.font = `${this.#fontSize}px Arial`;
                context.strokeText(
                    topLeftPositionText,
                    startPositionXMultiplied,
                    startPositionYMultiplied + this.#fontSize);

                // Draw the bottom-right corner position as dimensions text
                const bottomRightPositionX = this.#roundToTwoDecimalPlaces(startPositionX + windowSettings.paneWidth);
                const bottomRightPositionY = this.#roundToTwoDecimalPlaces(startPositionY + windowSettings.paneHeight);
                const bottomRightText = `${bottomRightPositionX}x${bottomRightPositionY}`;
                context.strokeText(
                    bottomRightText,
                    startPositionXMultiplied + windowSettings.paneWidth * this.#pixelMultiplier - context.measureText(bottomRightText).width,
                    startPositionYMultiplied + windowSettings.paneHeight * this.#pixelMultiplier - 5); // Adjusted for text height
            }
        }
    }

    /** Draws the background of the window.
     * @returns {CanvasWindowRenderer} The instance of the CanvasWindowRenderer for method chaining
     **/ 
    #drawWindowBackground() {
        console.log('Drawing window background...');

        const context = this.#canvasContext;

        // Draw the background
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "#EEEEEE"; // light gray background
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        return this;
    }

    /** Draws the border of the window.
     * @returns {CanvasWindowRenderer} The instance of the CanvasWindowRenderer for method chaining
     **/
    #drawWindowBorder() {
        console.log('Drawing window border...');

        const context = this.#canvasContext;

        // Draw the outer frame
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 1;
        context.strokeStyle="#999999"; // gray border
        context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height);

        return this;
    }

    /**
     * Resizes the canvas based on the window pixel ratio and dimensions.
     * @param {WindowSettings} windowSettings - Settings for the canvas window.
     * @returns {CanvasWindowRenderer} The instance of the CanvasWindowRenderer for method chaining
     **/
    #resizeCanvas(windowSettings) {
        console.log('Resizing canvas...');
        
        this.#canvas.width = this.#pixelMultiplier * windowSettings.windowOpeningWidth;
        this.#canvas.height = this.#pixelMultiplier * windowSettings.windowOpeningHeight;

        console.log(`Canvas resized to ${this.#canvas.width} x ${this.#canvas.height}`);

        return this;
    }

    /**
     * Rounds a value to two decimal places.
     * @param {number} value - The value to round.
     * @returns {number} The rounded value.
     **/
    #roundToTwoDecimalPlaces(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }
}
