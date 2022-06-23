const axios = require("axios");

const products = [
  {
    name: "intel",
    image: "https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/256/Intel.png",
  },
  {
    name: "amd",
    image: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-512.png",
  },
  {
    name: "asus",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/asus.png",
  },
  {
    name: "hp",
    image: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/hp-256.png",
  },
  {
    name: "sony",
    image: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/sony-256.png",
  },
  {
    name: "lg",
    image: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/lg-256.png",
  },
  {
    name: "samsung",
    image: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/samsung-128.png",
  },
  {
    name: "ibm",
    image: "https://logodownload.org/wp-content/uploads/2014/04/ibm-logo-0.png",
  },
  {
    name: "tp-link",
    image: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0020/8671/brand.gif?itok=-9kJp_iV",
  },
  {
    name: "tenda",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/tenda.png",
  },
  {
    name: "glc",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/glc.png",
  },
  {
    name: "kingston",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/kingston.jpg",
  },
  {
    name: "western digital",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/wd.jpg",
  },
  {
    name: "dahua",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/dahua.png",
  },
  {
    name: "tvr",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/trv.png",
  },
  {
    name: "nvidia",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/nvidia.png",
  },
  {
    name: "radeon",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/radeon.png",
  },
  {
    name: "gigabyte",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/gigabyte.png",
  },
  {
    name: "lenovo",
    image: "https://www.tecnologia-informatica.com/wp-content/uploads/2019/02/marcas-de-computadoras-3.jpeg",
  },
  {
    name: "dell",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/300px-Dell_Logo.svg.png",
  },
  {
    name: "nox",
    image: "http://www.padelspain.net/userfiles/Entrevista_Angel_Ballve_NOX_La_voz_del_padel_fuera_buena.jpg",
  },
  
];

const createProduct = async (title, price, description, image) => {
  await axios
    .post("http://localhost:3001/api/product/", {
      name: title,
      price: price,
      discount: 30,
      stock: 15,
      description: description,
      image: image,
      manufacturer: "yo",
      category: "compus",
    })
    .then((response) => console.log(response.data))
    .catch((e) => console.log(e.response.data));
};

createCategory = async () => {
  await axios
    .post(`http://localhost:3001/api/categories/`, { name: "compus" })
    .then((response) => console.log(response.data))
    .catch((e) => console.log(e.response.data));
};

createManufacturer = async () => {
  products.map(async (e)=>{
    await axios.post(`http://localhost:3001/api/manufacturer/`, e )
  })
};

crearDB = async () => {
  await createManufacturer();
  await createCategory();
  for (let i = 0; i < products.length; i++) {
    let price = i;
    let title
    if (products[i].name) {title = products[i].name} else {title = products[i].title}
    
    let image = products[i].image;
    let descrpition = products[i].description;
    await createProduct(title, price, descrpition, image);
  }
};

createManufacturer();


