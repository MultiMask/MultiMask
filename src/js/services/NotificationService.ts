import {apis} from 'helpers/browsers';
import InternalMessage from './InternalMessage'

let openWindow = null;

export default class NotificationService {

    /***
     * Opens a prompt window outside of the extension
     * @param notification
     */
    public static async open (notification){
        if(openWindow){
            openWindow.close();
            openWindow = null;
        }


        const height = 600;
        const width = 700;
        const middleX = window.screen.availWidth/2 - (width/2);
        const middleY = window.screen.availHeight/2 - (height/2);

        const getPopup = async () => {
            try {
                const url = apis.runtime.getURL('/dialog.html');

                // Notifications get bound differently depending on browser
                // as Firefox does not support opening windows from background.
                if(typeof browser !== 'undefined') {
                    const created = await apis.windows.create({
                        url,
                        height,
                        width,
                        type:'popup'
                    });

                    window.notification = notification;
                    return created;
                }
                else {
                    const win: any = window.open(url, 'MultiMaskPromp', `width=${width},height=${height},resizable=0,top=${middleY},left=${middleX},titlebar=0`);
                    win.data = notification;
                    openWindow = win;
                    return win;
                }
            } catch (e) {
                console.log('notification error', e);
                return null;
            }
        }

        // await InternalMessage.payload().send();

        const popup = await getPopup();

        // Handles the user closing the popup without taking any action
        popup.onbeforeunload = () => {
            notification.responder(new Error("Close without action"));

            // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
            // Must return undefined to bypass form protection
            openWindow = null;
            return undefined;
        };

    }

    /***
     * Always use this method for closing notification popups.
     * Otherwise you will double send responses and one will always be null.
     */
    public static async close (){
        if(typeof browser !== 'undefined') {
            const {id: windowId,} = (await apis.windows.getCurrent());
            apis.windows.remove(windowId);
        } else {
            window.onbeforeunload = () => {};
            window.close();
        }
    }

}