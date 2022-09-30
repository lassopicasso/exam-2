export const priceList = [
  { id: 1, label: "Below 800 NOK", min: 0, max: 799 },
  { id: 2, label: "800-1299 NOK", min: 800, max: 1299 },
  { id: 3, label: "1300-1799 NOK", min: 1300, max: 1799 },
  { id: 4, label: "1800-2299 NOK", min: 1800, max: 2229 },
  { id: 5, label: "2300-2999 NOK", min: 2300, max: 2999 },
  { id: 6, label: "No Limit", min: 0, max: Infinity },
];
export const buttonList = [
  {
    title: "Price",
    type: "price",
    btns: [
      { btn: "btn1", value: "Low" },
      { btn: "btn2", value: "High" },
    ],
  },
  {
    title: "Date",
    type: "date",
    btns: [
      { btn: "btn1", value: "New" },
      { btn: "btn2", value: "Old" },
    ],
  },
  {
    title: "Ratings",
    type: "rating",
    btns: [
      { btn: "btn1", value: "High" },
      { btn: "btn2", value: "Low" },
    ],
  },
  {
    title: "Distance",
    type: "distance",
    btns: [
      { btn: "btn1", value: "Close" },
      { btn: "btn2", value: "Far" },
    ],
  },
];
