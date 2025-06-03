const alphabetical = (arr, data, key) => {
  const sortedNames = [...arr].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  const sortedProducts = sortedNames
    .map((name) => data.find((item) => item[key] === name))
    .filter(Boolean);

  return sortedProducts;
};

const reverseAlphabetical = (arr, data, key) => {
  const sortedNames = [...arr].sort((a, b) =>
    b.toLowerCase().localeCompare(a.toLowerCase())
  );

  const sortedProducts = sortedNames
    .map((name) => data.find((item) => item[key] === name))
    .filter(Boolean);

  return sortedProducts;
};

const numHighToLow = (arr, data, key) => {
  // Check if all values are the same
  if (arr.every((val) => val === arr[0])) {
    return data;
  }

  const sortedNums = [...arr].sort((a, b) => b - a);

  const sortedProducts = sortedNums
    .map((num) => data.find((item) => Number(item[key]) === num))
    .filter(Boolean);

  return sortedProducts;
};

const numLowToHigh = (arr, data, key) => {
  // Check if all values are the same
  if (arr.every((val) => val === arr[0])) {
    return data;
  }

  const sortedNums = [...arr].sort((a, b) => a - b);

  const sortedProducts = sortedNums
    .map((num) => data.find((item) => Number(item[key]) === num))
    .filter(Boolean);

  return sortedProducts;
};

const rangeBetween = (start, end, allProducts) => {
  return allProducts.filter(
    (d) =>
      Number(d?.original_price) >= start && Number(d?.original_price) <= end
  );
};

const findingCategoryWise = (allProducts, catArray) => {
  return allProducts.filter(p => catArray.includes(p?.categoryName));
};


export {
  alphabetical,
  reverseAlphabetical,
  numHighToLow,
  numLowToHigh,
  rangeBetween,
  findingCategoryWise
};
