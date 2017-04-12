angular.module('app.controllers', [])
  
.controller('myProfileCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope, $ionicPopup, $state) {
    $scope.user_ID = $rootScope.user_ID
    var ID = $rootScope.user_ID

    $http.get(API_ENDPOINT.url + '/user/' + ID)
    .success(function (response) {
        $scope.customerDetails = response;
        console.log(response.username)        
    })   
    
}])

.controller('editorCtrl', ['$scope', '$q', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope',
    '$state', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $stateParams, API_ENDPOINT, $rootScope, $state, $ionicPopup) {
    $scope.data = {
        username: '',
        password: '',
        phone_no: '',
        registration_id: $rootScope.push_notif_reg
    }

    var user_ID = $rootScope.user_ID

    $scope.update = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/user/' + user_ID,
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Updated successfully.',
                    template: 'Please login again.'
                })
                $state.go('login')

            }).error(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Update failed!',
                    template: response
                })
            })
        })
    };

}])

.controller('bookingRequestDetailsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT',
    '$rootScope', '$filter', '$ionicPopup', '$state', '$q',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope, $filter, $ionicPopup, $state, $q) {
    var worker_ID = $stateParams.worker_ID
    var booking_id = $stateParams.booking_ID

    function toTime(timeString) {
        var timeTokens = timeString.split(':');
        return new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
    }

    $scope.booking_time = toTime($stateParams.booking_time)
    console.log($scope.booking_time)
    

    $http.get(API_ENDPOINT.url + '/user/' + worker_ID)
    .success(function (response) {
        console.log(response)
        $scope.workerDetails = response
    })

    $scope.isDone = {
        is_done: true
    }

    $scope.finish = function () {
            {
                return $q(function (resolve, reject) {
                    $http({
                        url: API_ENDPOINT.url + '/booking/' + booking_id,
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: $scope.isDone

                    }).success(function (response) {
                        console.log(response)
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Job Completion',
                            template: 'Would you like to create feedback?',
                            buttons: [
                                {
                                    text: 'No, thank you.',
                                    onTap: function (e) {
                                        $state.go('menu.bookingrequests')
                                    }
                                },
                                {
                                    text: 'Yes please.',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                        $state.go('menu.feedbackForm', { "worker_id": worker_ID })
                                    }
                                }
                            ]
                        })

                    }).error(function (response) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Update failed!',
                            template: response
                        })
                    })
                })
            }
        }    

    $scope.data = {
        is_cancel: '1'
    }

    $scope.cancel = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/booking/' + booking_id,
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Booking Cancelled',
                    template: 'Thank You.'
                })
                $state.go('menu.bookingrequests')

            }).error(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Cancel failed!',
                    template: response
                })
            })
        })
    }

}])
   
.controller('bookingrequestsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var ID = $rootScope.user_ID


    $http.get(API_ENDPOINT.url + '/customer/' + ID + '/booking?is_taken=0&worker=1&is_cancel=0&is_done=0')
    .success(function (response) {
        console.log(response)        
        $scope.bReqs = response        
    })

    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/customer/' + ID + '/booking?is_taken=0&worker=1&is_cancel=0&is_done=0')
            .success(function (response) {
                $scope.bReqs = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    }

}])

.controller('searchCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$ionicPush',
    '$rootScope', 'HardwareBackButtonManager',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $ionicPush, $rootScope, HardwareBackButtonManager) {
    $scope.TOKEN
    
    HardwareBackButtonManager.disable()

    $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
    }).then(function (t) {
        console.log('Token saved:', t.token);
        $scope.TOKEN = t.token
        $rootScope.push_notif_reg = t.token
    });

    $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });
    
    $http.get(API_ENDPOINT.url +'/service')
    .success(function (response) {
        $scope.servicesList = response;
        console.log(response)
    })

    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/service')
            .success(function (response) {
                $scope.servicesList = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    }    
}])
    
.controller('menuCtrl', ['$scope', '$ionicHistory', '$state', '$rootScope', '$http', 'API_ENDPOINT', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $ionicHistory, $state, $rootScope, $http, API_ENDPOINT) {
    var x = $rootScope.user_ID

    $http.get(API_ENDPOINT.url + '/user/' + x)
        .success(function (response) {
            $scope.username = response.username;
            console.log($scope.username)
        })

    $scope.clear = function () {
        $ionicHistory.clearCache()
        $state.go('login')
    }

}])
   
