
    require('dotenv').config()
    const http = require('http');


    const port = process.env.PORT || 3000;

    const serveStatic = require('./serve-static')

    const urlQuery = require('url');
    process.env.REDIRECT_URL = (process.env.SERVER === 'LOCAL_SERVER' || process.env.SERVER === 'LOCAL') ? process.env.DEV_REDIRECT_URL : process.env.PRODUCTION_REDIRECT_URL

    const server = http.createServer(async (req, res) => {
        const { url } = req

        res.statusCode = 200;
        switch (true) {
            case /.*local_workflow.*/.test(url):
                break;
            default:
debugger
                serveStatic(req, res)
        }
    })

    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });




