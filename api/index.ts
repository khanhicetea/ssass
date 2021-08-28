import express from 'express'
import { Request, Response } from 'express'
import { parseRequest } from './_lib/parser';
import { getScreenshotFromUrl, getScreenshotFromBody } from './_lib/chromium';

const isDev = !process.env.AWS_REGION;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/api/from/url', async (req : Request, res : Response) => {
    const ssReq = parseRequest(req)

    const fileType = "png";
    const file = await getScreenshotFromUrl(ssReq, fileType, isDev);

    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(file);
});

app.post('/api/from/body', async (req : Request, res : Response) => {
    const ssReq = parseRequest(req)
    
    const fileType = "png";
    const file = await getScreenshotFromBody(ssReq, fileType, isDev);

    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`);
    res.end(file);
});

export default app
