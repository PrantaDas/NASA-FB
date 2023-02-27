const { handlePost } = require('../src/utils/handlePost.ts')
const { downloadImg } = require('../src/utils/downloadImg.ts')

const handleTask = async () => {
    try {
        let data = await downloadImg();
        await handlePost(data);
    }
    catch (e) { console.log(e) }
};

handleTask();



// setInterval(handleTask, 24 * 60 * 60 * 1000);