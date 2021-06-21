const beeline = require("honeycomb-beeline");

function delay(ms) {
    return beeline.startAsyncSpan({
        name: "delay",
        time: ms
    }, (span) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                beeline.finishSpan(span);
                resolve();
            }, ms);
        })
    });
}

async function doAnotherThing() {
    await beeline.startAsyncSpan({
        name: "doAnotherThing",
    }, async (span) => {
        try {
            await delay(200);
            await delay(200);
        } finally {
            beeline.finishSpan(span);
        }
    });
}

async function doStuff() {
    const span = beeline.startAsyncSpan({
        name: "doStuff",
    }, async (span) => {
        try {
            await delay(100);
            await doAnotherThing();
            await delay(300);
        } finally {
            beeline.finishSpan(span);
        }
    });
}

module.exports = {
    doStuff,
}