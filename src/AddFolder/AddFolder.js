import React, {Component} from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext';
import config from '../config';

class AddFolder extends Component{

    static contextType = ApiContext;

    handleSubmit = e => {
        const folder = {
            folder_name: e.target['folderName'].value
        }
        console.log(folder)
        fetch (`${config.API_ENDPOINT}/folders`,{
            method: 'POST',
            headers: {'content-type': 'application/JSON'},
            body: JSON.stringify(folder)
        })
        .then(response => {
            if(!response.ok){
                return response.json().then(e => Promise.reject(e))
            }
               return response.json()
        })
        .then(folder => {
            this.props.history.push('/')
            this.context.AddFolder(folder)
        })
        .catch(error => {
            console.error({error});     
        })
        }

    validateName = (event) => {
        event.preventDefault();
        console.log(this)
        const name = event.target['folderName'].value.trim()
        if (name.length === 0){
            return this.context.setError(true)
        } else if (name.length < 1) {
            return this.context.setError(true)
        } else {
            this.handleSubmit(event)
        }
    }

    render(){
        return(
            <div >
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.validateName}>
                
                {this.context.error ? '**Invalid Name **' : ''}
                
                <div> 
                    <label htmlFor="folderName">
                        Folder Name
                    </label>
                    <input type="text" id="folderName"></input>

                <button type="submit">Add Folder</button>
                
                </div>
                </NotefulForm>
            </div>
        )
    }
}

export default AddFolder;