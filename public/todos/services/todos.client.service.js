angular.module('todos').factory('Todos', ['$resource',
	function($resource) {
		return $resource('api/todos/:todoId', {
			todoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);