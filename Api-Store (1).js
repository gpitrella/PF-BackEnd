const axios = require("axios");
const { Categories, Manufacturer } = require("./src/db");

const products = [
  {
    id: 1,
    name: "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
    price: 109950,
    description:
      "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
    image: "https://www.mastecnologia.com.ar/images/productos/90411.png",
    discount: 10,
    stock: 35,
  },
  {
    id: 2,
    name: "ASUS VIVOBOOK F512D | AMD RYZEN 3 3250U | RAM 4GB | SSD 128GB | PANTALLA 15.6 FHD | WINDOWS 10 HOME | TECLADO US",
    price: 220000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "https://www.mastecnologia.com.ar/images/productos/89981.png",
    discount: 10,
    stock: 35,
  },
  {
    id: 3,
    name: "HP 250 G8 INTEL CORE I7-1165G7 | RAM 8GB | SSD M2 512 | PANTALLA 15.6 | FREE SO",
    price: 162000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "https://www.mastecnologia.com.ar/images/productos/90833.png",
    discount: 15,
    stock: 34,
  },
  {
    id: 4,
    name: "DELL INSPIRON 3000-3511 INTEL CORE I5-1035G1 | RAM 8GB | SSD 256GB | PANTALLA 15.6 FHD | WINDOWS 11 PRO | TECLADO US",
    price: 185000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
  },
  {
    id: 5,
    name: "MONITOR 19 LG LED 19M38A VGA",
    price: 25000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
  },
  {
    id: 6,
    name: "DISCO RIGIDO SSD 240GB GIGABYTE GP-GSTFS31240GNTD (10)",
    price: 5000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12002.png?1652450047",
    discount: 15,
    stock: 5,
  },
  {
    id: 7,
    name: "GAMEPAD SONY PS4 COPIA | JOYSTICK CAMUFLADO | PLACA ORIGINAL",
    price: 7600,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17172.png?1655230687",
    discount: 15,
    stock: 5,
  },
  {
    id: 8,
    name: "DISCO RIGIDO SSD 250GB KINGSTON M2 NV1 240GB",
    price: 6600,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12087.png?1653274937",
    discount: 15,
    stock: 5,
  },
  {
    id: 9,
    name: "DISCO RIGIDO 1TB SATA WD BLUE (20)",
    price: 6200,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12216.png?1653274941",
    discount: 10,
    stock: 10,
  },
  {
    id: 10,
    name: "PLACA WIFI USB TP-LINK WN823N | 2.4GHZ 300MBPS | WPS",
    price: 1450,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/14128.png?1653275076",
    discount: 10,
    stock: 10,
  },
  {
    id: 11,
    name: "MOUSE LOGITECH M110 USB GRIS",
    price: 1350,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17071.png?1653275254",
    discount: 10,
    stock: 10,
  },
  {
    id: 12,
    name: "TECLADO NETMAK GAMER ZAKRO RETROILUMINADO NEGRO",
    price: 890,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17550.png?1653275278",
    discount: 10,
    stock: 10,
  },
  {
    id: 13,
    name: "IMPRESORA HP M404DW PRO LASER BLANCO Y NEGRO",
    price: 63548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/15565.png?1653275194",
    discount: 10,
    stock: 10,
  },
  {
    id: 14,
    name: "SERVER DELL T40 XEON E3-2224 - 8GB RAM - DISCO RIGIDO 1TB - DVD",
    price: 163548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/94562.png?1653275772",
    discount: 10,
    stock: 10,
  },
  {
    id: 15,
    name: "PARLANTE GENIUS SP-HF800A 20W",
    price: 9548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/18775.png?1652450433",
    discount: 10,
    stock: 10,
  },
  {
    id: 19,
    name: "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
    price: 109950,
    description:
      "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
    image: "https://www.mastecnologia.com.ar/images/productos/90411.png",
    discount: 10,
    stock: 35,
  },
  {
    id: 20,
    name: "ASUS VIVOBOOK F512D | AMD RYZEN 3 3250U | RAM 4GB | SSD 128GB | PANTALLA 15.6 FHD | WINDOWS 10 HOME | TECLADO US",
    price: 220000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "https://www.mastecnologia.com.ar/images/productos/89981.png",
    discount: 10,
    stock: 35,
  },
  {
    id: 30,
    name: "HP 250 G8 INTEL CORE I7-1165G7 | RAM 8GB | SSD M2 512 | PANTALLA 15.6 | FREE SO",
    price: 162000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "https://www.mastecnologia.com.ar/images/productos/90833.png",
    discount: 15,
    stock: 34,
  },
  {
    id: 40,
    name: "DELL INSPIRON 3000-3511 INTEL CORE I5-1035G1 | RAM 8GB | SSD 256GB | PANTALLA 15.6 FHD | WINDOWS 11 PRO | TECLADO US",
    price: 185000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
  },
  {
    id: 50,
    name: "MONITOR 19 LG LED 19M38A VGA",
    price: 25000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
  },
  {
    id: 60,
    name: "DISCO RIGIDO SSD 240GB GIGABYTE GP-GSTFS31240GNTD (10)",
    price: 5000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12002.png?1652450047",
    discount: 15,
    stock: 5,
  },
  {
    id: 70,
    name: "GAMEPAD SONY PS4 COPIA | JOYSTICK CAMUFLADO | PLACA ORIGINAL",
    price: 7600,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17172.png?1655230687",
    discount: 15,
    stock: 5,
  },
  {
    id: 80,
    name: "DISCO RIGIDO SSD 250GB KINGSTON M2 NV1 240GB",
    price: 6600,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12087.png?1653274937",
    discount: 15,
    stock: 5,
  },
  {
    id: 90,
    name: "DISCO RIGIDO 1TB SATA WD BLUE (20)",
    price: 6200,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12216.png?1653274941",
    discount: 10,
    stock: 10,
  },
  {
    id: 100,
    name: "PLACA WIFI USB TP-LINK WN823N | 2.4GHZ 300MBPS | WPS",
    price: 1450,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/14128.png?1653275076",
    discount: 10,
    stock: 10,
  },
  {
    id: 110,
    name: "MOUSE LOGITECH M110 USB GRIS",
    price: 1350,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17071.png?1653275254",
    discount: 10,
    stock: 10,
  },
  {
    id: 120,
    name: "TECLADO NETMAK GAMER ZAKRO RETROILUMINADO NEGRO",
    price: 890,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17550.png?1653275278",
    discount: 10,
    stock: 10,
  },
  {
    id: 130,
    name: "IMPRESORA HP M404DW PRO LASER BLANCO Y NEGRO",
    price: 63548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/15565.png?1653275194",
    discount: 10,
    stock: 10,
  },
  {
    id: 140,
    name: "SERVER DELL T40 XEON E3-2224 - 8GB RAM - DISCO RIGIDO 1TB - DVD",
    price: 163548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/94562.png?1653275772",
    discount: 10,
    stock: 10,
  },
  {
    id: 150,
    name: "PARLANTE GENIUS SP-HF800A 20W",
    price: 9548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/18775.png?1652450433",
    discount: 10,
    stock: 10,
  },
  {
    id: 155,
    name: "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
    price: 109950,
    description:
      "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
    image: "https://www.mastecnologia.com.ar/images/productos/90411.png",
    discount: 10,
    stock: 35,
  },
  {
    id: 200,
    name: "ASUS VIVOBOOK F512D | AMD RYZEN 3 3250U | RAM 4GB | SSD 128GB | PANTALLA 15.6 FHD | WINDOWS 10 HOME | TECLADO US",
    price: 220000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "https://www.mastecnologia.com.ar/images/productos/89981.png",
    discount: 10,
    stock: 35,
  },
  {
    id: 300,
    name: "HP 250 G8 INTEL CORE I7-1165G7 | RAM 8GB | SSD M2 512 | PANTALLA 15.6 | FREE SO",
    price: 162000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image: "https://www.mastecnologia.com.ar/images/productos/90833.png",
    discount: 15,
    stock: 34,
  },
  {
    id: 400,
    name: "DELL INSPIRON 3000-3511 INTEL CORE I5-1035G1 | RAM 8GB | SSD 256GB | PANTALLA 15.6 FHD | WINDOWS 11 PRO | TECLADO US",
    price: 185000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
  },
  {
    id: 500,
    name: "MONITOR 19 LG LED 19M38A VGA",
    price: 25000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
  },
  {
    id: 600,
    name: "DISCO RIGIDO SSD 240GB GIGABYTE GP-GSTFS31240GNTD (10)",
    price: 5000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12002.png?1652450047",
    discount: 15,
    stock: 5,
  },
  {
    id: 700,
    name: "GAMEPAD SONY PS4 COPIA | JOYSTICK CAMUFLADO | PLACA ORIGINAL",
    price: 7600,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17172.png?1655230687",
    discount: 15,
    stock: 5,
  },
  {
    id: 800,
    name: "DISCO RIGIDO SSD 250GB KINGSTON M2 NV1 240GB",
    price: 6600,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12087.png?1653274937",
    discount: 15,
    stock: 5,
  },
  {
    id: 900,
    name: "DISCO RIGIDO 1TB SATA WD BLUE (20)",
    price: 6200,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/12216.png?1653274941",
    discount: 10,
    stock: 10,
  },
  {
    id: 1000,
    name: "PLACA WIFI USB TP-LINK WN823N | 2.4GHZ 300MBPS | WPS",
    price: 1450,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/14128.png?1653275076",
    discount: 10,
    stock: 10,
  },
  {
    id: 1100,
    name: "MOUSE LOGITECH M110 USB GRIS",
    price: 1350,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17071.png?1653275254",
    discount: 10,
    stock: 10,
  },
  {
    id: 1200,
    name: "TECLADO NETMAK GAMER ZAKRO RETROILUMINADO NEGRO",
    price: 890,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/17550.png?1653275278",
    discount: 10,
    stock: 10,
  },
  {
    id: 1300,
    name: "IMPRESORA HP M404DW PRO LASER BLANCO Y NEGRO",
    price: 63548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/15565.png?1653275194",
    discount: 10,
    stock: 10,
  },
  {
    id: 1400,
    name: "SERVER DELL T40 XEON E3-2224 - 8GB RAM - DISCO RIGIDO 1TB - DVD",
    price: 163548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/94562.png?1653275772",
    discount: 10,
    stock: 10,
  },
  {
    id: 1500,
    name: "PARLANTE GENIUS SP-HF800A 20W",
    price: 9548,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/18775.png?1652450433",
    discount: 10,
    stock: 10,
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 470,
    },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 319,
    },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 400,
    },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 250,
    },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: {
      rate: 2.2,
      count: 140,
    },
  },
];

