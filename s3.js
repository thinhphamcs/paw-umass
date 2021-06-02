const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('./config/env.json');

const bucketName = AWS_BUCKET_NAME;
const region = AWS_BUCKET_REGION;
const accessKeyId = AWS_ACCESS_KEY;
const secretAccessKey = AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// uploads a file to s3
function upload(pathName, filename) {
    const fileStream = fs.createReadStream(pathName);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename
    }

    return s3.upload(uploadParams).promise();
}

exports.upload = upload

// download a file to s3
