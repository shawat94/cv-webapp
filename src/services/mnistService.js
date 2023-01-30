import axios from 'axios'

const baseUrl = 'https://e27pl9ceh5.execute-api.us-west-2.amazonaws.com/test'


const submitImage = async (image) => {

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
        })
    }   

    console.log('Submitting image')
    console.log(image)
    console.log(typeof image)
    let encodedImage = await convertImageToBase64(image)
    console.log(image)

    const requestConfig = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const requestObj = 
    {
        'image': encodedImage,
    }

    const response = await axios.post(`${baseUrl}/fashion`, requestObj, requestConfig)
    console.log(response)
    return response
}

export default { submitImage }