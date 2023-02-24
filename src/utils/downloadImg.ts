const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config();

module.exports = {
    downloadImg: async () => {
        try {
            const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
            console.log(response)
            const url = response.data.url;
            const fileName = 'myImage';
            const writer = fs.createWriteStream(`${path.resolve()}/asset/${fileName}.jpg`);

            const responseForImage = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
            });

            responseForImage.data.pipe(writer);

            writer.on('finish', () => {
                console.log(`[+]=> The NASA Picture of the Day has been downloaded as ${fileName}`);
                sharp(path.resolve() + 'myImage.jpg')
                    .resize(1696, 1064)
                    .toFile(path.resolve() + 'myImage.jpg', (err: any, info: any) => {
                        if (!err) {
                            console.log(info);
                        }
                        console.log(err['message']);
                    })
            });

            writer.on('error', (err: any) => {
                console.error(err);
                throw new Error('Something went wrong')
            });
        }
        catch (error) {
            console.error(error);
        }
    }
};