.controller('loginCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT', '$rootScope',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $rootScope) {
    $scope.data = {
        username : '',
        password: ''
    }


    $scope.loading = true
    
    $scope.login = function () {
        $scope.loading = false
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/customer/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data
                
            }).success(function (response) {
                console.log(response)
                $rootScope.user_ID = response                    
                $state.go('menu.search')

            }).error(function (response) {
                $scope.loading = true
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: response
                })
            })
        })
        
    };

}])

.controller('signupCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT) {
    $scope.data = {
        barangay: '',
        first_name: '',
        last_name: '',
        email: '',
        username: '',        
        password: '',
        address: '',
        phone_no: ''        
    }

    $scope.numOnlyRegex = /^[0-9]*$/
    $scope.lettersOnlyRegex = /^[a-zA-Z]*$/

    $scope.loading = true

    $scope.signup = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/register',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }, 
                data: $scope.data 
                
            }).success(function (response) {
                $scope.loading = false
                console.log(response)
                var reg_id = response
                {
                    return $q(function (resolve, reject) {
                        $http({
                            url: API_ENDPOINT.url + '/customer/' + reg_id + '/verify',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            },
                            data: ''

                        }).success(function (response) {
                            console.log(response)
                            var alertPopup = $ionicPopup.alert({
                                title: 'Register success!',
                                template: 'Thank you! Please check your email to verify account.'
                            })
                            $state.go('login')

                        }).error(function (response) {
                            console.log(response)
                        })
                    })
                }

            }).error(function (response) {
                console.log(response)                
                var alertPopup = $ionicPopup.alert({
                    title: 'Register failed!',
                    template: response
                })
            })
        })
    }
}])

.controller('workersListCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT) {
    //var ID = $stateParams.jobID;
    $http.get(API_ENDPOINT.url + '/service/' + $stateParams.jobID + '/worker')
    .success(function (response) {
        $scope.workers = response;        
    })

    .error(function (response) {        
        var alertPopup = $ionicPopup.alert({
            title: 'Alert',
            template: 'No Workers Found'
        })
    })

    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/service/' + $stateParams.jobID + '/worker')
            .success(function (response) {
                $scope.workers = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    }    
}])
     
.controller('workerProfileCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var worker_id = $stateParams.workerID
    console.log(worker_id + ' this is the worker id')

    $http.get(API_ENDPOINT.url + '/user/' + worker_id)
    .success(function (response) {
        console.log(response)
        $scope.worker_info = response
    })

    $http.get(API_ENDPOINT.url + '/worker/' + worker_id + '/feedback')
    .success(function (response) {
        console.log(response)
        $scope.feedbacks = response
    })

}])
   
.controller('postBroadcastRequestCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup',
    'API_ENDPOINT', '$stateParams', '$rootScope', '$filter', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $stateParams, $rootScope, $filter, $ionicHistory) {
    $ionicHistory.nextViewOptions({
        disableBack: true
    })

    $scope.loading = true

    $http.get(API_ENDPOINT.url + '/service')
    .success(function (response) {
        $scope.services = response
    })

    var customer_id = $rootScope.user_ID

    $scope.tomorrow = new Date()
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1)

    $scope.placeHolder = {
        service_name: '',
        booking_time: '',
        booking_date: new Date()
    }
        
    $scope.data = {
        address: '',
        service_name: '',
        booking_time: '',
        booking_date: '',
        details: '',
        customer_id: customer_id
    }

    $scope.formatService = function () {
        var serv = $scope.placeHolder.service_name
        $scope.data.service_name = serv.name
        console.log($scope.data.service_name)
    }

    $scope.formatDate = function () {
        $scope.data.booking_date = $filter('date')($scope.placeHolder.booking_date, 'MM/dd/yyyy')
        console.log($scope.data.booking_date);
    };

    $scope.formatTime = function () {
        $scope.data.booking_time = $filter('date')($scope.placeHolder.booking_time, 'hh:mm a')
        console.log($scope.data.booking_time);
    };
        
    $scope.submitBroadcastRequest = function () {
        
        return $q(function (resolve, reject) {
            $scope.loading = false
            $http({
                url: API_ENDPOINT.url + '/booking',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Thank you!',
                    template: 'Your broadcast request has been submitted.'
                })
                $state.go('menu.search')

            }).error(function (response) {
                $scope.loading = true
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry there was an error.',
                    template: response
                })
            })
        })
    }
    
}])
   
