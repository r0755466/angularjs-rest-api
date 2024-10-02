const app = angular.module('bootstrapApp', ['ngRoute']);


// Configure routes
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true); // Enable HTML5 mode

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    }).when('/tasks', {  // Route for tasks
        templateUrl: 'views/tasks.html',  // Ensure this file exists
        controller: 'TasksController'      // Controller for tasks
    }) .otherwise({
        redirectTo: '/'
    });
});

// Service for interacting with the tasks API
app.service('TaskService', function($http) {
    const apiUrl = 'http://localhost:5000/'; // Update to match your API
     // Fetch all tasks
     this.getAllTasks = function() {
        return $http.get(`${apiUrl}get_tasks`); // Make sure your backend handles this route
    };
     // Create a new task
     this.createTask = function(task) {
        return $http.post(`${apiUrl}add_tasks`, task); // Ensure this route is implemented in your backend
    };
     // Delete a task by ID
     this.deleteTask = function(id) {
        return $http.post(`${apiUrl}delete_tasks`, { id }); // Ensure this route is implemented in your backend
    };
});

// We want to add the controler

app.controller('HomeController', function($scope) {
    $scope.message = 'Welcome to the Home Page!';
});

app.controller('TasksController', function($scope, TaskService) {
    $scope.tasks = [];
    $scope.newtask = "";

     // Load all tasks
     $scope.loadTasks = function() {
        TaskService.getAllTasks()
            .then(function(response) {
                $scope.tasks = response.data; // Update the view with the fetched tasks
            })
            .catch(function(error) {
                console.error('Error fetching tasks:', error); // Log any errors
            });
        };

$scope.addTask = function() {
            if ($scope.newtask) {
                TaskService.createTask({ task: $scope.newtask }) // Send the new task to the backend
                    .then(function(response) {
                        $scope.tasks.push(response.data); // Add the new task to the list
                        $scope.newtask = ""; // Clear the input field
                    })
                    .catch(function(error) {
                        console.error('Error creating task:', error); // Log any errors
                    });
            }
        };
 // Remove a task
 $scope.removeTask = function(index) {
    const taskId = $scope.tasks[index].id; // Assuming the task has an 'id' property
    TaskService.deleteTask(taskId) // Send the task ID to delete it
        .then(function() {
            $scope.tasks.splice(index, 1); // Remove the task from the list
        })
        .catch(function(error) {
            console.error('Error deleting task:', error); // Log any errors
        });
};

// Initialize tasks on load
$scope.loadTasks(); // Fetch tasks when the controller is loaded
});