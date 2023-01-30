import React, { useState } from 'react'
import mnistService from '../services/mnistService'
import Prediction from './Prediction'
import { Button, Box } from '@mui/material'

const ImageSubmit = ({ setSelectedImages, selectedImages }) => {

    const [clothingIdentity, setClothingIdentity] = useState('')

    const fileInput = React.useRef()

    const predTextStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '5vw',
        marginBottom: '0px'
    }

    const inputTextStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '3vw'
    }

    const boxStyle = {
        border: '2px solid grey',
        backgroundColor: '#f0fff7',
        borderRadius: '10px',
        minHeight: '40vh',
        height: 'fit-content',
        position: 'relative'
    }

    const inputButtonStyle = {
        margin: '8px'
    }

    const hiddenInputButtonStyle = {
        display: 'none'
    }

    const identifyButtonStyle = {
        paddingTop: '20px'
    }
    
    const submitImage = async () => {
        let response = await mnistService.submitImage(selectedImages)
        let suggestions = response.data.body
        setClothingIdentity(suggestions)
    }

    const convertImageToBase64 = (image) => {
            return new Promise((resolve, reject) => {
                var fileReader = new FileReader()
                fileReader.readAsDataURL(image)
                fileReader.onload = () => {
                    resolve(fileReader.result.split(',')[1])
                }
                fileReader.onerror = (error) => {
                    console.log('Error reading image: ', error)
                    reject(error)
                }
            }
        )
    }   

    return (
        <div>
            <br/>
            <div style={{padding: '8px'}}>
                <Box style={boxStyle}>
                    <p style={inputTextStyle}>Select an image of the clothing article to be identified below</p>
                        {selectedImages && (
                        <div>
                            <img alt="uploaded image" width="60px" src={URL.createObjectURL(selectedImages)} />
                            <br/>
                            <Button variant="outlined" onClick={()=> {
                                setSelectedImages(null) 
                                setClothingIdentity(null)
                            }}>Remove</Button> 
                        </div>
                        )}
                    <div>
                        <Button style={inputButtonStyle} variant="outlined" onClick={()=>fileInput.current.click()}>
                            Upload Photos
                        </Button>
                    </div>
                    <input
                        style={hiddenInputButtonStyle}
                        ref={fileInput}
                        type="file"
                        onChange={(event) => {
                            setSelectedImages(event.target.files[0])
                            console.log(selectedImages)
                        }}
                    />
                </Box>
            </div>
            <div style={identifyButtonStyle}>
                <Button variant="contained" onClick={()=>submitImage()}>
                    Identify
                </Button>
            </div>
            {clothingIdentity && <h2 style={predTextStyle}>Predictions:</h2>}
            {clothingIdentity && clothingIdentity.map(suggestion => (
                <div>
                    <Prediction suggestion={suggestion}/>
                </div>
        ))}
        </div>
    )
}

export default ImageSubmit