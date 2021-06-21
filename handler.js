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
        const span = beeline.startSpan({
            name: "delay"
        });

        await delay(1000);

        beeline.finishSpan(span);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
            }),
        }
    } finally {
        beeline.finishTrace(trace);
        await beeline.flush();
    }
}

module.exports = {
    entry
};