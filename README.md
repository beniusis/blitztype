# blitztype

blitztype is a minimalistic web-based typing speed test application.

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
  - [Technologies and Tools](#technologies-and-tools)
  - [Project Structure](#project-structure)

## Overview

### Features

- 60 seconds timer starts whenever user starts typing.
- Highlighting each correctly/incorrectly typed character.
- Caret element is shown for visual identification of the next character.
- Allowing backspace usage to undo typed characters.
- When the 60 seconds timer ends, the user's typing speed (WPM) and word accuracy (%) is displayed.
- User is able to reset the test (with the new prompt) or restart it (with the current prompt).
- User's metrics (speed and accuracy) are stored in the localStorage.

### Technologies and Tools

- 💬 **Languages**: HTML, CSS, JavaScript
- 😎 **Styling**: [Tailwind CSS](https://tailwindcss.com)
- 🏻 **Other**: [Grid.js](https://gridjs.io), localStorage

### Project Structure

    .
    ├── assets                  # Asset files
    |   ├── data                # Files that store data (.json)
    │   ├── icons               # Icons (.ico, .svg)
    │   └── js                  # JavaScript files
    |       ├── constants.js    # Constant values
    |       ├── elements.js     # HTML elements
    |       ├── main.js         # Main application logic
    |       ├── stats.js        # Class for storing stats data
    |       └── utils.js        # Utility (helper) functions
    ├── .gitignore
    ├── index.html              # Main .html file
    ├── README.md
    └── tailwind.config.js      # Tailwind CSS config file for custom values
