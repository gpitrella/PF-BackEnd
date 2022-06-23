const {Product} = require("../db")
const {filterCategories} = require ("./filters.js")

async function paginatedHome(pageAsNumber, sizeAsNumber, name, category, manufacturer, min, max, order){
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber -1;
    }
  
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
  
    return filterCategories(page, size, name, category, manufacturer, min, max, order)
}

module.exports={
    paginatedHome
}