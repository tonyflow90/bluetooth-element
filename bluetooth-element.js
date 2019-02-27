const template = document.createElement('template');
// template.innerHTML = '<style>:host {display:inline-block;} ::slotted(*){width:inherit;height:inherit;}</style><div><slot/></div>';


class BluetoothElement extends HTMLElement {

    static get observedAttributes() {
        return ['scale'];
    }

    constructor(evt) {
        super();
        this.device = undefined;
        this.server = undefined;

        this.attachShadow({ mode: 'open' });
    }

    connect() {
        navigator.bluetooth.requestDevice({ acceptAllDevices: true })
            .then(device => {
                // Human-readable name of the device.
                console.log(device.name);
                // Attempts to connect to remote GATT Server.
                return device.gatt.connect();
            })
            .then(server => {
                console.log(server);
                let myservices = server.getPrimaryServices();
            })
            .catch(error => {
                console.log(error);
            });
    }

    connectedCallback(evt) {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    disconnectedCallback() {
        // this.removeEventListener('pointerout')
        // this.removeEventListener('pointerover')
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        switch (attr) {
            case 'device':
                break;
        }
    }
}

window.customElements.define('bluetooth-element', BluetoothElement);
