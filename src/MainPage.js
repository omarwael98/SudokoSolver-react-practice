import React,{Component} from "react";
import Board9by9 from "./Board9by9";
import Board16by16 from "./Board16by16";

class Main extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            view:'9x9',
        };
    }

    Board9 = () =>{
        this.setState((state)=>{
            return{
                view:'9x9',
            };
        });
    }

    Board16 = () =>{
        this.setState((state)=>{
            return{
                view:'16x16',
            };
        });
    }

    render(){

        return(
            <div>
                <nav id='navbar'>
                    <h1 id='navhead'>Sudoku Solver</h1>
                    <div id='mainPagebtns'>
                        <button onClick={(e)=>{this.Board9()}}>9x9</button>
                        <button onClick={(e)=>{this.Board16()}}>16x16</button>
                    </div>
                </nav>
                <div id='container'>
                    <div id='boardview'>
                        {(this.state.view==='9x9')?<Board9by9></Board9by9>:<Board16by16></Board16by16>}
                    </div>
                    <div id='rules'>
                    Rule 1 - Each row must contain the numbers from 1 to 9, without repetitions
The player must focus on filling each row of the grid while ensuring there are no duplicated numbers. The placement order of the digits is irrelevant.
 
Every puzzle, regardless of the difficulty level, begins with allocated numbers on the grid. The player should use these numbers as clues to find which digits are missing in each row.
<br></br><br></br>
Rule 2 - Each column must contain the numbers from 1 to 9, without repetitions
The Sudoku rules for the columns on the grid are exactly the same as for the rows. The player must also fill these with the numbers from 1 to 9, making sure each digit occurs only once per column.
 
The numbers allocated at the beginning of the puzzle work as clues to find which digits are missing in each column and their position.
<br></br><br></br>
Rule 3 - The digits can only occur once per block (nonet)
A regular 9 x 9 grid is divided into 9 smaller blocks of 3 x 3, also known as nonets. The numbers from 1 to 9 can only occur once per nonet.
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;