import { Request } from 'express';
import { ScreenShotRequest } from './types';

export function parseRequest(req: Request) {
    console.log('HTTP ' + req.url);
    const { url, vw, vh } = (req.query || {});

    if (Array.isArray(url)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(vw)) {
        throw new Error('Expected a single theme');
    }
    if (Array.isArray(vh)) {
        throw new Error('Expected a single theme');
    }

    const parsedRequest: ScreenShotRequest = {
        url: url?.toString() || '',
        vw: parseInt(vw?.toString() || '800'),
        vh: parseInt(vh?.toString() || '600'),
        body: req.body.html || '',
    };

    return parsedRequest;
}
