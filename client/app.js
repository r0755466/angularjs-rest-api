const app = angular.module('bootstrapApp', ['ngRoute']);

// Configure routes
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true); // Enable HTML5 mode

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/tasks', {  // Route for tasks
        templateUrl: 'views/tasks.html',  // Ensure this file exists
        controller: 'TasksController'      // Controller for tasks
    })
    .otherwise({
        redirectTo: '/'
    });
});

// Service for interacting with the tasks API
app.service('TaskService', function($http) {
    const apiUrl = env.API_URL; // Update to match your API

    this.getAllTasks = function() {
        return $http.get(`${apiUrl}get_tasks`);
    };

    this.createTask = function(task) {
        return $http.post(`${apiUrl}add_tasks`, task);
    };

    this.deleteTask = function(id) {
        return $http.post(`${apiUrl}delete_tasks`, { id });
    };
});

// Controllers
app.controller('HomeController', function($scope) {
    $scope.message = 'Welcome to the Home Page!';
});

// Controller for managing tasks
app.controller('TasksController', function($scope, TaskService) {
    $scope.tasks = [];
    $scope.newtask = "";

    // Load all tasks
    $scope.loadTasks = function() {
        TaskService.getAllTasks()
            .then(function(response) {
                $scope.tasks = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching tasks:', error);
            });
    };

    // Add a new task
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

    // Remove a task
    $scope.removeTask = function(index) {
        const taskId = $scope.tasks[index].id; // Assuming the task has an 'id' property
        TaskService.deleteTask(taskId)
            .then(function() {
                $scope.tasks.splice(index, 1);
            })
            .catch(function(error) {
                console.error('Error deleting task:', error);
            });
    };

    // Initialize tasks on load
    $scope.loadTasks();
});
