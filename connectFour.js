// Initial references
// Create global variables for the different elements in the document
// The querySelector() method returns the first element that matches a CSS selector 
// The getElementById() method returns the element that matches the ID

// Declare constant container set equal to object document, method querySelector, passing as an argument class ".container"
const container = document.querySelector(".container");

// Declare constant playerTurn set equal to object document, method getElementById, passing as an argument id "playerTurn"
const playerTurn = document.getElementById("playerTurn");

// Declare constant message set equal to object document, method getElementById, passing as an argument id "message"
const message = document.getElementById("message");

// Declare variable initialMatrix as a 2d array, 6 rows, 7 columns, initialized to all 0s
let initialMatrix = new Array(6);
for (let i = 0; i < 6; i++) {
    initialMatrix[i] = new Array(7).fill(0);
}

// Declare variable currentPlayer to store the current player
let currentPlayer;

// Check for game over
function gameOverCheck() 
{
//console.log("gameOverCheck");
        
    // Declare variable count, initialized to 0
    let count = 0;
    
    // Iterate through the 2d array initialMatrix
    // Write a for/of loop to iterate through the rows, loop control variable innerArray, in    2d array initialMatrix
    for (const innerArray of initialMatrix) {
        // If object innerArray, function every(val => (val) != 0))
        if (innerArray.every(val => (val) != 0)) {
            // increment variable count by 1
            count++;
        }
        // Else
        else {
            // return false
            return false;
        }
    }
    // If variable count is equal to 6
    if (count === 6) {
        // Set constant message, property innerText, equal to "Game Over"
        message.innerText = "Game Over"
        // return false
        return false;
    }
}

// Write function winCheck 
function winCheck(row, column)
{
//console.log("winCheck");
    // Write decision making logic, if function call checkHorizontal, checkVertical, checkPositiveDiagonal, or checkNegativeDiagonal is true, return true
    if (checkHorizontal(row) || checkVertical(column) || checkPositiveDiagonal() || checkNegativeDiagonal()) {
        return true;
    }
    // else return false
    return false;
}

// Write function setPiece 
function setPiece(startCount, colValue)
{
//console.log("setPiece");

    // Add exception handling so the player cannot click a full column
    // Current if/else should be wrapped inside a try{} block
    // The catch(e){} block should display and alert dialog box informing the player "Column full, select again"

    try {
        // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
        let rows = document.querySelectorAll(".grid-row");
        
        // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0   
        if (initialMatrix[startCount][colValue] !== 0) {
            // Decrement parameter startCount by 1
            startCount--;
            // Call function setPiece, passing as arguments parameters startCount and colValue
            setPiece(startCount, colValue);
        }
        // Else
        else {
            // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
            let currentRow = rows[startCount].querySelectorAll(".grid-box");
        
            // Modify currentRow, index colValue, object classList, method add, passing as arguments "filled" and `player${currentPlayer}` 
            currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
        
            // Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
            initialMatrix[startCount][colValue] = currentPlayer;

            // If function call winCheck, passing as arguments parameters startCount and colValue is true
            if (winCheck(startCount, colValue)) {
                // Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins` 
                message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
                // Return false
                return false;
            }
        }
    } catch(e) {
        alert("Column full, select again");
    }
    // Call function gameOverCheck
    gameOverCheck();
}

// Write function fillBox 
function fillBox(e)
{
//console.log("fillBox");
    // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
    let colValue = parseInt(e.target.getAttribute("data-value"));

    // Call function setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue 
    setPiece(5, colValue);
  
    // Switch the currentPlayer, if currently 1 then 2, if currently 2, then 1
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }

    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function createBoard 
