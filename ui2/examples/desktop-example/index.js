/**
 * Sans UI - Desktop Example using NodeGUI
 * 
 * This example demonstrates how to use Sans UI with NodeGUI for desktop applications.
 * 
 * To run this example:
 * 1. Make sure NodeGUI is installed: npm install @nodegui/nodegui
 * 2. Run: node examples/desktop-example/index.js
 */

const { QMainWindow, QWidget, QBoxLayout, Direction, QLabel } = require('@nodegui/nodegui');
const { createButton, createLabel, createTextInput, getNativeUI } = require('../../dist/index.js');

// Create the main window
const win = new QMainWindow();
win.setWindowTitle('Sans UI - Desktop Example');
win.resize(800, 600);

// Create a central widget and layout
const centralWidget = new QWidget();
centralWidget.setObjectName('centralWidget');
const rootLayout = new QBoxLayout(Direction.TopToBottom);
centralWidget.setLayout(rootLayout);

// Create a title label
const titleLabel = new QLabel();
titleLabel.setText('Sans UI - Desktop Example');
titleLabel.setStyleSheet(`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`);
rootLayout.addWidget(titleLabel);

// Create a section label
const buttonSectionLabel = new QLabel();
buttonSectionLabel.setText('Button Examples');
buttonSectionLabel.setStyleSheet(`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #555;
`);
rootLayout.addWidget(buttonSectionLabel);

// Create a container for buttons
const buttonContainer = new QWidget();
const buttonLayout = new QBoxLayout(Direction.LeftToRight);
buttonContainer.setLayout(buttonLayout);

// Create buttons using Sans UI
const primaryButton = createButton({
  label: 'Primary Button',
  type: 'primary'
});

const secondaryButton = createButton({
  label: 'Secondary Button',
  type: 'secondary'
});

const dangerButton = createButton({
  label: 'Danger Button',
  type: 'danger'
});

const disabledButton = createButton({
  label: 'Disabled Button',
  disabled: true
});

// Add buttons to the layout
buttonLayout.addWidget(primaryButton);
buttonLayout.addWidget(secondaryButton);
buttonLayout.addWidget(dangerButton);
buttonLayout.addWidget(disabledButton);
rootLayout.addWidget(buttonContainer);

// Create a section label for text inputs
const inputSectionLabel = new QLabel();
inputSectionLabel.setText('Text Input Examples');
inputSectionLabel.setStyleSheet(`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #555;
`);
rootLayout.addWidget(inputSectionLabel);

// Create a container for text inputs
const inputContainer = new QWidget();
const inputLayout = new QBoxLayout(Direction.TopToBottom);
inputContainer.setLayout(inputLayout);

// Create text inputs using Sans UI
const nameInput = createTextInput({
  placeholder: 'Enter your name',
  value: ''
});

const emailInput = createTextInput({
  placeholder: 'Enter your email',
  value: ''
});

// Create a label for output
const outputLabel = new QLabel();
outputLabel.setText('Output will appear here');
outputLabel.setStyleSheet(`
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 10px;
  margin-top: 20px;
  min-height: 100px;
`);

// Add text inputs to the layout
inputLayout.addWidget(nameInput);
inputLayout.addWidget(emailInput);
rootLayout.addWidget(inputContainer);
rootLayout.addWidget(outputLabel);

// Get the native UI adapter
const nativeUI = getNativeUI();

// Set up event handlers
nativeUI.setEventHandler(primaryButton, 'click', () => {
  outputLabel.setText('Primary button clicked');
});

nativeUI.setEventHandler(secondaryButton, 'click', () => {
  outputLabel.setText('Secondary button clicked');
});

nativeUI.setEventHandler(dangerButton, 'click', () => {
  outputLabel.setText('Danger button clicked');
});

nativeUI.setEventHandler(nameInput, 'input', () => {
  const nameValue = nameInput.text();
  outputLabel.setText(`Name input changed: ${nameValue}`);
});

nativeUI.setEventHandler(emailInput, 'input', () => {
  const emailValue = emailInput.text();
  outputLabel.setText(`Email input changed: ${emailValue}`);
});

// Set the central widget and show the window
win.setCentralWidget(centralWidget);
win.show();

// Start the event loop
global.win = win;