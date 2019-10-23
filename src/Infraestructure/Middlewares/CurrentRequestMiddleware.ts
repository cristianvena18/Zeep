import { Request, Response, NextFunction } from "express"
import { injectable } from "inversify"

@injectable()
class CurrentRequestMiddleware{
    public Comprobate(req: Request, res: Response, next: NextFunction){
      if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Server requires application/json')
      } else {
        next()
      }
    }
}

export default CurrentRequestMiddleware;