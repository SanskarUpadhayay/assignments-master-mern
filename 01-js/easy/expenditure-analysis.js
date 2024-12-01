/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let res=[];
  let categoryMap = {};
  for(let i=0;i<transactions.length;i++){
    let obj = transactions[i];
    let category = obj.category;
    if(categoryMap[category] === undefined) {
      categoryMap[category] = obj.price;
    }
    else{
      categoryMap[category] = categoryMap[category] + obj.price; 
    }
    
  }
  for(let category in categoryMap){
    let obj = {};
    obj["category"] = category;
    obj["totalSpent"] = categoryMap[category];
    res.push(obj);
  }

  return res;
}

module.exports = calculateTotalSpentByCategory;
