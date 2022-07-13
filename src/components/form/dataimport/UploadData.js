import '../../../App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import PropTypes from 'prop-types';
import Files from './Files';
import axios from 'axios'
import Papa from 'papaparse';
import { useState } from "react";


const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
const extRegexp = /\.[a-zA-Z0-9]*$/;


class UploadData extends React.Component {

    constructor (props) {

        super(props)
        this.state = {
            files: []
        }
    }

    onFilesChange = (files) => {
        this.setState({
            files
        }, () => {
            console.log(this.state.files)
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    filesUpload = () => {
        const formData = new FormData()
        Object.keys(this.state.files).forEach((key) => {
            const file = this.state.files[key]
            formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
        })

        axios.post(`/files`, formData)
            .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
            .catch(err => window.alert('Error uploading files :('))
    }


    render() {

        const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
          color: grey;
          &.Mui-selected {
            color: #1d4189;
          };
        `);

       /* // State to store parsed data
        const [parsedData, setParsedData] = useState([]);

        //State to store table Column name
        const [tableRows, setTableRows] = useState([]);

        //State to store the values
        const [values, setValues] = useState([]);*/

        const changeHandler = (event) => {
            // Passing file data (event.target.files[0]) to parse using Papa.parse
            Papa.parse(event.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray = [];
                    const valuesArray = [];

                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                        console.log(results);
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                },
            });
        };

        return (
            <React.Fragment className="Mainpage">
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Datei hochladen
                    </Typography>
                    <table style={{height:"100%"}}>
                        <tr>
                            <h3>Datei hochladen</h3>
                            <Files
                                ref='files'
                                className='files-dropzone-list'
                                style={{ height: '100px' }}
                                onChange={this.onFilesChange}
                                onError={this.onFilesError}
                                multiple
                                maxFiles={10}
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                            >
                                Drop files here or click to upload
                            </Files>
                            <br/>
                            <div style={{display:"flex", gap:"5%", width:"300%"}}>
                            <Button variant="outlined" onClick={this.filesRemoveAll}>Remove All Files</Button>
                            {/*<Button variant="outlined" onClick={this.filesUpload}>Upload</Button>*/}
                                <Button variant="outlined" onClick={changeHandler}>Upload</Button>
                            </div>
                            {
                                this.state.files.length > 0
                                    ? <div className='files-list'>
                                        <ul>{this.state.files.map((file) =>
                                            <li className='files-list-item' key={file.id}>
                                                <div className='files-list-item-preview'>
                                                    {file.preview.type === 'image'
                                                        ? <img className='files-list-item-preview-image' src={file.preview.url} />
                                                        : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                                                </div>
                                                <div className='files-list-item-content'>
                                                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                                    <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                                                </div>
                                                <div
                                                    id={file.id}
                                                    className='files-list-item-remove'
                                                    onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                                                />
                                            </li>
                                        )}</ul>
                                    </div>
                                    : null
                            }

                        </tr>
                        <tr style={{ width:"300%",height:"100%", display:"flex", justifyContent:"flex-end"}}>
                        <br/><br/>
                            <BottomNavigation showLabels>
                            <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon/>} component={Link}
                                                    to='/Datenquelle'/>
                            <BottomNavigationAction label="Löschen" icon={<DeleteIcon/>}/>
                            <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon/>} component={Link}
                                                    to='/Matching-Methode'/>
                        </BottomNavigation>
                    </tr>
                    </table>

                </CardContent>
            </React.Fragment>
        )
    }
}


UploadData.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string.isRequired,
    dropActiveClassName: PropTypes.string,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    accepts: PropTypes.array,
    multiple: PropTypes.bool,
    maxFiles: PropTypes.number,
    maxFileSize: PropTypes.number,
    minFileSize: PropTypes.number,
    clickable: PropTypes.bool,
    name: PropTypes.string,
    style: PropTypes.object
}

UploadData.defaultProps = {
    onChange: function (files) {
        console.log(files)
    },
    onError: function (error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
    },
    className: 'files-dropzone',
    dropActiveClassName: 'files-dropzone-active',
    accepts: null,
    multiple: true,
    maxFiles: Infinity,
    maxFileSize: Infinity,
    minFileSize: 0,
    name: 'file',
    clickable: true
}

export default UploadData;

