/**
 * DesktopAdapter.js
 * Adapter for NodeGUI (Qt) native UI rendering on desktop platforms
 */

// Import NodeGUI components
// Note: These imports will only work when running in a NodeGUI environment
let QWidget, QPushButton, QLabel, QLineEdit, QPixmap, QListWidget, QBoxLayout, Direction;

// Dynamically import NodeGUI to avoid errors in non-desktop environments
try {
  if (typeof process !== 'undefined' && process.versions && !process.versions.browser) {
    // Only try to require NodeGUI in a Node.js environment, not in the browser
    const nodeGui = require('@nodegui/nodegui');
    
    QWidget = nodeGui.QWidget;
    QPushButton = nodeGui.QPushButton;
    QLabel = nodeGui.QLabel;
    QLineEdit = nodeGui.QLineEdit;
    QPixmap = nodeGui.QPixmap;
    QListWidget = nodeGui.QListWidget;
    QBoxLayout = nodeGui.QBoxLayout;
    Direction = nodeGui.Direction;
  }
} catch (error) {
  // NodeGUI not available, will use fallbacks
  console.warn('NodeGUI not available, desktop adapter will use fallbacks');
}

/**
 * Maps component types to NodeGUI widget classes
 */
const COMPONENT_MAP = {
  'button': QPushButton,
  'label': QLabel,
  'textbox': QLineEdit,
  'image': QPixmap,
  'list': QListWidget,
  'container': QWidget
};

/**
 * Maps event names to NodeGUI signal names
 */
const EVENT_MAP = {
  'click': 'clicked',
  'input': 'textChanged',
  'change': 'currentTextChanged',
  'focus': 'focusInEvent',
  'blur': 'focusOutEvent'
};

/**
 * DesktopAdapter class provides NodeGUI implementation for desktop platforms
 */
export default class DesktopAdapter {
  constructor(options = {}) {
    this.options = options;
    this.rootWidget = null;
    this.widgets = new Map();
    this.eventHandlers = new Map();
    
    // Initialize root widget if NodeGUI is available
    if (QWidget) {
      this.rootWidget = new QWidget();
      this.rootWidget.setLayout(new QBoxLayout(Direction.TopToBottom));
    }
  }

  /**
   * Create a native UI element using NodeGUI
   * @param {string} elementType - The type of element to create
   * @param {Object} props - Properties for the element
   * @returns {Object} The created native element
   */
  createElement(elementType, props = {}) {
    // Check if NodeGUI is available
    if (!QWidget) {
      return this._createFallbackElement(elementType, props);
    }

    const WidgetClass = COMPONENT_MAP[elementType.toLowerCase()] || QWidget;
    const widget = new WidgetClass();
    
    // Store widget reference
    const id = this._generateId();
    this.widgets.set(id, widget);
    widget.__sansId = id;
    
    // Apply initial properties
    this.updateElement(widget, props);
    
    return widget;
  }

  /**
   * Create a fallback element when NodeGUI is not available
   * @private
   * @param {string} elementType - The type of element to create
   * @param {Object} props - Properties for the element
   * @returns {Object} A fallback element object
   */
  _createFallbackElement(elementType, props = {}) {
    // Create a simple object to represent the element
    const element = {
      type: elementType,
      props: { ...props },
      children: [],
      __sansId: this._generateId(),
      __isFallback: true
    };
    
    this.widgets.set(element.__sansId, element);
    return element;
  }

  /**
   * Update an existing native UI element
   * @param {Object} element - The element to update
   * @param {Object} props - New properties for the element
   * @returns {Object} The updated element
   */
  updateElement(element, props = {}) {
    if (!element) return element;
    
    // Handle fallback elements
    if (element.__isFallback) {
      element.props = { ...element.props, ...props };
      return element;
    }
    
    // Apply properties based on element type
    if (QPushButton && element instanceof QPushButton) {
      if (props.label || props.text) {
        element.setText(props.label || props.text);
      }
      if (props.disabled !== undefined) {
        element.setEnabled(!props.disabled);
      }
    } else if (QLabel && element instanceof QLabel) {
      if (props.text) {
        element.setText(props.text);
      }
    } else if (QLineEdit && element instanceof QLineEdit) {
      if (props.value !== undefined) {
        element.setText(props.value);
      }
      if (props.placeholder) {
        element.setPlaceholderText(props.placeholder);
      }
      if (props.disabled !== undefined) {
        element.setEnabled(!props.disabled);
      }
    }
    
    // Apply styles
    if (props.style) {
      this.applyStyles(element, props.style);
    }
    
    return element;
  }

  /**
   * Append a child element to a parent element
   * @param {Object} parent - The parent element
   * @param {Object} child - The child element to append
   */
  appendChild(parent, child) {
    if (!parent || !child) return;
    
    // Handle fallback elements
    if (parent.__isFallback) {
      parent.children.push(child);
      return;
    }
    
    // For actual NodeGUI widgets
    if (QWidget && parent instanceof QWidget && parent.layout()) {
      parent.layout().addWidget(child);
    }
  }

