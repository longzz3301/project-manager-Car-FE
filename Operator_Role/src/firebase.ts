import firebase from "firebase/app";
import '@firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyBNAH1HlcNy9F9cOLd4ju7EOy0Ts-dVuY8",
    authDomain: "quanlixebtw2.firebaseapp.com",
    projectId: "quanlixebtw2",
    storageBucket: "quanlixebtw2.appspot.com",
    messagingSenderId: "234508292721",
    appId: "1:234508292721:web:2e1d2941ea7e1fd86e81d0",
    measurementId: "G-0YKDP9BMRG"
};
// các tham số này là phần config lấy ra được từ phần 2. setting firebase nhé
firebase.initializeApp(firebaseConfig)

export const message = firebase.messaging()


export default firebase