const catego = [
  {
    name: "PREBUILT COMPUTERS"
  },
  {
    name: "HEADPHONES"
  },
  {
    name: "KEYBOARDS"
  },
  {
    name: "MOUSE"
  },
  {
    name: "NOTEBOOKS"
  },
  {
    name: "MONITORS"
  },
  {
    name: "DISK DRIVES"
  },
  {
    name: "GRAPHICS CARDS"
  },
  {
    name: "CPU PROCESSORS"
  },
  {
    name: "MODEM/ROUTER"
  },
];

const manu = [
  {
    name: "AMD",
    inage: "https://www.mastecnologia.com.ar/assets/images/brands/amd.png",
  },
  {
    name: "INTEL",
    inage: "https://www.mastecnologia.com.ar/assets/images/brands/intel.png",
  },
  {
    name: "TENDA",
    inage: "https://www.mastecnologia.com.ar/assets/images/brands/tenda.png",
  },
  {
    name: "GLC",
    inage: "https://www.mastecnologia.com.ar/assets/images/brands/glc.png",
  },
  {
    name: "TPLINK",
    inage: "https://www.mastecnologia.com.ar/assets/images/brands/tplink.png",
  },
  {
    name: "KINGSTON",
    inage: "https://www.mastecnologia.com.ar/assets/images/brands/kingston.jpg",
  },
  {
    name: "HP",
    inage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Logo_HP.PNG/640px-Logo_HP.PNG",
  },
  {
    name: "GIGABYTE",
    inage: "https://1000marcas.net/wp-content/uploads/2020/02/Logo-Gigabyte.png",
  },
  {
    name: "HYPERX",
    inage: "https://iconape.com/wp-content/png_logo_vector/hyperx.png",
  },
  {
    name: "XFX",
    inage: "https://www.logolynx.com/images/logolynx/b3/b35406e70030781a1dd16734e9f1c802.jpeg",
  },
  {
    name: "DAHUA",
    inage: "https://www.camaras-termograficas.org/wp-content/uploads/2021/03/camaras-termicas-dahua.jpg",
  },
  {
    name: "MARSHALL",
    inage: "https://www.gmkfreelogos.com/logos/M/img/marshall_logo.gif",
  },{
    name: "APPLE",
    inage: "https://thephonemarket.com.co/wp-content/uploads/2020/07/apple.jpg",
  }
]

const createProduct = async (title, price, description, image) => {
  await axios
    .post("http://localhost:3001/api/product/", {
      name: title,
      price: price,
      discount: 30,
      stock: 15,
      description: description,
      image: image
    })
    .then((response) => console.log(response.data))
    .catch((e) => console.log(e.response.data));
};

createCategory = async () => {
  await Categories.bulkCreate(catego)
    .then((response) => console.log(response.data))
  
};

createManufacturer = async () => {
  await Manufacturer.bulkCreate(manu)
    .then((response) => console.log(response.data))

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

crearDB();
