/**
 * Sans UI - Mobile Example using NativeScript
 * 
 * This example demonstrates how to use Sans UI with NativeScript for mobile applications.
 * 
 * To run this example:
 * 1. Make sure NativeScript CLI is installed: npm install -g nativescript
 * 2. Create a new NativeScript app: ns create SansUIMobileExample --template @nativescript/template-blank
 * 3. Copy this file to the app directory
 * 4. Run: ns run android or ns run ios
 */

import { Application } from '@nativescript/core';
import { createButton, createLabel, createTextInput, createContainer, getNativeUI } from '../../dist/index.js';

// Create the main page
export function createPage() {
  // Get the native UI adapter
  const nativeUI = getNativeUI();
  
  // Create the main container
  const mainContainer = createContainer({
    style: 'flex-direction: column; padding: 20; background-color: #ffffff;'
  });
  
  // Create a title label
  const titleLabel = createLabel({
    text: 'Sans UI - Mobile Example',
    style: 'font-size: 24; font-weight: bold; margin-bottom: 20; color: #333333;'
  });
  nativeUI.appendChild(mainContainer, titleLabel);
  
  // Create a section label for buttons
  const buttonSectionLabel = createLabel({
    text: 'Button Examples',
    style: 'font-size: 18; font-weight: bold; margin-top: 20; margin-bottom: 10; color: #555555;'
  });
  nativeUI.appendChild(mainContainer, buttonSectionLabel);
  
  // Create a container for buttons
  const buttonContainer = createContainer({
    style: 'flex-direction: row; flex-wrap: wrap; margin-bottom: 20;'
  });
  
  // Create buttons using Sans UI
  const primaryButton = createButton({
    label: 'Primary Button',
    type: 'primary',
    style: 'margin-right: 10; margin-bottom: 10;'
  });
  
  const secondaryButton = createButton({
    label: 'Secondary Button',
    type: 'secondary',
    style: 'margin-right: 10; margin-bottom: 10;'
  });
  
  const dangerButton = createButton({
    label: 'Danger Button',
    type: 'danger',
    style: 'margin-right: 10; margin-bottom: 10;'
  });
  
  const disabledButton = createButton({
    label: 'Disabled Button',
    disabled: true,
    style: 'margin-bottom: 10;'
  });
  
  // Add buttons to the button container
  nativeUI.appendChild(buttonContainer, primaryButton);
  nativeUI.appendChild(buttonContainer, secondaryButton);
  nativeUI.appendChild(buttonContainer, dangerButton);
  nativeUI.appendChild(buttonContainer, disabledButton);
  
  // Add button container to the main container
  nativeUI.appendChild(mainContainer, buttonContainer);
  
  // Create a section label for text inputs
  const inputSectionLabel = createLabel({
    text: 'Text Input Examples',
    style: 'font-size: 18; font-weight: bold; margin-top: 20; margin-bottom: 10; color: #555555;'
  });
  nativeUI.appendChild(mainContainer, inputSectionLabel);
  
  // Create text inputs using Sans UI
  const nameInput = createTextInput({
    placeholder: 'Enter your name',
    value: '',
    style: 'margin-bottom: 10; padding: 10; border-width: 1; border-color: #dddddd; border-radius: 4;'
  });
  
  const emailInput = createTextInput({
    placeholder: 'Enter your email',
    value: '',
    style: 'margin-bottom: 20; padding: 10; border-width: 1; border-color: #dddddd; border-radius: 4;'
  });
  
  // Add text inputs to the main container
  nativeUI.appendChild(mainContainer, nameInput);
  nativeUI.appendChild(mainContainer, emailInput);
  
  // Create a label for output
  const outputLabel = createLabel({
    text: 'Output will appear here',
    style: 'font-family: monospace; background-color: #f0f0f0; padding: 10; margin-top: 20; min-height: 100;'
  });
  nativeUI.appendChild(mainContainer, outputLabel);
  
  // Set up event handlers
  nativeUI.setEventHandler(primaryButton, 'click', () => {
    nativeUI.updateElement(outputLabel, { text: 'Primary button clicked' });
  });
  
  nativeUI.setEventHandler(secondaryButton, 'click', () => {
    nativeUI.updateElement(outputLabel, { text: 'Secondary button clicked' });
  });
  
  nativeUI.setEventHandler(dangerButton, 'click', () => {
    nativeUI.updateElement(outputLabel, { text: 'Danger button clicked' });
  });
  
  nativeUI.setEventHandler(nameInput, 'input', (args) => {
    const nameValue = args.value || '';
    nativeUI.updateElement(outputLabel, { text: `Name input changed: ${nameValue}` });
  });
  
  nativeUI.setEventHandler(emailInput, 'input', (args) => {
    const emailValue = args.value || '';
    nativeUI.updateElement(outputLabel, { text: `Email input changed: ${emailValue}` });
  });
  
  return mainContainer;
}

// Entry point for the application
export function main() {
  // Create the main page
  const mainPage = createPage();
  
  // Set up the application
  Application.run({
    create: () => {
      return mainPage;
    }
  });
}

// Start the application if this is the main module
if (require.main === module) {
  main();
}