import { Request, Response, NextFunction } from 'express';

export function ApiMiddleware(req: Request, res: Response, next: NextFunction) {
  
  const token = req.headers.authorization;
  const tokenDecodablePart = token.split('.')[1];
  const decodedSign: any = Buffer.from(tokenDecodablePart, 'base64').toString();
  const decodedObjectSign = JSON.parse(decodedSign);

  if (decodedObjectSign?.name !== process.env.NAME || decodedObjectSign?.lastname !== process.env.LASTNAME) {
    return next(new Error('Invalid sign'));
  }

  next();
};