export const joinStrings = (...values) => values.reduce((x, y) => x + " " + y);
export function createRoomId(...array) {
  return array.sort().toString();
}
export const calculateDiscount = (price, discount, qty = 1) => {
  return ((price * discount) / 100) * qty;
};
export function formatObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return {};
  }

  const formattedObj = {};

  for (const key in obj) {
    const value = obj[key];

    if (value !== null && value !== undefined && value !== "") {
      if (typeof value !== "object") {
        // const nestedObj = formatObject(value);

        // if (Object.keys(nestedObj).length > 0) {
        //   formattedObj[key] = nestedObj;
        // }
        formattedObj[key] = value;
      }
    }
  }

  return formattedObj;
}
export function findChangedValues(oldObj = {}, newObj = {}) {
  const changedValues = {};

  for (let key in newObj) {
    if (Object.hasOwn(newObj, key)) {
      let newValue = newObj[key];
      let oldValue = oldObj[key];
      if (Object.hasOwn(oldObj, key) && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        changedValues[key] = newValue;
      }
    }
  }

  return changedValues;
}

export function loadScript(src) {
  if (window.Razorpay) return true;
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const getDeliveryDate = () => {
  var today = new Date();

  var deliveryDate = today;
  var total_days = 9;
  for (var days = 1; days <= total_days; days++) {
    deliveryDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    if (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
      total_days++;
    }
  }
  return deliveryDate.toDateString() + " " + deliveryDate.toLocaleTimeString();
};

export function removieEmptyValues(values) {
  Object.keys(values).forEach((key) => {
    if (values[key] === "" || values[key] === null) {
      delete values[key];
    }
  });
}
