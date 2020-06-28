const navbar = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const date = document.querySelector("#date");
// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
  }
});
// show sidebar
navBtn.addEventListener("click", function () {
  sidebar.classList.add("show-sidebar");
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
// set year
date.innerHTML = new Date().getFullYear();

app.controller('mainCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$timeout', '$rootScope' , function($scope, $firebaseObject, $firebaseArray, $timeout, $rootScope) {

  $scope.info = {}
  $scope.info.current_year = new Date().getFullYear();
  $scope.posts = []
  var refPosts = firebase.database().ref().child("posts")
  var temp = $firebaseArray(refPosts.limitToLast(6));
  temp.$loaded()
      .then(function() {
          temp.reverse()
          angular.forEach(temp, function (post) {
              var localeDate = post.date
              var extension = ".png";
              if (post.image_url.includes(".jpg")){
                  extension = ".jpg";
              }else if (post.image_url.includes(".jpeg")){
                  extension = ".jpeg";
              }
              var imageUrl = "https://firebasestorage.googleapis.com/v0/b/my-website-bf8d6.appspot.com/o/blog_images%2F"+localeDate+extension+"?alt=media"
              post.image = imageUrl;
              post.date = moment(localeDate, 'YYYYMMDDHHmm').locale('en').format('DD MMMM YYYY')
          })

          $scope.posts = []
          for (var i = 0; i < temp.length; i++) {
              $scope.posts.push(temp[i])
          }
          // var old_html = $("#slick").html();
          // $("#slick").slick('slick');
          $timeout(function() {
              $("#slick").slick('unslick')
              $("#slick").slick({
                  "slidesToShow": 2,
                  "slidesToScroll": 2,
                  "dots": true,
                  "infinite": false,

                  "responsive": [
                      {
                          "breakpoint": 991,
                          "settings": {
                              "slidesToShow": 2,
                              "slidesToScroll": 2
                          }
                      },
                      {
                          "breakpoint": 575,
                          "settings": {
                              "slidesToShow": 1,
                              "slidesToScroll": 1
                          }
                      }
                  ]
              });
          }, 10);

      });
  $("#role").typed({
      strings: ["Software Engineer", "Mobile Developer", "Mobile Designer", "Web Developer", "Digital Designer"],
      typeSpeed: 100,
      backDelay: 2000,
      loop: true,
      loopCount: false,
      cursorChar: "|",
  });
}]);


//Firebase Database for storing Contact Info.

var firebaseConfig = {
  apiKey: "AIzaSyC0XdNnmNnIquzHQ48ejrZW7H0biFrhpVg",
  authDomain: "my-blog-1b1ba.firebaseapp.com",
  databaseURL: "https://my-blog-1b1ba.firebaseio.com",
  projectId: "my-blog-1b1ba",
  storageBucket: "my-blog-1b1ba.appspot.com",
  messagingSenderId: "77775088481",
  appId: "1:77775088481:web:f3212f2bec1b81e538b320",
  measurementId: "G-KJBLZDMRV1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}
