import core from 'puppeteer-core';
import { getOptions } from './options';
import { FileType, ScreenShotRequest } from './types';
let _page: core.Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await core.launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshotFromUrl(ssReq: ScreenShotRequest, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: ssReq.vw, height: ssReq.vh });
    await page.goto(ssReq.url);
    const file = await page.screenshot({ type });
    return file;
}

export async function getScreenshotFromBody(ssReq: ScreenShotRequest, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: ssReq.vw, height: ssReq.vh });
    await page.setContent(ssReq.body);
    const file = await page.screenshot({ type });
    return file;
}
