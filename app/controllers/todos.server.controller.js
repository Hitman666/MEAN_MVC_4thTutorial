var mongoose = require('mongoose'),
	Todo = mongoose.model('Todo');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.create = function(req, res) {
	var todo = new Todo(req.body);
	todo.creator = req.user;
	todo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(todo);
		}
	});
};

exports.list = function(req, res) {
	Todo.find().sort('-created').populate('creator', 'name username').exec(function(err, todos) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(todos);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.todo);
};

exports.todoByID = function(req, res, next, id) {
	Todo.findById(id).populate('creator', 'name username').exec(function(err, todo) {
		if (err)
			return next(err);

		if (!todo)
			return next(new Error('Failed to load todo ' + id));

		req.todo = todo;
		next();
	});
};

exports.update = function(req, res) {
	var todo = req.todo;
	todo.title = req.body.title;
	todo.comment = req.body.comment;
	todo.completed = req.body.completed;
	
	todo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(todo);
		}
	});
};

exports.delete = function(req, res) {
	var todo = req.todo;
	todo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(todo);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.todo.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};