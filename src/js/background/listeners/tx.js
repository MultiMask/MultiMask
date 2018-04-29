import createWindow from "../../libs/txWindow";

const tx = [];

export default ({ messaging, App }) => {
    // Show window with TX
    messaging.on("tx_send", data => {
        tx.push({
            ...data,
            id: tx.length
        });

        createWindow({});
    });

    // Show window with TX
    messaging.on("tx_create", data => {
        tx.push({
            id: tx.length,
            isNew: true
        });

        createWindow({});
    });

    // Render TX in popup
    messaging.on("payment_init", data => {
        messaging.send({
            type: "payment_tx",
            payload: tx[tx.length - 1]
        });
    });

    // Render TX in popup
    // messaging.on("payment_submit", payload => {
    //     const { id } = payload;
    //     tx[id] = {
    //         ...tx[id],
    //         ...payload
    //     };
    //     wallet.createTX(tx[id]);
    // });
};