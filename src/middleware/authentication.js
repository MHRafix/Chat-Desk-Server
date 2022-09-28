import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
	const token = jwt.sign(
		{
			_id: user._id,
			user_name: user?.user_name,
			user_email: user?.user_email,
			user_role: user?.user_role,
		},

		process.env.JWT_SECRET,
		{
			expiresIn: '30d', // 30d for 30 days
		}
	);
	return token;
};

export const isAuthentic = async (req, res, next) => {
	const { authorization } = req.headers;
	const bearer = req?.headers?.authorization?.startsWith('Bearer');
	if (authorization && bearer) {
		const token = authorization.slice(7, authorization.length);
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: 'Token is not valid' });
			} else {
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(401).send({ message: 'Token is not suppiled!' });
	}
};

export const isAdmin = async (req, res, next) => {
	if (req.user.user_role) {
		next();
	} else {
		res.status(401).send({ message: 'User is not admin!' });
	}
};