function createBoard()
{
//console.log("createBoard");
    
    // Iterate through the 2d array initialMatrix
    // Write an outer for in loop to iterate through the rows, loop control variable innerArray, in    2d array initialMatrix
    for (let innerArray in initialMatrix) {
        // Declare variable outerDiv set equal to object document, method createElement, passing "div" as an argument
        let outerDiv = document.createElement("div");
    
        // Modify outerDiv, object classList, calling method add, passing argument "grid-row"
        outerDiv.classList.add("grid-row");
        
        // Modify outerDiv calling method setAttribute, passing arguments "data-value" and loop control variable innerArray
        outerDiv.setAttribute("data-value", innerArray);
        
        // Write an inner for in loop to iterate through the columns, loop control variable j, in 2d array initialMatrix, index innerArray    
        for (let j in initialMatrix[innerArray]) {

            // Set each element in array initialMatrix to the value of 0
            initialMatrix[innerArray][j] = 0;

            // Declare variable innerDiv set equal to object document, method createElement, passing "div" as an argument
            let innerDiv = document.createElement("div");
        
            // Modify innerDiv, object classList, method add, passing argument "grid-box"
            innerDiv.classList.add("grid-box");

            // Modify innerDiv, calling method setAttribute, passing arguments "data-value" and loop control variable j
            innerDiv.setAttribute("data-value", j);
            
            // Modify innerDiv, method addEventListener, passing arguments "click" and (e) => { fillBox(e); }
            innerDiv.addEventListener("click", (e) => { fillBox(e); })
        
            // Modify outerDiv, method appendChild, passing argument innerDiv
            outerDiv.appendChild(innerDiv);
        }
        // Modify container. method appendChild, passing argument outerDiv
        container.appendChild(outerDiv);
    }
}

// Write function startGame 
function startGame() 
{
//console.log("startGame");

    // Set currentPlayer to 1, player 1 always goes first
    currentPlayer = 1;
    
    // Set the container's innerHTML to an empty string
    container.innerHTML = '';
    
    // Call function createBoard
    createBoard();
    
    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function checkHorizontal to do the following
function checkHorizontal(row)
{
    // Write a nest for loop to iterate through the rows and columns
    for (let column = 0; column < 4; column++) {
        // if the currentPlayer has four discs in a row horizontally, return true
        if (initialMatrix[row][column] === currentPlayer &&
            initialMatrix[row][column + 1] === currentPlayer &&
            initialMatrix[row][column + 2] === currentPlayer &&
            initialMatrix[row][column + 3] === currentPlayer) {
            return true;
        }

    }
    // return false
    return false;
}

// Write function checkVertical to do the following
function checkVertical(column)
{
    // Write a nest for loop to iterate through the columns and rows
    for (let row = 0; row < 3; row++) {
        // if the currentPlayer has four discs in a row vertically, return true
        if (initialMatrix[row][column] === currentPlayer &&
            initialMatrix[row + 1][column] === currentPlayer &&
            initialMatrix[row + 2][column] === currentPlayer &&
            initialMatrix[row + 3][column] === currentPlayer) {
            return true;
        }

    }
    // return false
    return false;
}

// Write function checkPositiveDiagonal to do the following
function checkPositiveDiagonal()
{
    // Write a nest for loop to iterate through the rows and columns
    for (let row = 3; row < 6; row++) {
        for (let column = 0; column < 4; column++) {
            // if the currentPlayer has four discs in a row diagonally, bottom right to top left, return true
            if (initialMatrix[row][column] === currentPlayer && initialMatrix[row - 1][column + 1] === currentPlayer && initialMatrix[row - 2][column + 2] === currentPlayer && initialMatrix[row - 3][column + 3] === currentPlayer) {
                return true;
            }
        }
    }
    // return false
    return false;    
}

// Write function checkNegativeDiagonal to do the following
function checkNegativeDiagonal ()
{
    // Write a nest for loop to iterate through the rows and columns
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 4; column++) {
            // if the currentPlayer has four discs in a row diagonally, bottom left to top right, return true
            if (initialMatrix[row][column] === currentPlayer && initialMatrix[row + 1][column + 1] === currentPlayer && initialMatrix[row + 2][column + 2] === currentPlayer && initialMatrix[row + 3][column + 3] === currentPlayer) {
                return true;
            }
        }
    }
    // return false  
    return false;  
}

// Initialize the game when the window loads
// For the window.onload event, call function startGame
window.onload = startGame;
