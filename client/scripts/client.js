const app = angular.module('bootstrapApp', ['ngRoute']);

// Configure routes
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

// Service for interacting with the tasks API
app.service('TaskService', function($http) {
    const apiUrl = 'http://localhost:3000/';

    this.getAllTasks = function() {
        return $http.get(`${apiUrl}get_tasks`);
    };

    this.createTask = function(task) {
        return $http.post(`${apiUrl}create_task`, task);
    };

    this.deleteTask = function(id) {
        return $http.post(`${apiUrl}delete_tasks`, { id });
    };
});

// Controllers
app.controller('HomeController', function($scope) {
    $scope.message = 'Welcome to the Home Page!';
});

app.controller('TasksController', function($scope, TaskService) {
    $scope.tasks = [];
    $scope.newtask = "";

    $scope.loadTasks = function() {
        TaskService.getAllTasks()
            .then(function(response) {
                $scope.tasks = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching tasks:', error);
            });
    };

    $scope.addTask = function() {
        if ($scope.newtask) {
            TaskService.createTask({ task: $scope.newtask })
                .then(function(response) {
                    $scope.tasks.push(response.data);
                    $scope.newtask = "";
                })
                .catch(function(error) {
                    console.error('Error creating task:', error);
                });
        }
    };

    $scope.removeTask = function(index) {
        const taskId = $scope.tasks[index].id;
        TaskService.deleteTask(taskId)
            .then(function() {
                $scope.tasks.splice(index, 1);
            })
            .catch(function(error) {
                console.error('Error deleting task:', error);
            });
    };

    $scope.loadTasks(); 
});
