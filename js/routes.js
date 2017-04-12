angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider



    .state('menu.myProfile', {
            url: '/myprofile',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/myProfile.html',
                    controller: 'myProfileCtrl'
                }
            }
        })

    .state('menu.bookingrequests', {
        url: '/messages',
        views: {
            'side-menu21': {
                templateUrl: 'templates/bookingrequests.html',
                controller: 'bookingrequestsCtrl'
            }
        }
    })

    .state('menu.bookingRequestDetails', {
        url: '/bookingdetails/:worker_ID/:booking_date/:booking_time/:details/:booking_address/:booking_ID',
        views: {
            'side-menu21': {
                templateUrl: 'templates/bookingRequestDetails.html',
                controller: 'bookingRequestDetailsCtrl'
            }
        }
    })

    .state('menu.broadcastrequests', {
        url: '/bRequests',
        views: {
            'side-menu21': {
                templateUrl: 'templates/broadcastRequests.html',
                controller: 'broadcastrequestsCtrl'
            }
        }
    })
    
    .state('menu.broadcastRequestsDetails', {
        url: '/broadcastdetails/:book_id',
        views: {
            'side-menu21': {
                templateUrl: 'templates/broadcastRequestsDetails.html',
                controller: 'broadcastRequestsDetailsCtrl'
            }
        }
    })

    .state('menu.search', {
        url: '/search',
        views: {
            'side-menu21': {
                templateUrl: 'templates/search.html',
                controller: 'searchCtrl'
            }
        }
    })

    .state('logout', {
        url: '/logout',
        templateUrl: 'templates/logout.html',
        controller: 'logoutCtrl'
    })

    .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('menu.workersList', {
        url: '/workerslist/:jobID',
        views: {
            'side-menu21': {
                templateUrl: 'templates/workersList.html',
                controller: 'workersListCtrl'
            }
        }
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    })

    .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotpasswordCtrl'
    })

    .state('menu.workerProfile', {
        url: '/workerprofile/:workerID/:wfn/:wln',
        views: {
            'side-menu21': {
                templateUrl: 'templates/workerProfile.html',
                controller: 'workerProfileCtrl'
            }
        }
    })

    .state('menu.postBroadcastRequest', {
        url: '/postbroadcastrequest',
        views: {
            'side-menu21': {
                templateUrl: 'templates/postBroadcastRequest.html',
                controller: 'postBroadcastRequestCtrl'
            }
        }
    })

    .state('menu.editor', {
        url: '/editor',
        views: {
            'side-menu21': {
                templateUrl: 'templates/editor.html',
                controller: 'editorCtrl'
            }
        }
    })

    .state('menu.sendBookingRequest', {
        url: '/sendbooking/:workerID/:wfn/:wln',
        views: {
            'side-menu21': {
                templateUrl: 'templates/sendBookingRequest.html',
                controller: 'sendBookingRequestCtrl'
            }
        }
    })
            
    .state('menu.feedback', {
        url: '/feedback/:worker_id/:cust_id/:feedback_star/:feedback_details',
        views: {
            'side-menu21': {
                templateUrl: 'templates/feedback.html',
                controller: 'feedbackCtrl'
            }
        }
    })

    .state('menu.feedbackForm', {
        url: '/feedbackform/:worker_id',
        views: {
            'side-menu21': {
                templateUrl: 'templates/feedbackForm.html',
                controller: 'feedbackFormCtrl'
            }
        }
    })

    .state('menu.bookingHistory', {
        url: '/bookingHistory',
        views: {
            'side-menu21': {
                templateUrl: 'templates/bookingHistory.html',
                controller: 'bookingHistoryCtrl'
            }
        }
    });

$urlRouterProvider.otherwise('/login')

  

});