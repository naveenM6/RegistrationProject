import {Component} from 'react'

import DataTableing from '../DataTableing';

import './index.css'

const profile = require("./images/profilepic.png").default

export default class Home extends Component {

    state = {image: profile,isActive:false,selectedJobType:'',allData : [],
            name:'',
            mobile:'',
            dob:'',
            email:'',
            reRenderData:''}

    // image related


    onChangePhoto = event =>{
        const selectedImage = event.target.files[0];
        if (selectedImage !== undefined){
            const src = URL.createObjectURL(selectedImage);
            this.setState({image:src,isActive:true});
        }
    }


    // prevent default on form submit

    preventDefault = event =>{
        event.preventDefault();
    }

    selectJobType = event =>{
        this.setState({selectedJobType : event.target.innerText});
    }

    componentDidMount(){
        this.getData()
    }

    // Intializing and getting data

    getData = async () =>{
        const apiUrl = "http://localhost:5004/"
        const options = {
            headers:{
                "content-type": "application/json"
            },
            method: 'GET',
        }
        const responseData = await fetch(apiUrl,options);
        if(responseData.ok === true){
            const fetchedData = await responseData.json();
            const updatedData = fetchedData.map( item => ({
                name : item.Name,
                email : item.Email,
                mobile : item.Mobile,
                dob : item.DOB,
                jobType : item.JobType,
            }));
            this.setState({allData:updatedData});
        }
    }


    //getting Data from inputs

    onBlurEvent = event =>{
        const enteredValue = event.target.value;
        console.log(enteredValue)
        switch(event.target.id){
            case 'name':
                this.setState({name:enteredValue});
                break;
            case 'email':
                this.setState({email:enteredValue});
                break;
            case 'date':
                this.setState({dob:enteredValue});
                break;
            case 'number':
                this.setState({mobile:enteredValue});
                break;
            default:
                return null
        }
    }


    // OnClick add button

    onClickAdd = async () => {
        const {name,email,mobile,dob,selectedJobType} = this.state;
        if(name !== '' && email !== '' && mobile !== '' && selectedJobType !== '' && dob !== '') {
            const apiUrl = "http://localhost:5004";
            const options = {
                headers:{
                    "content-type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Mobile: mobile,
                    DOB : dob,
                    JobType: selectedJobType,
                })
            }
            const response = await fetch(apiUrl, options);
            if(response.ok === true){
                this.setState({reRenderData:''});
            }
        }
    }


    // rendering

    render(){
        const {image,selectedJobType,allData} = this.state;

        let count = 0;

        return (<div className="main-container">
            <fieldset>
                <legend>Registration</legend>
                <form className="form-container" onSubmit={this.preventDefault}>
                    <div className="name-photo">
                        <div className="name-container">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" 
                            className="form-control inputs name" 
                            onBlur={this.onBlurEvent}/>
                        </div>
                        <div className="photo-container">
                            <label htmlFor="photo" className="photolabel">
                                <p className="profilepic-para">Profile Pic</p>
                                <img src={image} alt="person" className="profilepic"/>
                            </label>
                            {/* {isActive?(<img src={image} alt="profile pic"/>):
                                (<label htmlFor="photo">
                                    <img src={require("./images/profilepic.png").default} alt="person" className="profilepic"/>
                                </label>)
                            } */}
                            <input type="file" id="photo" accept="image/*" className="photo-input inputs" onChange={this.onChangePhoto}/>
                        </div>
                    </div>
                    <div className="mobile-email">
                        <div className="mobile">
                            <label htmlFor="number">Mobile</label>
                            <input type="text" id="country" className="country inputs" defaultValue="+91"/>
                            <input type="text" id="number" className="number" onBlur={this.onBlurEvent}/>
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="emailinput inputs" onBlur={this.onBlurEvent}/>
                        </div>
                    </div>
                    <div className="jobtype-dob">
                        <div className="jobtype">
                            <p className="jobtype-para">Job Type</p>
                            <div className="types">
                                <p className={selectedJobType === "FT"?"job-para ft blue":"job-para ft"} 
                                onClick={this.selectJobType}>FT</p>
                                <p className={selectedJobType === "PT"?"job-para GT blue":"job-para gt"} 
                                onClick={this.selectJobType}>PT</p>
                                <p className={selectedJobType === "Consultant"?"job-para consultant blue":"job-para consultant"} 
                                onClick={this.selectJobType}>Consultant</p>
                            </div>
                        </div>
                        <div className="dob">
                            <label className="date" htmlFor="date">DOB</label>
                            <input type="date" id="date" className="dateinput inputs" onBlur={this.onBlurEvent}/>
                        </div>
                    </div>
                    <div className="location-submit">
                        <div className="location-container">
                            <label className="location" htmlFor="location">Pref.Location</label>
                            <select id="location" className="select-item">
                                <option>Hyderabad</option>
                                <option>Banglore</option>
                                <option>Chennai</option>
                            </select>
                        </div>
                        <button className="btn" type="reset" onClick={this.onClickAdd}>Add/Update</button>
                    </div>
                </form>
            </fieldset>
            <div className="table-container">
                <table className="table sticky table-head">
                    <thead className="head-container">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>DOB</th>
                            <th>JobType</th>
                        </tr>
                    </thead>
                    <tbody className="table-body-container">
                        {allData.map(person => (
                            <DataTableing key={count += 1} fullData={person} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
    }
}

/* 
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
                        {allData.map(item =>(
                            <DataTableing key={count += 1} fullData={item} />
                        ))}
                    </tbody>
                </table>
        </div> */