import { JSDOM } from 'jsdom';
import * as pc from 'playcanvas';

let jsdom;

export const jsdomSetup = () => {
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';

    jsdom = new JSDOM(html, {
        resources: 'usable',         // Allow the engine to load assets
        runScripts: 'dangerously',   // Allow the engine to run scripts
        url: 'http://localhost:3000' // Set the URL of the document
    });

    // Copy the window and document to global scope
    global.window = jsdom.window;
    global.document = jsdom.window.document;
    global.navigator = jsdom.window.navigator;

    pc.platform.browser = true;

    // Copy the DOM APIs used by the engine to global scope
    global.ArrayBuffer = jsdom.window.ArrayBuffer;
    global.Audio = jsdom.window.Audio;
    global.DataView = jsdom.window.DataView;
    global.Image = jsdom.window.Image;
    global.KeyboardEvent = jsdom.window.KeyboardEvent;
    global.MouseEvent = jsdom.window.MouseEvent;
    global.XMLHttpRequest = jsdom.window.XMLHttpRequest;

    const requestAnimationFrameQueue = new Map();
    let requestAnimationFrameId = 0;

    global.requestAnimationFrame = function (callback) {
        const id = ++requestAnimationFrameId;
        requestAnimationFrameQueue.set(id, callback);

        setTimeout(() => {
            if (requestAnimationFrameQueue.has(id)) {
                requestAnimationFrameQueue.get(id)(Date.now());
                requestAnimationFrameQueue.delete(id);
            }
        }, 16); // Approximate 60FPS (16.67ms per frame)

        return id;
    };

    const cancelAnimationFrame = function (id) {
        requestAnimationFrameQueue.delete(id);
    };

    global.cancelAnimationFrame = global.window.cancelAnimationFrame = cancelAnimationFrame;

    // Copy the PlayCanvas API to global scope (only required for 'classic' scripts)
    jsdom.window.pc = pc;
};

export const jsdomTeardown = () => {
    jsdom = null;
};
