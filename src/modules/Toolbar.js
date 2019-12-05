import { BaseModule } from './BaseModule';

export class Toolbar extends BaseModule {
    onCreate = () => {
        // Setup Toolbar
        this.toolbar = document.createElement('div');
        this.toolbar.classList.add('ql-image-toolbar')
        this.overlay.appendChild(this.toolbar);

        // Setup Buttons
        this._addToolbarButtons();
    };

    // The toolbar and its children will be destroyed when the overlay is removed
    onDestroy = () => { };

    // Nothing to update on drag because we are are positioned relative to the overlay
    onUpdate = () => { };

    _addToolbarButtons = () => {
        const up = document.createElement('span');
        up.classList.add('triangle-up');
        this.toolbar.appendChild(up);
        const button = document.createElement('span');
        button.innerText = '删除';
        button.addEventListener('click', () => {
            const evt = new CustomEvent('keyup');
            evt.keyCode = 46;
            document.dispatchEvent(evt);
        });
        this.toolbar.appendChild(button);
    };
}
