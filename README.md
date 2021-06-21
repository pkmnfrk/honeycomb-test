# honeycomb-test

## running locally

```bash
npm i
export LIBHONEY_DATASET=<your dataset>
export LIBHONEY_API_KEY=<your api key>
export DEBUG=honeycomb-beeline:*

node index
```

## running in serverless

1. update serverless.yml with your Honeycomb dataset and api key, and also deployment bucket
2. ```bash
   npm i
   sls deploy
   ```