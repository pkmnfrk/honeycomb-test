const beeline = require("honeycomb-beeline");

beeline({
    dataset: process.env.LIBHONEY_DATASET,
    writeKey: process.env.LIBHONEY_API_KEY,
    serviceName: "honeycomb-test"
})

const complicated = require("./complicated");

async function entry(event, context) {
    const trace = beeline.startTrace({
        name: "entry",
        requestId: context.awsRequestId,
    })
    try {
        await complicated.doStuff();
        
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