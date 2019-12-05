import { BaseModule } from './BaseModule';

const hasTouchSupport = navigator.maxTouchPoints

export class Resize extends BaseModule {
    onCreate = () => {
        // track resize handles
        this.boxes = [];

        // add 4 resize handles
        this.addBox('nwse-resize'); // top left
        this.addBox('nesw-resize'); // top right
        this.addBox('nwse-resize'); // bottom right
        this.addBox('nesw-resize'); // bottom left

        this.positionBoxes();
    };

    onDestroy = () => {
        // reset drag handle cursors
        this.setCursor('');
    };

    positionBoxes = () => {
        const handleXOffset = '-6px';
        const handleYOffset = '-6px';

        // set the top and left for each drag handle
        [
            { left: handleXOffset, top: handleYOffset },        // top left
            { right: handleXOffset, top: handleYOffset },       // top right
            { right: handleXOffset, bottom: handleYOffset },    // bottom right
            { left: handleXOffset, bottom: handleYOffset },     // bottom left
        ].forEach((pos, idx) => {
            Object.assign(this.boxes[idx].style, pos);
        });
    };

    addBox = (cursor) => {
        // create div element for resize handle
        const box = document.createElement('div');
        box.classList.add('ql-image-handle');

        // Star with the specified styles
        box.style.cursor = cursor;

        // listen for mousedown on each box
        box.addEventListener(hasTouchSupport ? 'touchstart' : 'mousedown', this.handleMousedown, false);
        // add drag handle to document
        this.overlay.appendChild(box);
        // keep track of drag handle
        this.boxes.push(box);
    };

    handleMousedown = (evt) => {
        // note which box
        this.dragBox = evt.target;
        // note starting mousedown position
        const info = hasTouchSupport ? evt.changedTouches[0] : evt
        this.dragStartX = info.clientX;
        // store the width before the drag
        this.preDragWidth = this.img.width || this.img.naturalWidth;
        // set the proper cursor everywhere
        this.setCursor(this.dragBox.style.cursor);
        // listen for movement and mouseup
        document.addEventListener(hasTouchSupport ? 'touchmove' : 'mousemove', this.handleDrag, false);
        document.addEventListener(hasTouchSupport ? 'touchend' : 'mouseup', this.handleMouseup, false);
    };

    handleMouseup = () => {
        // reset cursor everywhere
        this.setCursor('');
        // stop listening for movement and mouseup
        document.removeEventListener(hasTouchSupport ? 'touchmove' : 'mousemove', this.handleDrag);
        document.removeEventListener(hasTouchSupport ? 'touchend' : 'mouseup', this.handleMouseup);
    };

    handleDrag = (evt) => {
        if (!this.img) {
            // image not set yet
            return;
        }
        // update image size
        const info = hasTouchSupport ? evt.changedTouches[0] : evt
        const deltaX = info.clientX - this.dragStartX;
        if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
            // left-side resize handler; dragging right shrinks image
            this.img.width = Math.round(this.preDragWidth - deltaX);
        } else {
            // right-side resize handler; dragging right enlarges image
            this.img.width = Math.round(this.preDragWidth + deltaX);
        }
        this.requestUpdate();
    };

    setCursor = (value) => {
        [
            document.body,
            this.img,
        ].forEach((el) => {
            el.style.cursor = value;   // eslint-disable-line no-param-reassign
        });
    };
}
