interface IGrabberDescription {
  main: string;
  cost: string;
  btntab: string;
  number: string;
  holdername: string;
  month: string;
  yaer: string;
  cvv: string;
}
const grabbers: IGrabberDescription[] = [];

const phantomCard = {
  main: 'div.cardPayment',
  cost: 'span.totalCost',
  btntab: 'div.cardPayment div.btntab',
  number: 'div.cardPayment input[name="cardnumber"]',
  holdername: 'div.cardPayment input[name="holdername"]',
  month: 'div.cardPayment input[name="month"]',
  yaer: 'div.cardPayment input[name="year"]',
  cvv: 'div.cardPayment input[name="cvv"]',
};
grabbers.push(phantomCard);

export const parseDocument = () => {
  grabbers.forEach(grab => {
    tryInject(document, grab);
  });
}

const tryInject = (doc, grabber: IGrabberDescription) => {
  const isReady = Object.entries(grabber).every((item: any) => doc.querySelector(item[1]));

  if (isReady) {
    const btnTab = doc.querySelector(grabber.btntab);
    const btn = doc.createElement('button');
    btn.innerHTML = 'Buy via MultiMask';
    btn.style.cssText = `
      border: 1px solid #eee;
      border-radius: 3px;
      outline: none;
      background: #ddd;
      padding: 3px 10px;
      font-weight: bold;
    `;
    btn.onclick = () => {
      doc.querySelector(grabber.number).value = '3243 3833 8575 7382';
      doc.querySelector(grabber.holdername).value = 'Mike Shukshin';
      doc.querySelector(grabber.month).value = '04';
      doc.querySelector(grabber.yaer).value = '2024';
      doc.querySelector(grabber.cvv).value = '032';
    }
  
    btnTab.appendChild(btn);
  }
}

