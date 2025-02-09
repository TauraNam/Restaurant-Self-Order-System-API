import fs from 'fs'
import path from 'path'

export const fileDelete = (filePath) => {

    const fileLocation = path.resolve('uploads', filePath)

    fs.unlink(fileLocation, (err) => {
        if (err) {
            throw new Error(err)
        }
        return true;
    })
}