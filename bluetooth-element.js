const template = document.createElement('template');
// template.innerHTML = '<style>:host {display:inline-block;} ::slotted(*){width:inherit;height:inherit;}</style><div><slot/></div>';

const btServices = [
    'generic_access',
    'alert_notification',
    'automation_io',
    'battery_service',
    'blood_pressure',
    'body_composition',
    'bond_management',
    'continuous_glucose_monitoring',
    'current_time',
    'cycling_power',
    'cycling_speed_and_cadence',
    'device_information',
    'environmental_sensing',
    'fitness_machine',
    'generic_attribute',
    'glucose',
    'health_thermometer',
    'heart_rate',
    'http_proxy',
    'human_interface_device',
    'immediate_alert',
    'indoor_positioning',
    // 'insulin_delivery',
    'internet_protocol_support',
    'link_loss',
    'location_and_navigation',
    'mesh_provisioning',
    'mesh_proxy',
    'next_dst_change',
    'object_transfer',
    'phone_alert_status',
    'pulse_oximeter',
    'reconnection_configuration',
    'reference_time_update',
    'running_speed_and_cadence',
    'scan_parameters',
    'transport_discovery',
    'tx_power',
    'user_data',
    'weight_scale',
];

class BluetoothElement extends HTMLElement {

    static get observedAttributes() {
        return ['services','server'];
    }

    constructor(evt) {
        super();
        this.services = [];
        this.server = undefined;
        this.connected = false;

        this.attachShadow({ mode: 'open' });
    }

    connect() {
        let that = this;

        let optionalServices = [];
        this.services.forEach( service => {
            let s = service.split(/, ?/)
            .map(s => s.startsWith('0x') ? parseInt(s) : s)
            .filter(s => s && BluetoothUUID.getService);

            if(btServices.includes(service)) {
                optionalServices = [service, ...optionalServices];
            } else {
                console.error(`Service '${service}' does not exists!`);
            }
        });
        let acceptAllDevices = false;
        if(optionalServices.length <= 0)
            acceptAllDevices = true;

        navigator.bluetooth.requestDevice({
            acceptAllDevices: acceptAllDevices,
            optionalServices: btServices
            // filters: [{services: optionalServices}]
        })
            .then(device => {
                device.addEventListener('gattserverdisconnected', this.onDisconnected);
                return device.gatt.connect();
            })
            .then(server => {
                that.connected = server.connected;
                if (server.connected) {
                    that.server = server;
                } else {
                    that.server = undefined;
                }
                return server.getPrimaryServices()
            })
            .catch(error => {
                console.log(error);
            });
    }

    onDisconnected(event) {
        let device = event.target;
        console.log('Device ' + device.name + ' is disconnected.');
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
            case 'services':
                this.services = newVal.replace(/\s/g, '').split(',');
                break;
        }
    }
}

window.customElements.define('bluetooth-element', BluetoothElement);
