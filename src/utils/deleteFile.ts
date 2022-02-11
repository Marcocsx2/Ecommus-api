import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
});

export const deleteFileToPost = async (file: any) => {
  const filetoDelete = {
    Bucket: process.env.aws_bucket_name,
    Key: file.split(".com/")[1],
  };

  const isDelete = await s3
    .deleteObject(filetoDelete, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        return false;
      } else {
        console.log(data);
        return true;
      }
    })
    .promise();

  console.log("RESPONSE:", isDelete);
  return isDelete;
};

export const deleteFile = async (file: any): Promise<any> => {
  const Objects = [];

  for (let x = 0; x < file.length; x++) {
    const deleteKey = { Key: file[x].split(".com/")[1] };
    Objects.push(deleteKey);
  }

  const params = {
    Bucket: process.env.aws_bucket_name,
    Delete: { Objects, Quiet: false },
  };

  console.log(Objects);

  const isDelete = await s3
    .deleteObjects(params, (err, data) => {
      if (err) {
        console.log("Error al eliminar las fotos", err);
        return false;
      } else {
        console.log("Data", JSON.stringify(data));
        return true;
      }
    })
    .promise();

  return isDelete;
};
