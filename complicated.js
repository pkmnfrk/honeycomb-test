const beeline = require("honeycomb-beeline");

function delay(ms) {
    const span = beeline.startSpan({
        name: "delay",
        time: ms
    });
    return new Promise((resolve) => {
        setTimeout(() => {
            beeline.finishSpan(span);
            resolve();
        }, ms);
    })
}

async function doAnotherThing() {
    const span = beeline.startSpan({
        name: "doAnotherThing",
    });

    try {
        await delay(200);
        await delay(200);
    } finally {
        beeline.finishSpan(span);
    }
}

async function doStuff() {
    const span = beeline.startSpan({
        name: "doStuff",
    });

    try {
        await delay(100);
        await doAnotherThing();
        await delay(300);
    } finally {
        beeline.finishSpan(span);
    }
}

module.exports = {
    doStuff,
}