// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"
import localforage from "localforage"
import toast from "react-hot-toast"

const firebaseConfig = {
    apiKey: "AIzaSyCRZYezyYFoS6sDxgP6aEhU_OIf-vPVcvw",
    authDomain: "push-notifications-8740d.firebaseapp.com",
    projectId: "push-notifications-8740d",
    storageBucket: "push-notifications-8740d.appspot.com",
    messagingSenderId: "614726507164",
    appId: "1:614726507164:web:90a5c0daee7a351e8beb59",
    measurementId: "G-6RSTCB360P"
}
  
// Initialize Firebase

const firebaseCloudMessaging = {
  init: async () => {
     initializeApp(firebaseConfig)

    try {
      const messaging = getMessaging()
    //   const tokenInLocalForage = await localforage.getItem("fcm_token")

    //   // Return the token if it is alredy in our local storage
    //   if (tokenInLocalForage !== null) {
    //     return {token: tokenInLocalForage, messaging}
    //   }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission()
      if (status && status === "granted") {
        // Get new token from Firebase
        const fcm_token = await getToken(messaging, {
          vapidKey:
            "BF7dvvQieL-SzKrpjr11C8aARciRu1zpRTs3Sfvut-oJ58wu_r6dZenw7hboByYn3_YN_AECxVhKosQcIXoGOW0",
        })
        console.log("token in fcm_token", fcm_token)
        // Set token in our local storage
        return {token: fcm_token, messaging}
      }
      else{
        toast.error('Enable Notifications to use this app!')
      }
    } catch (error) {
      console.log(error.message)
      return null
    }
  },
}
export { firebaseCloudMessaging }