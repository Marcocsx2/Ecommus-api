import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
});

export const uploadOneFile = async (
  file: any,
  folder: string,
  user_id: string
) => {
  let date = new Date().getTime();
  const filetoUpload = {
    Bucket: `${process.env.aws_bucket_name}/${folder}/${user_id}`,
    Key: `${date}-${file.name}`.replace(/ /g, ""),
    Body: file.data,
    ACL: "public-read",
  };

  const responseS3 = await s3
    .upload(filetoUpload, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data.Location);
    })
    .promise();

  console.log("RESPONSE:", responseS3);
  return responseS3;
};

export const uploadFile = async (
  file: any,
  folder: string,
  user_id: string
) => {
  var urlPhotos = [];

  for (var i = 0; i < file.length; i++) {
    let date = new Date().getTime();
    const filetoUpload = {
      Bucket: `${process.env.aws_bucket_name}/${folder}/${user_id}`,
      Key: `${date}-${file[i].name}`.replace(/ /g, ""),
      Body: file[i].data,
      ACL: "public-read",
    };

    const responseS3 = await s3
      .upload(filetoUpload, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log("success");
      })
      .promise();

    urlPhotos.push(responseS3.Location);
  }

  return urlPhotos;
};
