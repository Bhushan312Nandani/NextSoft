# To-Do List Application Walkthrough

## Overview

This project is a modern, responsive To-Do List application built with React and Vite. It features a stunning glassmorphism UI with a dark mode aesthetic and provides essential task management features. 

## Features

1. **Add and Delete Tasks:**
   - Easily add new tasks via the input form at the top.
   - Delete tasks with the trash icon next to each item.
2. **Mark Tasks as Completed:**
   - Tasks can be toggled between active and completed states by clicking the custom-styled checkbox.
   - Completed tasks are visually distinguished with a strikethrough and subdued color.
3. **Local Storage Persistence:**
   - All tasks are automatically saved to the browser's `localStorage`.
   - Your tasks will remain even if you refresh or close the browser.
4. **Filtering Functionality:**
   - Filter views by **All**, **Active**, and **Completed** tasks.
   - Easily view the number of remaining active tasks.
   - Clear all completed tasks with a single click.
5. **Modern UI/UX:**
   - Built with raw CSS to provide a clean, premium design.
   - Uses a glassmorphism aesthetic (`backdrop-filter`) over a rich dark-gradient background.
   - Smooth animations for adding tasks and interacting with buttons (`slideUp`, `fadeIn`, hover transitions).
   - Fully responsive design that adapts beautifully to mobile devices.

## File Structure

- `src/App.jsx`: The main React component containing the state management for tasks (using `useState` and `useEffect` for local storage interaction) and the UI layout.
- `src/index.css`: The global stylesheet defining the CSS variables, animations, and the glassmorphic styling applied to the app components.
- `src/main.jsx`: The entry point for the React application.

## Running the Project

To run this project locally, execute the following commands in the project directory:

```bash
npm install
npm run dev
```

This will start the Vite development server, allowing you to view and interact with the application in your browser.
