import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AppCloneInstagram';

  ngOnInit(): void {
    // The core Firebase JS SDK is always required and must be listed first -->
    //TODO: Add SDKs for Firebase products that you want to use
    //https://firebase.google.com/docs/web/setup#config-web-app -->

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBD4hPSVz7Yt71eVNroH0ce-5Sx0sp4Rtw",
      authDomain: "jta-instagram-clone-3.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-3.firebaseio.com",
      projectId: "jta-instagram-clone-3",
      storageBucket: "jta-instagram-clone-3.appspot.com",
      messagingSenderId: "315265567701",
      appId: "1:315265567701:web:584ee3a2970d08f7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
