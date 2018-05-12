export default function ({ network }) {
    let sign;
    switch (network) {
        case 'bitcoin': {
            sign = 'BTC';
            break;
        }
    }

    return sign;
}