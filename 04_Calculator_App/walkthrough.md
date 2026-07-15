# Calculator App Implementation

This document provides a comprehensive walkthrough of the React-based Calculator App built in `04_Calculator_App`.

## Project Overview

The app is built using **React** (initialized via Vite) and features a modern glassmorphism design, implemented entirely with raw CSS. It supports standard arithmetic operations, full decimal support, clear (AC), delete (DEL) functionality, keyboard support, and robust error handling.

## 1. Project Initialization

The project was scaffolded using Vite:
```bash
npx create-vite@latest ./ --template react
npm install
```

## 2. Core Architecture

The main logic resides in `src/App.jsx`. It utilizes React's `useReducer` hook to manage complex state transitions inherent to a calculator.

### State Management (`useReducer`)
The state consists of:
- `currentOperand`: The number currently being typed or evaluated.
- `previousOperand`: The previously evaluated number before an operation.
- `operation`: The current mathematical operation being queued (`+`, `-`, `*`, `÷`).
- `overwrite`: A boolean flag used to determine if the next digit pressed should overwrite the current result (e.g., typing a new number immediately after hitting `=`).

### The Reducer
The `reducer` function handles five distinct actions (`ACTIONS`):
- `ADD_DIGIT`: Appends a digit or decimal to the `currentOperand`. Prevents multiple decimals and trailing zeros.
- `CHOOSE_OPERATION`: Stages an arithmetic operation. If both operands are present, it evaluates the ongoing calculation first.
- `CLEAR`: Resets the state completely, clearing all operands.
- `DELETE_DIGIT`: Removes the last digit typed.
- `EVALUATE`: Computes the result using the stored operands and operation.

### Mathematical Evaluation
The `evaluate` function parses the operands as floats and computes the result.
- **Division by Zero:** Evaluates to `"Error"` preventing `Infinity` bugs.
- **Floating Point Precision:** Avoids deep JS floating-point issues by rounding the final computation.

## 3. UI and Styling (Glassmorphism)

The UI is entirely styled in `src/App.css`. Key features include:
- **Glassmorphism Effect:** Utilizes `backdrop-filter: blur()`, subtle white borders (`rgba(255,255,255,0.1)`), and transparent backgrounds to give the calculator a glass-like premium feel.
- **Dynamic Background:** A dark cosmic background with animated radial gradients ensures the glass effect stands out perfectly.
- **Custom Typography:** Uses Google Fonts (`Orbitron` for numbers to give a digital feel, and `Poppins` for buttons).
- **Responsive Design:** A CSS Grid layout (`repeat(4, 1fr)`) makes up the structure. Media queries ensure the calculator scales to full width and adapts padding on smaller screens (mobile devices).

## 4. Keyboard Support

A `useEffect` hook listens for `keydown` events globally, mapping standard keyboard keys (`0-9`, `.`, `Enter`, `Backspace`, `Escape`, `+`, `-`, `*`, `/`) directly to `useReducer` dispatches. This allows users to type naturally on the keyboard in addition to clicking UI buttons.
