const beeline = require("honeycomb-beeline");

beeline({
    dataset: process.env.LIBHONEY_DATASET,
    writeKey: process.env.LIBHONEY_API_KEY,
    serviceName: "honeycomb-test"
})

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    })
}


async function entry(event, context) {
    const trace = beeline.startTrace({
        name: "entry",
        requestId: context.awsRequestId,
    })
    try {
        await beeline.startAsyncSpan({
            name: "delay"
        }, async (span) => {
            await delay(1000);
        })
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
            }),
        }
    } finally {
        beeline.finishTrace(trace);
    }
}

module.exports = {
    entry
};