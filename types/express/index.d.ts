import express from 'express'

interface MulterFile {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  size: number,
  bucket: string,
  key: string,
  acl: string,
  contentType: string,
  contentDisposition: string
  contentEncoding: any,
  storageClass: string,
  serverSideEncryption: any,
  metadata: {},
  location: string
  etag: string
  versionId?: string
}

declare global {
  namespace Express {
    interface Request {
      userId: string
      level: string
      file?: MulterFile
    }
  }
}