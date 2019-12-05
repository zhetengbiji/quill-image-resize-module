import { BaseModule } from './BaseModule';

export class DisplaySize extends BaseModule {
    onCreate = () => {
        // Create the container to hold the size display
        this.display = document.createElement('div');
        this.display.classList.add('ql-image-size')

        // Attach it
        this.overlay.appendChild(this.display);
    };

    onDestroy = () => {};

    onUpdate = () => {
        if (!this.display || !this.img) {
            return;
        }

        const size = this.getCurrentSize();
        this.display.innerHTML = size.join(' &times; ');
        // position on top of image
        Object.assign(this.display.style, {
            right: '4px',
            top: '4px',
            left: 'auto',
        });
    };

    getCurrentSize = () => [
        this.img.width,
        Math.round((this.img.width / this.img.naturalWidth) * this.img.naturalHeight),
    ];
}
