import '../../img/btc.png';

export default function ({ network }) {
    let src;
    switch (network) {
        case 'bitcoin': {
            src = './btc.png';
            break;
        }
    }

    return src;
}