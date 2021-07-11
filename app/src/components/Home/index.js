import {Component} from 'react'

import './index.css'

const profile = require("./images/profilepic.png").default

export default class Home extends Component {

    state = {image: profile,isActive:false,selectedJobType:''}

    onChangePhoto = event =>{
        const selectedImage = event.target.files[0];
        if (selectedImage !== undefined){
            const src = URL.createObjectURL(selectedImage);
            this.setState({image:src,isActive:true});
        }
    }

    preventDefault = event =>{
        event.preventDefault();
    }

    selectJobType = event =>{
        this.setState({selectedJobType : event.target.innerText});
    }

    render(){
        const {image,selectedJobType} = this.state

        return (<div className="main-container">
            <fieldset>
                <legend>Registration</legend>
                <form className="form-container" onSubmit={this.preventDefault}>
                    <div className="name-photo">
                        <div className="name-container">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" className="form-control inputs name"/>
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
                            <input type="text" id="number" className="number"/>
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="emailinput inputs"/>
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
                            <input type="date" id="date" className="dateinput inputs"/>
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
                        <button className="btn" type="button">Add/Update</button>
                    </div>
                </form>
            </fieldset>
        </div>)
    }
}