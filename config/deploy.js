module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'finndis',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
