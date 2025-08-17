export class AuthMiddleware {
    static isAdminAuthenticated(req, res, next) {
        let isAdmin = req.headers['x-admin-auth'];
        if (isAdmin/*  && isAdmin === 'true' */) {
            return next();
        }
        res.status(401).json({ message: 'Unauthorized' });
    }

    static isUserAuthenticated(req, res, next) {
        let isUser = req.headers['x-user-auth'];
        if (isUser) {
            return next();
        }
        res.status(401).json({ message: 'Unauthorized' });
    }
}