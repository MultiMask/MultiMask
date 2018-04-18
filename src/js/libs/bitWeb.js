export default class BitWeb {
  constructor({ stream }) {
    this.stream = stream;
  }

  isAuth() { }
  getUser() { }
  sendTransaction({ to, amount, data }) {
    console.log("send", to, amount, data);
    this.stream.write({
      type: "tx_send",
      payload: {
        to,
        amount,
        data
      }
    });
  }
  sendVote(to) { }
}
