import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {JWTService} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import crypto from 'crypto';
import {create} from 'ipfs-http-client';
import multer from 'multer';
import stream from 'stream';
import {TokenServiceBindings} from '../keys';

const {Duplex} = stream;
//IPFS conf
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

function bufferToStream(buffer: any) {
  const duplexStream = new Duplex()
  duplexStream.push(buffer)
  duplexStream.push(null)
  return duplexStream
}

function getHashFromFile(file: any) {
  // https://emn178.github.io/online-tools/sha256_checksum.html
  const fileBuffer = file.buffer;
  const objectCrypto = crypto.createHash('sha256');
  objectCrypto.update(fileBuffer);
  return objectCrypto.digest('hex');
}


export class StorageController {

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  // file upload to IPFS
  @authenticate("jwt")
  @post('/files-ipfs', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files to upload to IPFS',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @inject(AuthenticationBindings.CURRENT_USER) currentUser: UserProfile,
  ): Promise<Array<string>> {

    let ipfsHashes: Array<string> = [];

    // Upload to IPFS
    await new Promise<object>((resolve, reject) => {
      const storage = multer.memoryStorage()
      const upload = multer({storage})

      upload.any()(request, response, async (err: any) => {
        if (err) reject(err)
        else {

          for (const file of (request as any).files) {
            try {
              console.log("Submitting file to ipfs...")
              const added = await client.add(file.buffer);
              const ipfsLink = added.path;

              console.log('The file was saved in IPFS: https://ipfs.io/ipfs/' + ipfsLink);
              ipfsHashes.push(ipfsLink)

              // console.log("Submitting hash to SmartContract...")
              // code here....

            } catch (err) {
              console.error(err);
              reject(err);
            }
          }
          resolve(ipfsHashes);
        }
      })
    })

    return Promise.resolve(ipfsHashes);

  }



}


