// Grid containing v - ships, ^ - rocks and ~ - currents.
const GRID = [
      ["", "", "", "^", "", "", "", "", "", ""],
      ["", "", "v", "", "~", "", "", "", "", ""],
      ["", "v", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "v", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "^", "~", "~", "", "", "", "^", "", ""],
      ["", "^", "", "~", "~", "", "", "", "", ""],
      ["", "^", "", "", "~", "~", "", "", "", ""],
    ];

// Counts the rows in the grid.
function countRows() 
{
  return GRID.length;
}

// Counts the columns in the grid.
function countColumns()
{
  return GRID[0].length;
}

// Grid size in a MxN format.
function gridSize()
{
  return (countColumns() + ' x ' + countRows());
}

// Total number of cells.
function totalCells()
{
  return (countColumns() * countRows());
}

// Translate column from letter to index format.
function convertColumn(coordinate)
{
  return (coordinate.charCodeAt(0) - 65);
}

// Translate row from input number to index format.
function convertRow(coordinate)
{
  return coordinate.slice(1) - 1;
}

// Return the contents of a specified cell in the grid.
function lightCell(coordinates)
{
  
  let column = convertColumn(coordinates);
  let row = convertRow(coordinates);
  
  if ((column < 0 || column > countColumns()) || (row < 0 || row > countRows()))
    return false;
  
  return GRID[row][column];
}

// Check if a cell has a rock.
function isRock(coordinates)
{
  let content = lightCell(coordinates);
  
  if (content === '^')
    return true;
  return false;
}

// Check if a cell has a current.
function isCurrent(coordinates)
{
  let content = lightCell(coordinates);
  
  if (content === '~')
    return true;
  return false;
}

// Check if a cell has a ship.
function isShip(coordinates)
{
  let content = lightCell(coordinates);
  
  if (content === 'v')
    return true;
  return false;
}

// Returns the contents of a specified row.
function lightRow(row)
{
  let result = GRID[row - 1];
  return result;
}

// Returns the contents of a given column.
function lightColumn(column)
{
  let convCol = convertColumn(column);
  const result = (arr, col) => arr.map(x => x[col]);
  return result(GRID, convCol);
}

// Gives the index locations of all the rocks in the grid.
function allRocks()
{
  var result = [];

  for (let i = 0; i < GRID.length; i++)
  {
    for (let j = 0; j < GRID[i].length; j++)
    {
      if (GRID[i][j] === '^')
      {
        let row = i + 1;
        let column = String.fromCharCode(j + 65);
        result.push(column.concat(row));
      }
    }
  }
  return result;
}

// Gives the locations of all the currents.
function allCurrents()
{
  var result = [];

  for (let i = 0; i < GRID.length; i++)
  {
    for (let j = 0; j < GRID[i].length; j++)
    {
      if (GRID[i][j] === '~')
      {
        let row = i + 1;
        let column = String.fromCharCode(j + 65);
        result.push(column.concat(row));
      }
    }
  }
  return result;
}

// Gives the locations of all the ships in the grid.
function allShips()
{
  var result = [];

  for (let i = 0; i < GRID.length; i++)
  {
    for (let j = 0; j < GRID[i].length; j++)
    {
      if (GRID[i][j] === 'v')
      {
        let row = i + 1;
        let column = String.fromCharCode(j + 65);
        result.push(column.concat(row));
      }
    }
  }
  return result;
}

// Returns the first rock.
function firstRock()
{
  return allRocks()[0];
}

// Returns the first current found in the grid.
function firstCurrent()
{
  return allCurrents()[0];
}

// Gives the first and last ship in the grid, west to east.
function shipReport()
{
  let ships = allShips();
  let sortedShips = ships.sort((a, b) => { return convertColumn(a)-convertColumn(b)});
  let result = [];
  result[0] = sortedShips[0];
  result[1] = sortedShips[sortedShips.length-1];
  return result;
}

// Denotes a danger rating depending on the contents of a cell.
function howDangerous(coordinates)
{
  if (isRock(coordinates))
    return '100';
  else if (isCurrent(coordinates))
    return '50';
  else 
    return '0';
}

// Calculates the percentage ratio of rocks and currents to other
// cells in the grid.
function percentageReport()
{
  let allCells = totalCells();
  let totalRocks = allRocks().length;
  let totalCurrents = allCurrents().length;
  
  let result = [];
  result[0] = Number(100.00 * (totalRocks/allCells)).toFixed(2);
  result[1] = Number(100.00 * (totalCurrents/allCells)).toFixed(2);
  
  return result;
}

// Calculates a new grid showing the danger level for each cell 
// using map.
function safetyReport()
{
  let convCol = col => String.fromCharCode(col + 65);
  let result = GRID.map((row, x) => {
    return row.map((_, y) => {
      return howDangerous(convCol(y).concat(x+1))
      });
  });
  return result;
}

// Calculates a new grid showing the danger level for each cell 
// using for loops.
function safetyReportFor()
{
  let convCol = col => String.fromCharCode(col + 65);

  let result = [];
  for (let i = 0; i < GRID.length; i++)
  {
    for (let j = 0; j < GRID[i].length; j++)
    {
      result.push(howDangerous(convCol(j).concat(i+1)));
    }
  }
  return result;
}

// Calculates the distance between a source and a destination cell.
function calcDistance(sourceCoord, destCoord)
{
  let sourceCol = convertColumn(sourceCoord);
  let sourceRow = convertRow(sourceCoord);

  let destCol = convertColumn(destCoord);
  let destRow = convertRow(destCoord);

  let result = Math.sqrt(Math.pow((destCol - sourceCol),2) + Math.pow((destRow - sourceRow),2));
  return result.toFixed(2);
}