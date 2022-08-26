import React,{Component} from "react";
import './sudokustyle.css';


class Board9by9 extends Component{

    constructor(props)
    {
        super(props);

        const b = [];
        for(let i=0;i<9;i++){
            b[i]=[];
            for(let j=0;j<9;j++){
                b[i][j]='';
            }
        }
        this.state = {
            board:b,
            valid:true,
            solved:false,
            errorMsg:'',
        };
    }

    checkBoard = () =>{
        var r = [], c = [], g = [];
        for(let i=0;i<9;i++){
            r[i]=[];
            c[i]=[];
            g[i]=[];
            for(let j=0;j<9;j++){
                r[i][j]=false;
                c[i][j]=false;
                g[i][j]=false;
            }
        }
        var tmp = this.state.board, msg = '', v = true;
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(tmp[i][j].charCodeAt(0)> 57 || tmp[i][j].charCodeAt(0)<49){
                    msg = 'invalid input at row '+(i+1)+', col '+(j+1)+'! (must be between 1-9)';
                    v=false;
                    break;
                }else if(tmp[i][j]!==''){
                    var x = Number(tmp[i][j]);
                    if(r[i][x-1]){
                        msg = x +' is in the same row ('+(i+1)+')! ';
                        v = false;
                        break;
                    }
                    if(c[j][x-1]){
                        msg = x +'is in the same col ('+(j+1)+')! ';
                        v = false;
                        break;
                    }
                    if(g[parseInt(i / 3) * 3 + parseInt(j / 3)][x-1]){
                        msg = x +' is in the same grid ('+(parseInt(i / 3) * 3 + parseInt(j / 3)+1)+')! ';
                        v = false;
                        break;
                    }else{
                        r[i][x-1]=true;
                        c[j][x-1]=true;
                        g[parseInt(i / 3) * 3 + parseInt(j / 3)][x-1]=true;
                    }
                }
            }
            if(!v) break;
        }
        this.setState((state)=>{
            return {
                errorMsg:msg,
                valid:v,
            };
        });
        var checks = {
            rows:r,
            cols:c,
            grids:g,
            validBoard:v,
        }
        return checks;
    }


    solver = (i,j,args) =>{
        var emptySquare = false;
        for(i;i<9;i++){
            for(j=j%9;j<9;j++){
                if(args.Board[i][j]===''){
                    emptySquare=true;
                    break;
                }
            }
            if(emptySquare) break;
        }
        if(!emptySquare) return true;
        for(let k=1;k<=9;k++){
            if(args.Rows[i][k-1]||args.Cols[j][k-1]||args.Grids[parseInt(i / 3) * 3 + parseInt(j / 3)][k-1])continue;
            args.Board[i][j] = String.fromCharCode(48 + k);
            args.Rows[i][k-1] = true;
            args.Cols[j][k-1] = true;
            args.Grids[parseInt(i / 3) * 3 + parseInt(j / 3)][k-1] = true;
            if(this.solver(i,(j+1),args)) return true;
            args.Grids[parseInt(i / 3) * 3 + parseInt(j / 3)][k-1] = false;
            args.Cols[j][k-1] = false;
            args.Rows[i][k-1] = false;
            args.Board[i][j] = '';
        }
        return false;
    }


    solve = (e)=>{
        if(!this.state.solved){
            var checks = this.checkBoard();
            if(checks.validBoard){
                var args = {
                    Board: this.state.board,
                    Rows: checks.rows,
                    Cols: checks.cols,
                    Grids: checks.grids,
                };
                this.solver(0,0,args);
                this.setState((state) =>{
                    return{
                        board: args.Board,
                        solved:true,
                    }
                });
            }
        }
    }

    reset = (e)=>{
        let b = [];
        for(let i=0;i<9;i++){
            b[i]=[];
            for(let j=0;j<9;j++){
                b[i][j]='';
            }
        }
        this.setState((state)=>{
            return{
                board:b,
                valid:true,
                solved:false,
                errorMsg:''
            }
        });
    }

    changeboard = (input,i,j) =>{
        this.setState((state)=>{
            var tmp = state.board;
            tmp[i][j]=input;
            return {
                board:tmp,
            };
        });
    }


    render(){

        let row = [];
        for(let i=0;i < 9;i++){
            let col = [];
            for(let j=0;j < 9;j++){
                col[j] = <td key={i*9+j}><input type='text' 
                                    maxLength='1' 
                                    inputMode='numeric' 
                                    value={this.state.board[i][j]} 
                                    className={this.state.valid ? (this.state.solved?'solved fs-5':'fs-5'):'error fs-5'} 
                                    key={i*9+j}
                                    disabled={this.state.solved}
                                    onInput={(e)=>{this.changeboard(e.target.value,i,j)}}>
                                </input>
                            </td>
            }   
            row[i]= <tr key={i}>{col}</tr>;
        }
        return (
            <div id='boardContainer' className="">
                <table id='board9by9' className="table-responsive">
                    <tbody>
                        {row}
                    </tbody>
                </table>
                <h3 id='h2error' className="h3">{this.state.errorMsg}</h3>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-dark fs-4" onClick={(e)=>this.solve()}>Solve</button>
                    <button className="btn btn-dark fs-4" onClick={(e)=>this.reset()}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Board9by9;