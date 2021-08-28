export type FileType = 'png' | 'jpeg';

export interface ScreenShotRequest {
    url: string;
    body: string;
    vw: number;
    vh: number;
}
