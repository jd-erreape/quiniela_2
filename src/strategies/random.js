const sample = (items) => {
  return items[Math.floor(Math.random()*items.length)];
};

module.exports = () => {
  return () => {
    return new Promise((resolve, reject) => {
      let arr = [];

      for(let i = 0; i < 15; i++){
        arr.push(sample([1,'X',2]))
      };

      resolve(arr);
    });
  };
};
