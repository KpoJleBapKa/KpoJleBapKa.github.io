# TypeScript Web Application with Interactive Features (WotStat)

## Repository Overview

This repository demonstrates the setup and development of a TypeScript-based web application with interactive features. 

## Steps Completed

1. **Branch Creation**:
    - Created a new branch `feature/tsconfig` from the main branch.

2. **Template Addition**:
    - The template was written by myself, and added to the `feature/tsconfig` branch.

3. **TypeScript Installation**:
    - Installed TypeScript in the `feature/tsconfig` branch using the following command:
      ```bash
      npm install typescript
      ```
    - Initialized a `tsconfig.json` file using:
      ```bash
      npx tsc --init
      ```

4. **Adding JavaScript Interactivity**:
    - Added JavaScript interactivity to the page including opening modal windows, event listeners for clicks, animations, fetching data from [Wargaming API](https://developers.wargaming.net/applications/84770/), and displaying fetched data.

5. **TypeScript Conversion**:
    - Wrote all JavaScript code in a `.ts` file with appropriate type annotations.
    - Configured TypeScript to compile the `.ts` file into a `.js` file.

6. **HTML Integration**:
    - Linked the compiled JavaScript file in the HTML template.

7. **Pushing Changes**:
    - Committed and pushed all changes to the `feature/tsconfig` branch.

8. **GitHub Pages Setup**:
    - Created GitHub Pages from the `feature/tsconfig` branch to host the site.

9. **Links**:
    - [Branch](https://github.com/KpoJleBapKa/kpojlebapka.github.io/tree/feature/tsconfig) 
    - [Website](https://kpojlebapka.github.io/)
10. **Interactivity**:
    - Opening modal windows:
The opening of modal windows is implemented using the openModal and closeModal functions.

    - Event Listeners (such as scroll or click):
Event handlers for search and stat type selection buttons (searchButton, mainStatsButton, battleStatsButton, clanStatsButton).
Event handlers for closing modal windows (closeButtons, window.onclick).

    - Animations:
Animations were implemented using keyframes. Modal windows do not open and close immediately, and the background becomes darker.

    - Fetch data and display them:
The functions fetchPlayerId, fetchPlayerStats, fetchClanStats are used to get data from the API, as well as the functions displayMainAccountStats, displayBattleEfficiencyStats, displayClanStats to display data in the modal window.

## Repository Link

[GitHub Repository Link](https://github.com/KpoJleBapKa/kpojlebapka.github.io/tree/feature/tsconfig)

## GitHub Pages Link

[GitHub Pages Site](https://kpojlebapka.github.io/)
