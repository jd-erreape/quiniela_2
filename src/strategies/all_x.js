module.exports = () => {
  return () => {
    return new Promise((resolve, reject) => {
      let arr = [];

      for(let i = 0; i < 15; i++){
        arr.push('X')
      };

      resolve(arr);
    });
  };

};