.controller('sendBookingRequestCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup',
    'API_ENDPOINT', '$stateParams', '$rootScope', '$filter', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $stateParams, $rootScope, $filter, $ionicHistory) {
    $ionicHistory.nextViewOptions({
        disableBack: true
    })

    $scope.tomorrow = new Date()
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1)

    $scope.placeHolder = {
        date: new Date(),
        time: ''
    }

    $scope.loading = true

    $scope.data = {
        address: '',
        service_name: '',
        booking_time: '',
        booking_date: '',
        details: '',
        customer_id: $rootScope.user_ID,
        worker_id: $stateParams.workerID
    }

    console.log($scope.data.customer_ID + ' this is the customerID')
    console.log($scope.data.worker_ID + ' this is the workerID')

    $scope.formatDate = function () {
        $scope.data.booking_date = $filter('date')($scope.placeHolder.date, 'MM/dd/yyyy')
        console.log($scope.data.booking_date);
    }

    $scope.formatTime = function () {
        $scope.data.booking_time = $filter('date')($scope.placeHolder.time, 'hh:mm a')
        console.log($scope.data.booking_time);
    }

    $scope.submitBookingRequest = function () {
        return $q(function (resolve, reject) {
            $scope.loading = false
            $http({
                url: API_ENDPOINT.url + '/booking ',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }, 
                data: $scope.data 
                
            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Thank you!',
                    template: 'Your booking request has been sent.'
                })
                $state.go('menu.search', { reload: true, inherit: false });

            }).error(function (response) {
                $scope.loading = true
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry',
                    template: response
                })
            })
        })
    }

}])

.controller('feedbackCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var star = $stateParams.feedback_star
    $scope.feedback_details = $stateParams.feedback_details

    var worker_id = $stateParams.worker_id
    console.log(worker_id+ ' worker id to')

    var customer_id = $stateParams.cust_id

    $http.get(API_ENDPOINT.url + '/user/' + customer_id)
    .success(function (response) {
        console.log(response)
        $scope.customer_info = response
    })

    $http.get(API_ENDPOINT.url + '/worker/' + worker_id + '/feedback')
    .success(function (response) {
        console.log(response + ' response ng get feedback')
        $scope.feedback = response
    })   
     
    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor: 'rgb(200, 100, 100)',    //Optional
        rating: star, //Optional
        minRating: 1,    //Optional
        readOnly: true, //Optional
        callback: function (rating, index) {    //Mandatory
            $scope.ratingsCallback(rating, index);
        }
    };

    $scope.ratingsCallback = function (rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
    };

}])
 
.controller('feedbackFormCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT', '$rootScope',
    '$stateParams', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $rootScope, $stateParams, $ionicHistory) {
    var x = $stateParams.worker_id

    $ionicHistory.nextViewOptions({
        disableBack: true
    })

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor: 'rgb(200, 100, 100)',    //Optional
        rating: 3, //Optional
        minRating: 1,    //Optional
        readOnly: false, //Optional
        callback: function (rating) {    //Mandatory
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function (rating) {
        console.log('Selected rating is : ', rating)
        $scope.data.star = rating
        console.log($scope.data.star)
    };    

    $scope.data = {
        star: '',
        details: '',
        customer_id: $rootScope.user_ID,
        worker_id: x
    }

    $scope.submit = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/feedback',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Feedback Submitted',
                    template: 'Thank you very much!'
                })
                $state.go('menu.bookingrequests')
               

            }).error(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Submitting Error',
                    template: response
                })
            })
        })

    };    

}])

.controller('broadcastrequestsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var ID = $rootScope.user_ID
    console.log(ID)
    
    $http.get(API_ENDPOINT.url + '/booking/available?customer_id=' + ID)
    .success(function (response) {
        console.log(response)
        $scope.broadcastrequests = response
    })

    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/booking/available?customer_id=' + ID)
        .success(function (response) {
            console.log(response)
            $scope.broadcastrequests = response
        })
        $scope.$broadcast('scroll.refreshComplete');
    }

}])

.controller('broadcastRequestsDetailsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var book_id = $stateParams.book_id
    
    $http.get(API_ENDPOINT.url + '/booking/' + book_id + '/request')
   .success(function (response) {
       console.log(response.worker)
       $scope.applicant = response
   })
    


}])
    
.controller('logoutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('forgotpasswordCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT) {
    $scope.data = {       
        email: ''       
    }
    
    $scope.loading = true

    $scope.submit = function () {
        $scope.loading = false
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/user/forgot',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {                
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'New Password Sent',
                    template: 'Please check your email.'
                })

            }).error(function (response) {
                $scope.loading = true
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Register failed!',
                    template: response
                })
            })
        })
    }
}])

.controller('bookingHistoryCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var ID = $rootScope.user_ID
    console.log(ID)

    $http.get(API_ENDPOINT.url + '/customer/' + ID + '/booking?is_taken=0&worker=1&is_cancel=0&is_done=1')
    .success(function (response) {
        console.log(response)
        $scope.completedRequests = response
    })
        

}])