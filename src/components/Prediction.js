import React from 'react'
import { Box } from '@mui/material'

const Prediction = ({ suggestion }) => {
    const attributeStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '3vw',
        margin: '0px'
    }

    const valueStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '2.5vw',
        margin: '10px'
    }

    const boxStyle = {
        border: '2px solid grey',
        backgroundColor: 'white',
        borderRadius: '10px',
        position: 'relative'
    }

    const toPercent = (prob) => {
        let percent = (prob * 100)
        let truncated = Math.trunc(percent)
        return (`${truncated.toString()}%`)
    }

    return (
        <div style={{padding: '10px'}}>
            <Box style={boxStyle}>
                <p style={attributeStyle}>Article Type: </p>
                <p style={valueStyle}>{suggestion.class}</p>
                <p style={attributeStyle}>Confidence: </p>
                <p style={valueStyle}>{toPercent(suggestion.probability)}</p>
            </Box>
        </div>
    )
}

export default Prediction