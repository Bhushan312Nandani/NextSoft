# Weather App Walkthrough

## Overview
A modern, responsive weather application built with React. The app fetches real-time weather data and displays it beautifully using a glassmorphism design approach with smooth animations.

## Key Features

1. **Real-time Weather Data**: Uses the Open-Meteo API (both Geocoding and Weather forecast APIs) to fetch accurate data without needing API keys.
2. **City Search**: Users can search for any city worldwide to get its current weather conditions.
3. **Beautiful UI**: 
   - **Glassmorphism**: Transparent, blurred backgrounds for the weather card to give a modern, floating effect.
   - **Dark Mode**: Default sleek dark theme with a gradient background.
   - **Animations**: Floating weather icons, smooth loading spinners, and fade-in content transitions.
4. **Responsive Design**: Adapts beautifully to mobile, tablet, and desktop screens.
5. **State Management**: Properly handles loading states, error states (e.g., city not found, network errors), and empty states.

## Technical Implementation

- **Framework**: React (scaffolded with Vite for blazing-fast development)
- **Icons**: `lucide-react` for clean, scalable vector icons.
- **Styling**: Raw CSS in `App.css` utilizing CSS variables, Flexbox, media queries, and keyframe animations.
- **API Flow**: 
  1. Geocoding API converts the city name into latitude and longitude coordinates.
  2. Weather API takes those coordinates and returns the current temperature, wind speed, humidity, and weather code.
  3. The weather code is parsed through a helper function to render the appropriate text description and Lucide icon.

## How to Run

1. Open a terminal in the project directory (`A:\NEXSOFT\05_Weather_App`).
2. Run `npm install` (dependencies are already installed, but good for a fresh start).
3. Run `npm run dev` to start the development server.
4. Open the provided `localhost` URL in your browser.
