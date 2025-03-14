export default ComponentFactory;
declare class ComponentFactory {
    /**
     * Create a button component
     * @param {Object} props - Initial properties for the button
     * @returns {ComponentAdapter} The component adapter instance
     */
    static createButton(props?: Object): ComponentAdapter;
    /**
     * Create an input component
     * @param {Object} props - Initial properties for the input
     * @returns {ComponentAdapter} The component adapter instance
     */
    static createInput(props?: Object): ComponentAdapter;
    /**
     * Create a select component
     * @param {Object} props - Initial properties for the select
     * @returns {ComponentAdapter} The component adapter instance
     */
    static createSelect(props?: Object): ComponentAdapter;
    /**
     * Create a form component
     * @param {Object} props - Initial properties for the form
     * @returns {ComponentAdapter} The component adapter instance
     */
    static createForm(props?: Object): ComponentAdapter;
    /**
     * Create a card component
     * @param {Object} props - Initial properties for the card
     * @returns {ComponentAdapter} The component adapter instance
     */
    static createCard(props?: Object): ComponentAdapter;
    /**
     * Create a modal component
     * @param {Object} props - Initial properties for the modal
     * @returns {ComponentAdapter} The component adapter instance
     */
    static createModal(props?: Object): ComponentAdapter;
    /**
     * Create any Sans UI component by type
     * @param {string} type - The component type
     * @param {Object} props - Initial properties for the component
     * @returns {ComponentAdapter} The component adapter instance
     */
    static create(type: string, props?: Object): ComponentAdapter;
}
import ComponentAdapter from './ComponentAdapter';
