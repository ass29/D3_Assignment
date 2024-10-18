import './App.css';
import React, {Component} from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from "d3";
import tipsFile from "./tips.csv"

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: []
        };
    }

    fetchData = () =>
    {
        const self = this;
        d3.csv(tipsFile, (item) =>
        {
            return {
                tip: parseFloat(item.tip),
                total_bill: parseFloat(item.total_bill),
                day: item.day
            };
        }).then((csvData) =>
        {
            self.setState({
                data: csvData
            });
        }).catch((error) =>
        {
            console.log(error);
        });
    }

    componentDidMount()
    {
        this.fetchData();
    }

    render()
    {
        return (
            <div className="container">
                <div className="scatter-plot-container">
                    <Child1 data={this.state.data}/>
                </div>

                <div className="box-plot-container">
                    <Child2 data={this.state.data}/>
                </div>

            </div>
        );
    }
}

export default App;