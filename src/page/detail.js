import React from "react";
import ItemNote from "../components/itemNote";
class Detail extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            list:[],
            detailMode:false,
            detail:null
        };
    }
    render(){
        return(
            <div>
            {!this.state.detailMode ? (
            <div className="list">
            {this.state.list.length > 0 ? (
                <>
            {this.state.list.map( (item) (
            <ItemNote data={item}/>
            ))}
            </>
            ): (
            <h3>Bạn chưa có ghi chủ nào</h3>
            )}
            </div>
            ): (
            <Detail data={this.state.detail} />
            )}
            </div>
        )
    }
}
export default Detail;