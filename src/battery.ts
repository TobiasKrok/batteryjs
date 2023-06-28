class BatteryElement extends HTMLElement {
    state: Record<string, unknown> = {};
    renderFunction: (state: Record<string, unknown>) => string = () => '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.state = {};
        this.renderFunction = () => '';
    }

    connectedCallback() {
        this.render();
    }

    get(key: string) {
        return this.state[key];
    }
    set(key: string, value: any) {
        this.state[key] = value;
        this.render();
    }

    render() {
        // FIx this
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = this.renderFunction(this.state);
    }
}

class Battery {
    private components: Array<{ [key: string]: CustomElementConstructor }> = [];

    private static rootElement: HTMLElement;

    constructor() {
    }

    static charge(appRootId: string, document: Document) {
        this.rootElement = document.getElementById(appRootId) as HTMLElement;
        //this.rootElement.innerHTML = '';
    }

    static createComponent(name: string, element: CustomElementConstructor) {
        customElements.define(name, element);
    }

    registerComponent(component: { [key: string]: CustomElementConstructor }) {
        this.components.push(component);
    }

}

export { Battery, BatteryElement };