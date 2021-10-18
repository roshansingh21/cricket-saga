const generateRandomNo = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateWeighedList = (list, weight) => {
  let weighed_list = [];

  // Loop over weights
  for (let i = 0; i < weight.length; i++) {
    let multiples = weight[i] * 100;

    // Loop over the list of items
    for (let j = 0; j < multiples; j++) {
      weighed_list.push(list[i]);
    }
  }

  //shuffling the weighed list
  //   for (let i = weighed_list.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     let temp = weighed_list[i];
  //     weighed_list[i] = weighed_list[j];
  //     weighed_list[j] = temp;
  //   }

  return weighed_list;
};

export const calcRun = probability => {
  let runs = [0, 1, 2, 3, 4, 5, 6, -1];
  let weighedList = generateWeighedList(runs, probability);
  let randomNumber = generateRandomNo(0, weighedList.length - 1);
  return weighedList[randomNumber];
};

export const dynamicSort = property => {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
