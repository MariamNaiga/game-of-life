import React from 'react';
import './GameOfLife.css';
import Grid from './components/Grid.js'



export default class GameOfLife extends React.Component {

    constructor() {
        super();
        this.speed = 500;
        this.rows = 60;
        this.cols = 128;
        this.state = {
            population: 0,
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        }
    }

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        let _population = this.state.population;
        if (gridCopy[row][col] === true) {
            gridCopy[row][col] = false;
            _population--;
        } 
        else {
            gridCopy[row][col] = true;
            _population++;

        }
        this.setState({
            population: _population,
            gridFull: gridCopy
        });
    }

    clear = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                gridCopy[i][j] = false;
            }
        }
        this.setState({
            population: 0,
            gridFull: gridCopy,
            generation: 0
        });

    }

    seed = () => {
        let _population = this.state.population;
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1 && gridCopy[i][j] === false) {
                    gridCopy[i][j] = true;
                    _population++;
                } 
            }
        }
        this.setState({
            population: _population,
            gridFull: gridCopy
        });
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
        let _population = this.state.population;

        for (let i = 0; i < this.rows; i++) 
        {
            for (let j = 0; j < this.cols; j++) 
            {
                let count = 0;

                //Check top left
                if (i > 0 && j > 0 && g[i - 1][j - 1] === true) count++;    
                
                //Check left
                if (j > 0 && g[i][j - 1] === true) count++;  

                //Check bottom left
                if (i < this.rows - 1 && j > 0 && g[i + 1][j - 1] === true) count++;    
            
                //Check bottom
                if (i < this.rows - 1 && g[i + 1][j] === true) count++;   
                
                //Check bottom right
                if (i < this.rows - 1 && j < this.cols - 1 && g[i + 1][j + 1] === true) count++;  
                
                //Check right
                if (j < this.cols - 1 && g[i][j + 1] === true) count++;

                //Check top right
                if (i > 0 && j < this.cols - 1 && g[i - 1][j + 1] === true) count++;

                //Check top
                if (i > 0 && g[i - 1][j] === true) count++;


                if (g[i][j] === true) 
                {
                    if (count < 2) 
                    {
                        g2[i][j] = false; //Live cell with less than 2 neighbours dies
                        _population--;

                    } 
                    else if (count === 2 || count === 3) 
                    {
                        g2[i][j] = true; //Live cell with 2 or three neighbours lives
                    } 
                    else if (count > 3) 
                    {
                        g2[i][j] = false; //Live cell with more than 3 neighbours dies
                        _population--;
                    }
                } 
                else if (g[i][j] === false) 
                {
                    if (count === 3) 
                    {
                        g2[i][j] = true; //Dead cell with exactly 3 live neighbours becomes alive
                        _population++;
                    }
                }
            }
        }
        this.setState({
            population: _population,
            gridFull: g2,
            generation: this.state.generation + 1,
        })
    }

    componentDidMount() {
        this.seed();
    }

    render() {
        return (
            <div className="gameView">
                <div className="top-bar">
                    <div className = "navigation">
                        <button onClick = {this.playButton}>Play</button>
                        <button onClick = {this.pauseButton}>Pause</button>
                        <button onClick = {this.clear}>Clear Board</button>
                        <button onClick = {this.seed}>Seed</button>
                    </div>
                </div>
                <br />
                <div className="statistics">
                    <h4>Generation: {this.state.generation}</h4>
                    <h4>Population: {this.state.population}</h4>

                </div>
                <Grid 
                    gridFull = {this.state.gridFull}
                    rows = {this.rows}
                    cols = {this.cols}
                    selectBox = {this.selectBox}
                />
            </div>
        );
    }
}

function arrayClone(arr) {
    return (
        JSON.parse(JSON.stringify(arr))
    )
}
