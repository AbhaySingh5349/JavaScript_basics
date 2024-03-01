const obj = {
  name: 'Prakash',
  age: 99,
  add: {
    city: 'Mumbai',
    state: 'MH',
  },
};

let key = 'pinCode';
obj[key] = '123456';

function getCopiedObject(source) {
  const targetObj = {};
  const keys = Object.keys(source); // [city, state]
  for (let key of keys) {
    if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
      targetObj[key] = getCopiedObject(source[key]);
    } else {
      targetObj[key] = source[key];
    }
  }
  return targetObj;
}

const copiedObj = getCopiedObject(obj);
copiedObj.name = 'Ashish';
(copiedObj.add.city = 'Sirsa'), (copiedObj.pinCode = 'abcjkjnj');
console.log(obj);
console.log(copiedObj);

// const copiedObj = {...obj, add: {...obj.add}};
// copiedObj.name = "Ashish";
// copiedObj.add.city = "Sirsa";
// copiedObj.add.state = "Haryana"
// console.log(obj);
// console.log(copiedObj);
