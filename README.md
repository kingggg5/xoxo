# XO Game Source Code

## Overview

The XO Game (also known as Tic-Tac-Toe) is a classic 3x3 grid game where two players (X and O) take turns marking cells in a grid.

## Features

- **Customizable Grid Size**: Play with different grid sizes
- **Game History**: Save game results (winner or draw) along with moves and replay past games.
- **Replay Functionality**: Replay any saved game from the history.
- **Reset Functionality**: Reset game to the start
- **Responsive Design**: Works on various screen sizes using Bootstrap and css for styling.

## Installation

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster for storing game history. You can sign up and create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Steps to Get Started

1. **Clone the Repository**

   Clone the repository to your local machine using Git:

   ```bash
   git clone [https://github.com/kingggg5/King_XO.git]
   cd King_XO

2. **Install Dependencies**

  Once you have the repository cloned, install the necessary dependencies using npm:
  npm install
  This will install all the packages listed in package.json required to run the application.

3. **Set Up Databases**
  Ensure that MongoDB is installed and running on your machine. You can download MongoDB from the official MongoDB website if you haven't already.
  Verify MongoDB is Running: Ensure that the MongoDB server is running. You can typically check this by running the following command:
  mongo
  If you receive a MongoDB prompt, it's running.
  Update MongoDB Connection String: By default, the application connects to MongoDB.

4. **Run the Server**
  To start the server and begin running the application, use nodemon:
  nodemon server.js

5. **Open the Game in a Browser**
  With the server running, you can access the game in your web browser. Open a web browser and navigate to:
  http://localhost:3000

## Usage

1. **Set the Grid Size**

    - By default, the game starts with a 3x3 grid. Adjust the grid size by entering a number greater than or equal to 3 in the input field and clicking "Play."

2. **Play the Game**

    - Click on the cells in the grid to place your marker ('X' or 'O').
    - The game will automatically determine if there is a win or a draw and will save the game state.

3. **View and Replay Game History and Reset Game**

    - Click on "Show History" to display a list of past games.
    - Replay a game by clicking the "Replay" button next to the game entry.
    - Reset a game by clicking the "Reset Game" button next to the Replay.

## Algorithm

1. **Grid Creation**
    - The grid is dynamically created based on user input. The createGrid function initializes the grid, sets its size, and creates a grid layout with clickable cells.

2. **Handling Cell Clicks**
    - When a cell is clicked, the handleCellClick function updates the grid and checks for a win or draw. If a player wins or the game ends in a draw, the game is reset, and the result is saved.

3. **Win Check**
    - The checkWin function determines if the current player has won by checking rows, columns, and diagonals for a line of the same player's mark.

4. **Saving and Displaying Game History**
    - Games are saved to a server using the saveGameHistory function and displayed using the showHistory and displayHistory functions. This allows players to view past games and replay them.

5. **Replay Game**
    - The replayGame function allows users to replay a saved game by resetting the grid and replaying the moves from the saved history.
