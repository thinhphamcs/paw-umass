// Import require
const AWS = require('aws-sdk');
// Without const variables the config won't work
const bucket = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
// Standard AWS config
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});
// New instance of S3
const s3 = new AWS.S3({ region: region });
// Upload a file to S3 function
async function uploadToS3(file) {
    const { createReadStream, filename } = await file; // Without await, can't access the file
    return new Promise((resolve, reject) => {
        s3.upload(
            {
                Bucket: bucket,
                Body: createReadStream(),
                Key: filename,
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            },
        );
    });
};
// Export the function to use
exports.uploadToS3 = uploadToS3
// Get a file from S3 function
function getObjectFromS3(fileKey) {
    return s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: fileKey,
        Expires: 3600
    });
}
// Export the function to use
exports.getObjectFromS3 = getObjectFromS3
