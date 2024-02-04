import multer from 'multer'
import multers3 from 'multer-s3'
import aws from 'aws-sdk'

const s3 = new aws.S3()
aws.config.update({
  accessKeyId: 'AKIA2UC3FPND7SWD7FUN',
  secretAccessKey: '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',
  region: 'sa-east-1',
})

const upload = multer({
  storage: multers3({
    // @ts-ignore
    s3,
    bucket: 'borischugus',
    acl: 'public-read', // Define as permissões do arquivo
    contentDisposition: 'attachment',
    contentType: multers3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { originalName: encodeURIComponent(file.originalname) })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    },
  }),
})

console.log({ upload })
export default upload
