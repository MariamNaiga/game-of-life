import React from 'react';
import Box from './Box.js'

export default class Grid extends React.Component {
    render() {
        const width = (this.props.cols * 11) + 1;
        var rowsArr = [];
        var boxClass = "";
        for (let i = 0; i < this.props.rows; i++) {
            for(let j = 0; j < this.props.cols; j++) {
                let boxId = i + '_' + j;
                boxClass = this.props.gridFull[i][j] ? "box alive" : "box dead";
                rowsArr.push(
                    <Box
                        boxClass = {boxClass}
                        key = {boxId}
                        boxId = {boxId}
                        row = {i}
                        col = {j}
                        selectBox = {this.props.selectBox}
                    />
                )
            }
        }
        return (
            <div className = "grid" style = {{width: width}}>
                {rowsArr}
            </div>
        );
    }
} 