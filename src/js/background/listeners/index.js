import auth from './auth';
import tx from './tx';

export default ({ messaging, wallet, App }) => {

    auth({ messaging, wallet, App });
    tx({ messaging, wallet, App });

    // Is has wallet
    messaging.on("has_wallet", () => {
        wallet.isHasWallet().then(res => {
            messaging.send({
                type: "has_wallet_result",
                payload: res
            });
        });
    });

    // Create wallet
    messaging.on("wallet_create", payload => {
        wallet.create(payload.pass);

        messaging.send({
            type: "wallet_create_success"
        });
    });

    // Auth wallet
    messaging.on("wallet_auth", payload => {
        messaging.send({
            type: "wallet_auth_result",
            payload: wallet.auth(payload.pass)
        });
    });

    // GetWallet info
    messaging.on("wallet_info", () => {
        wallet.getInfo().then(data => {
            messaging.send({
                type: "wallet_info_result",
                payload: data
            });
        })
    });
}