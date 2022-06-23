const {Product} = require("../db")

async function paginatedHome(pageAsNumber, sizeAsNumber){
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
  
    const productWithCount = await Product.findAndCountAll({
      limit: size,
      offset: page * size
    });

    return {
        content: productWithCount.rows,
        totalPages: Math.ceil(productWithCount.count / Number.parseInt(size)),
        results: productWithCount.count
      }
}

module.exports={
    paginatedHome
}