  /**
   * Remove a child element from a parent element
   * @param {Object} parent - The parent element
   * @param {Object} child - The child element to remove
   */
  removeChild(parent, child) {
    if (!parent || !child) return;
    
    // Handle fallback elements
    if (parent.__isFallback) {
      const index = parent.children.indexOf(child);
      if (index !== -1) {
        parent.children.splice(index, 1);
      }
      return;
    }
    
    // For actual NodeGUI widgets
    if (QWidget && parent instanceof QWidget && parent.layout() && child.parent && child.parent() === parent) {
      parent.layout().removeWidget(child);
      child.setParent(null);
    }
  }

  /**
   * Set an event handler for a native UI element
   * @param {Object} element - The element to set the event handler on
   * @param {string} eventName - The name of the event
   * @param {Function} handler - The event handler function
   */
  setEventHandler(element, eventName, handler) {
    if (!element) return;
    
    // Handle fallback elements
    if (element.__isFallback) {
      if (!element.__events) {
        element.__events = {};
      }
      element.__events[eventName] = handler;
      return;
    }
    
    // Map web event name to Qt signal name
    const signalName = EVENT_MAP[eventName.toLowerCase()] || eventName;
    
    // Store handler reference to prevent garbage collection
    if (!this.eventHandlers.has(element.__sansId)) {
      this.eventHandlers.set(element.__sansId, {});
    }
    
    const elementHandlers = this.eventHandlers.get(element.__sansId);
    
    // Remove previous handler if exists
    if (elementHandlers[signalName]) {
      try {
        if (element[signalName] && element[signalName].disconnect) {
          element[signalName].disconnect(elementHandlers[signalName]);
        }
      } catch (e) {
        // Ignore disconnection errors
      }
    }
    
    // Connect new handler
    if (element[signalName] && typeof element[signalName].connect === 'function') {
      elementHandlers[signalName] = handler;
      element[signalName].connect(handler);
    }
  }

  /**
   * Apply styles to a native UI element
   * @param {Object} element - The element to style
   * @param {Object|string} styles - The styles to apply
   */
  applyStyles(element, styles = {}) {
    if (!element) return;
    
    // Handle fallback elements
    if (element.__isFallback) {
      element.style = styles;
      return;
    }
    
    // Convert string styles to object
    let styleObj = styles;
    if (typeof styles === 'string') {
      styleObj = this._parseStyleString(styles);
    }
    
    // Apply styles as Qt stylesheet
    if (typeof element.setStyleSheet === 'function') {
      const styleSheet = this._convertStylesToQSS(styleObj, element);
      element.setStyleSheet(styleSheet);
    }
  }

  /**
   * Parse CSS style string into an object
   * @private
   * @param {string} styleString - CSS style string
   * @returns {Object} Style object
   */
  _parseStyleString(styleString) {
    const result = {};
    const styles = styleString.split(';');
    
    for (const style of styles) {
      const parts = style.split(':');
      if (parts.length === 2) {
        const property = parts[0].trim();
        const value = parts[1].trim();
        
        if (property && value) {
          // Convert kebab-case to camelCase
          const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          result[camelProperty] = value;
        }
      }
    }
    
    return result;
  }

  /**
   * Convert JS style object to Qt StyleSheet string
   * @private
   * @param {Object} styles - Style object
   * @param {Object} element - The element to style
   * @returns {string} Qt StyleSheet
   */
  _convertStylesToQSS(styles, element) {
    // Map of CSS properties to Qt StyleSheet properties
    const propertyMap = {
      backgroundColor: 'background-color',
      color: 'color',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontWeight: 'font-weight',
      borderRadius: 'border-radius',
      border: 'border',
      padding: 'padding',
      margin: 'margin',
      width: 'width',
      height: 'height'
    };
    
    let qss = '';
    
    // Get the appropriate selector based on element type
    let selector = '*';
    if (QPushButton && element instanceof QPushButton) selector = 'QPushButton';
    else if (QLabel && element instanceof QLabel) selector = 'QLabel';
    else if (QLineEdit && element instanceof QLineEdit) selector = 'QLineEdit';
    else if (QListWidget && element instanceof QListWidget) selector = 'QListWidget';
    
    qss += `${selector} {\n`;
    
    // Add each style property
    for (const [key, value] of Object.entries(styles)) {
      const qssProperty = propertyMap[key] || key;
      qss += `  ${qssProperty}: ${value};\n`;
    }
    
    qss += '}';
    return qss;
  }

  /**
   * Generate a unique ID for tracking elements
   * @private
   * @returns {string} Unique ID
   */
  _generateId() {
    return `sans_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up resources when the adapter is no longer needed
   */
  destroy() {
    // Clean up event handlers
    this.eventHandlers.clear();
    
    // Clean up widget references
    this.widgets.clear();
    
    // Destroy root widget if it exists
    if (this.rootWidget) {
      this.rootWidget.close();
      this.rootWidget = null;
    }
  }
}