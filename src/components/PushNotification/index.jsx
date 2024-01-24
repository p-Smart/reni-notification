import {onMessage} from "firebase/messaging"
import { toast } from "react-hot-toast"
import { firebaseCloudMessaging} from "./firebase"
import { useEffect } from "react"
import { useNotificationContext } from "@/contexts/notificationContext"


const PushNotification = ({setToken}) => {
    const {setTokenLoading} = useNotificationContext()

    const fetchClientToken = async (times=0) => {
        try {
           if(times<5){
            const firebase = await firebaseCloudMessaging.init()
            console.log('Initialized firebase')
                if(firebase?.token && firebase?.messaging){
                    console.log('Client Notification Token:', firebase?.token)
                    setToken(firebase?.token)


                    onMessage(firebase.messaging, (payload) => {
                        console.log('Message from App ', payload)
                        handleShowNotification(payload)
                    } )
                    return
                }
                console.log('Token and Messaging not available, so had to run again')
                return await fetchClientToken(++times)
           }
           return toast.error('Failed generating token, try again later')
          }
          catch (err) {
            console.log('Caught error. So had to run again')
            console.log(err.message)
            return await fetchClientToken(++times)
          }
          finally{
            setTokenLoading(false)
          }
    }

    const handleShowNotification = (notnOptions) => {
        toast(notnOptions.body)

        Notification.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
                    const notification = new Notification(notnOptions.title, {
                        body: notnOptions.body,
                        icon: notnOptions.icon,
                        image: notnOptions.image,
                        data: {
                            click_action: notnOptions.click_action
                        }
                    })
    
                    notification.addEventListener('error', (e) => {
                        console.log(e)
                        alert('Error displaying the notification')
                    })

                    notification.addEventListener('click', (e) => {
                        window.open(notnOptions.click_action, '_blank')
                    })
                } else {
                    alert('Please allow notifications access in site settings!')
                }
            })
            .catch((error) => {
                console.error('Error requesting notification permission:', error)
                toast.error(error.message)
            })
    }    


    useEffect( () => {        
        fetchClientToken()
    }, [] )


    return <></>
}


export default PushNotification