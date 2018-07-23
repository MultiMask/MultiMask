export default ({ messaging, App }) => {
  messaging.on('eth:init', () => {
    messaging.send({
      type: 'eth:inited'
    });
  });
};
