const firebaseConfig = {
    apiKey: "AIzaSyBQ7megZYkPFoPEBQa6c3qlFPCYW6zcJ6Q",
    authDomain: "bankdatabase-7586f.firebaseapp.com",
    databaseURL: "https://bankdatabase-7586f-default-rtdb.firebaseio.com",
    projectId: "bankdatabase-7586f",
    storageBucket: "bankdatabase-7586f.appspot.com",
    messagingSenderId: "793598603132",
    appId: "1:793598603132:web:f64493c24c6bb4b312bef9",
    measurementId: "G-E7L5P10J7N"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var username = document.getElementById("username");
var errorTextUsername = document.getElementById("errorTextUsername");
var errorTextPassword = document.getElementById("errorTextPassword");
var password = document.getElementById("password");

username.addEventListener("blur",function(){
    if(checkWhiteSpace(this.value)){
        errorTextUsername.textContent = "input error";
    }else{
        errorTextUsername.textContent = "";
    }
});
password.addEventListener("blur",function(){
    if(isMinLength(password.value)){
        errorTextPassword.textContent = "";
    }else{
        errorTextPassword.textContent = "minimum characters is 4";
    }
});
function checkWhiteSpace(inputText){
    if(inputText.trim().indexOf(' ')!= -1){
        return true;
    }else{
        return false;
    }
}
function isMinLength(inputText){
    if(inputText.trim().length>=4){
        return true;
    }else{
        return false;
    }
}
function onSubmitForm(event){
    event.preventDefault();
    var usernameText = username.value;
    var PasswordText = password.value;
    firebase.auth().signInWithEmailAndPassword(usernameText, PasswordText)
    .then((userCredential) => {
      // User signed in successfully
      const user = userCredential.user;
      console.log('User signed in:', user);
      // Perform further actions after successful sign-in
      window.Android.onLoginSuccess(usernameText);
    })
    .catch((error) => {
      // Handle sign-in errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Sign-in error:', errorCode, errorMessage);
      switch(errorCode){
        case 'auth/invalid-email':
            errorTextUsername.textContent = "invalid email address"
            break;
        case 'auth/user-not-found':
            errorTextUsername.textContent = "user not found"
            break;
        case 'auth/user-disable':
            errorTextUsername.textContent = "user disable"
            break;
        case 'auth/wrong-password':
            errorTextPassword.textContent = "wrong password"
            break;
      }
    });

}