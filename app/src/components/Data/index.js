import {Component} from 'react';

import DataTableing from '../DataTableing'

import './index.css'


export default class Data extends Component {

    state = {data : ['a','b', 'c']}

    componentDidMount(){
        this.getAllData()
    }

    getAllData = async () =>{
        const apiUrl = "http://localhost:5004";
        const options = {
            headers:{
                "content-type": "application/json"
            },
            method: "GET",
        }
        const responseData = await fetch(apiUrl, options);
        if(responseData.ok === true){
            const fetchedData = await responseData.json();
            const updatedData = fetchedData.map( item => ({
                name : item.Name,
                email : item.Email,
                mobile : item.Mobile,
                dob : item.DOB,
                jobType : item.JobType,
            }));
            this.setState({data:updatedData});
        }

    }

    renderTable = () => {
        const {data} = this.state;
        let count = 0;
        return(
            <div className="table-container">
                <table className="table-head">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>DOB</th>
                            <th>JobType</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item =>(
                            <DataTableing key={count += 1}fullData={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return(
            <div className="data-container">
                {this.renderTable()}
            </div>
        )
    }
}

