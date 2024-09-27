import AppError from "@shared/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth'

interface TokenPayload{
    iat: number,
    exp: number,
    sub: string
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void{
          const authHeader =  request.headers.authorization;

          if(!authHeader){
              throw new AppError('JWT token is missing.')
          }

          // Bearer dkflçdklçfkdlçkflçdkflçkdlçfkdlçk
          const [ bearer , token] = authHeader.split(' '); // transformando em array os elementos separados pelo espaço = ['Bearer', 'dkflçdklçfkdlçkflçdkflçkdlçfkdlçk']

          try {
                const decodeToken = verify(token, authConfig.jwt.secret)

                const { sub } = decodeToken as TokenPayload

                 request.user = {
                      id: sub
                 }

                return next();
          } catch (error) {
                throw new AppError('Invalid JWT Token.')
          }

}
