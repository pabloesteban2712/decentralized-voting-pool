import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Token not exist" })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload
         
        ;(req as Request & { user?: JwtPayload }).user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Token expired or invalid" })
    }
}