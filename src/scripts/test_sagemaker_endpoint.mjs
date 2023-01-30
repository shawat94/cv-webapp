import { AddAssociationCommand, SageMakerClient } from "@aws-sdk/client-sagemaker"
import { fs } from 'fs'


const RequestIdentification = async () => {
    const client = new SageMakerClient({ region: "us-west-2" })

    const bitmap = fs.readFileSync("/Users/adamshaw/Downloads/img_59978.jpg")

    const params = {
        Body: bitmap,
        EndpointName: "fashion-mnist-ep-2023-01-24-01-12-34",
        ContentType: "image/jpeg"
    }

    const command = new AddAssociationCommand(params)

    try {
        const data = await client.sent(command)
    } catch (error) {
        console.log(error)
    } finally {
        console.log('done')
    }
}

export default RequestIdentification