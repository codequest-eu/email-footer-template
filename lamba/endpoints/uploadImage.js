import { response } from "../common/response";
import * as fileType from "file-type";
import { v4 as uuid } from "uuid";
import * as AWS from "aws-sdk";

const s3 = new AWS.S3();

const allowedMimes = ["image/jpg", "image/png"];

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body || !body.avatar || !body.mime) {
      return response({ statusCode: 400, data: { message: "Incorrect data" } });
    }

    if (!allowedMimes.includes(body.mime)) {
      return response({
        statusCode: 400,
        data: { message: "Mime is not allowed" },
      });
    }

    let avatarData = body.avatar;
    if (body.avatar.substr(0, 7) === "base64,") {
      avatarData = body.avatar.substr(7, avatarData.length);
    }

    const buffer = Buffer.from(avatarData, "base64");
    const fileInfo = await fileType.fromBuffer(buffer);
    const detectedExt = fileInfo.ext;
    const detectedMime = fileInfo.mime;

    if (detectedMime !== body.mime) {
      return response({
        statusCode: 400,
        data: { message: "Mime types dont match" },
      });
    }

    const name = `${uuid()}.${detectedExt}`;

    await s3
      .putObject({
        Body: buffer,
        Key: name,
        ContentType: body.mime,
        Bucket: process.env.imageUploadBucket,
        ACL: "public-read",
      })
      .promise();

    const url = `https://${process.env.imageUploadBucket}.s3-${process.env.region}.amazonaws.com/${name}`;

    return response({ status: 200, data: { imageUrl: url } });
  } catch (error) {
    console.log("error", error);

    return response({
      status: 500,
      data: { message: error.message || "Failed to upload image" },
    });
  }
};
