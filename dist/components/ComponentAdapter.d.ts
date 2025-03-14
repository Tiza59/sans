export default ComponentAdapter;
/**
 * ComponentAdapter.js
 *
 * An abstraction layer for Sans UI components that simplifies property passing
 * and event handling across different platforms and frameworks.
 */
declare class ComponentAdapter {
    /**
     * Create a new component adapter
     * @param {string} componentType - The type of component (e.g., 'button', 'input')
     * @param {Object} options - Configuration options
     */
    constructor(componentType: string, options?: Object);
    componentType: string;
    options: Object;
    element: any;
    eventHandlers: {};
    properties: {};
    /**
     * Create and return the component element
     * @param {HTMLElement} container - The container to append the component to
     * @returns {HTMLElement} The created component element
     */
    create(container: HTMLElement): HTMLElement;
    /**
     * Set a property on the component
     * @param {string} name - The property name
     * @param {any} value - The property value
     * @returns {ComponentAdapter} The component adapter instance for chaining
     */
    setProperty(name: string, value: any): ComponentAdapter;
    /**
     * Set multiple properties at once
     * @param {Object} props - Object containing properties to set
     * @returns {ComponentAdapter} The component adapter instance for chaining
     */
    setProperties(props: Object): ComponentAdapter;
    /**
     * Add an event listener to the component
     * @param {string} eventName - The event name
     * @param {Function} handler - The event handler function
     * @returns {ComponentAdapter} The component adapter instance for chaining
     */
    on(eventName: string, handler: Function): ComponentAdapter;
    /**
     * Remove an event listener from the component
     * @param {string} eventName - The event name
     * @param {Function} [handler] - The specific handler to remove (optional)
     * @returns {ComponentAdapter} The component adapter instance for chaining
     */
    off(eventName: string, handler?: Function): ComponentAdapter;
    /**
     * Get the native element
     * @returns {HTMLElement} The native element
     */
    getElement(): HTMLElement;
    /**
     * Remove the component from the DOM
     */
    destroy(): void;
    /**
     * Apply all properties to the element
     * @private
     */
    private _applyProperties;
    /**
     * Apply a single property to the element
     * @param {string} name - The property name
     * @param {any} value - The property value
     * @private
     */
    private _applyProperty;
    /**
     * Attach an event handler to the element
     * @param {string} eventName - The event name
     * @param {Function} handler - The event handler function
     * @private
     */
    private _attachEventHandler;
    /**
     * Refresh event handlers for a specific event
     * @param {string} eventName - The event name
     * @private
     */
    private _refreshEventHandlers;
}
