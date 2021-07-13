import {Component} from 'react';

export default class DataTableing extends Component {
    render() {
        const {fullData} = this.props;
        const {name,email,mobile,dob,jobType} = fullData;

        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{mobile}</td>
                <td>{dob}</td>
                <td>{jobType}</td>
            </tr>
        );
    }
}