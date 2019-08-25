const router = require('express').Router();

const Users = require('./userModel');

const handleServerError = require('./actions').handleServerError;

router.get('/', (req, res) => {
	Users.getUsers()
		.then(usersList => 
			res.status(200).json(usersList)
		)
		.catch(error => handleServerError(res, error));
});

router.put('/', (req, res) => {
	const newUser = {
		name: req.body.name,
		username: req.body.username,
	}

	Users.addUser(newUser)
		.then(newUser => res.status(201).json(newUser))
		.catch(error => {
			if (error.code === 11000) {
				return res.status(400).json({
					message: 'Username already in use.',
					errorCode: error.code
				});
			} else {
				handleServerError(error, res);
			}
		});
});

router.get('/:id', (req, res) => {
	Users.getUserById(req.params.id)
		.then(user => res.status(200).json(user))
		.catch(error => {
      if (error.name === 'CastError') {
        return res.status(404).json({ message: 'No record found.' });
      } else {
        return handleServerError(error, res);
      }
    });
});

router.put('/:id', (req, res) => {
	/* Assumes that the request has proper params */

	Users.updateUser(req.params.id, req.body)
		.then(result => {
			if (!result) {
				return res.status(404).json({ message: 'No record found.' });
			}
			return res.status(201).json(result);
		})
		.catch(error => {
			if (error.code == 11000) {
				return res
					.status(400)
					.json({ message: 'Username already in use.', errorCode: error.code });
			} else {
				handleServerError(error, res);
			}
		});
});

module.exports = router;
