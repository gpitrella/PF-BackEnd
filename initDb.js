const { Categories, Manufacturer, User, Product } = require("./src/db");
const bcrypt = require('bcrypt');

async function initDb(){
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
    category:"NOTEBOOKS",
    manufacturer:"LENOVO"
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
    category:"NOTEBOOKS",
    manufacturer:"ASUS"
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
    category:"NOTEBOOKS",
    manufacturer:"HP"
  },
  {
    id: 4,
    name: "NOTEBOOK INSPIRON 3000-3511 INTEL CORE I5-1035G1 | RAM 8GB | SSD 256GB | PANTALLA 15.6 FHD | WINDOWS 11 PRO | TECLADO US",
    price: 185000,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    image:
      "https://www.mastecnologia.com.ar/images/productos/90092.png?1654037680",
    discount: 15,
    stock: 5,
    category:"NOTEBOOKS",
    manufacturer:"DELL"
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
    category:"MONITORS",
    manufacturer:"LG"
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
    category:"DISK DRIVES",
    manufacturer:"GIGABYTE"
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
    category:"GAMERS",
    manufacturer:"SONY"
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
    category:"DISK DRIVES",
    manufacturer:"KINGSTON"
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
    category:"DISK DRIVES",
    manufacturer:"WESTERN DIGITAL"
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
    category:"PC COMPONENTS",
    manufacturer:"TPLINK"
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
    category:"MOUSE",
    manufacturer:"LOGITECH"
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
    category:"KEYBOARDS",
    manufacturer:"NETMAK"
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
    category:"PRINTERS",
    manufacturer:"HP"
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
    category:"CPU PROCESSORS",
    manufacturer:"DELL"
  },
  {
    id: 10,
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    category:"DISK DRIVES",
    manufacturer:"SANDISK"
  },
  {
    id: 11,
    name:
      "SSD Silicon Power 256GB 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    category:"DISK DRIVES",
    manufacturer:"SANDISK"
  },
  {
    id: 12,
    name:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    category:"DISK DRIVES",
    manufacturer:"western digital"
  },
  {
    id: 13,
    name: "MONITOR Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    category:"MONITORS",
    manufacturer:"ACER"
  },
  {
    id: 14,
    name:
      "MONITOR Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 9999,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    category:"MONITORS",
    manufacturer:"SAMSUNG"
  },
  {
    id: 14,
    name:
      "DELL INSPIRON I5406-3661SLV PUS | INTEL I3-1115G4 | RAM 8GB | SSD 256GB | PANTALLA 14 TOUCHSCREEN | WIN 10 H | TECLADO US",
    price: 199999,
    description:
      "DELL INSPIRON I5406-3661SLV PUS | INTEL I3-1115G4 | RAM 8GB | SSD 256GB | PANTALLA 14 TOUCHSCREEN | WIN 10 H | TECLADO US",
    
    image: "https://www.mastecnologia.com.ar/images/productos/90834.png?1655120231",
    category:"NOTEBOOKS",
    manufacturer:"DELL"
  },
  {
    id: 14,
    name:
      "INTEL CORE I5 10400 (10MA GEN SOCKET 1200) (5)",
    price: 59999,
    description:
      "INTEL CORE I5 10400 (10MA GEN SOCKET 1200) (5)",
    
    image: "https://www.mastecnologia.com.ar/images/productos/10708.png?1653274860",
    category:"CPU PROCESSORS",
    manufacturer:"INTEL"
  },
  {
    id: 14,
    name:
      "MINI PC INTEL NUC7CJYH BOXNUC7CJYHN1 PROCESADOR CELERON J4005",
    price: 99123,
    description:
      "IMINI PC INTEL NUC7CJYH BOXNUC7CJYHN1 PROCESADOR CELERON J4005",
    
    image: "https://www.mastecnologia.com.ar/images/productos/93510.png?1653275766",
    category:"CPU PROCESSORS",
    manufacturer:"INTEL"
  },
  {
    id: 14,
    name:
      "ROUTER MESH TP-LINK DECO E4 (PACK X2)",
    price: 19123,
    description:
      "ROUTER MESH TP-LINK DECO E4 (PACK X2)",
    
    image: "https://www.mastecnologia.com.ar/images/productos/14312.png?1653275100",
    category:"MODEM/ROUTER",
    manufacturer:"TPLINK"
  },
  {
    id: 14,
    name:
      "PEN DRIVE 32GB SANDISK BLADE",
    price: 1223,
    description:
      "PEN DRIVE 32GB SANDISK BLADE",
    
    image: "https://www.mastecnologia.com.ar/images/productos/93510.png?1653275766",
    category:"PC COMPONENTS",
    manufacturer:"SANDISK"
  },
  {
    id: 14,
    name:
      "AMD RYZEN 5 5600G (AM4)",
    price: 35223,
    description:
      "AMD RYZEN 5 5600G (AM4)",
    
    image: "https://www.mastecnologia.com.ar/images/productos/10532.png?1653274855",
    category:"CPU PROCESSORS",
    manufacturer:"AMD"
  },
  {
    id: 14,
    name:
      "AMD RYZEN 9 5900X (AM4) SIN COOLER/SIN VIDEO 5 GEN",
    price: 45223,
    description:
      "AMD RYZEN 9 5900X (AM4) SIN COOLER/SIN VIDEO 5 GEN",
    
    image: "https://www.mastecnologia.com.ar/images/productos/10531.png?1653274855",
    category:"CPU PROCESSORS",
    manufacturer:"AMD"
  },
  {
    id: 14,
    name:
      "GEFORCE NVIDIA PNY RTX 3070TI 8GB DDR6 XLR8 EPIC-X-RGB VCG3070T8TFXPPB GFORCE",
    price: 453223,
    description:
      "AGEFORCE NVIDIA PNY RTX 3070TI 8GB DDR6 XLR8 EPIC-X-RGB VCG3070T8TFXPPB GFORCE",
    
    image: "https://www.mastecnologia.com.ar/images/productos/12702.png?1654089450",
    category:"GRAPHICS CARDS",
    manufacturer:"XFX"
  },
  {
    name:
      "AURICULAR NETMAK NM-COUNTER GAMER | 1 PLUG | PS4/XBOX/PC ROJO",
    price: 3223,
    description:
      "AURICULAR NETMAK NM-COUNTER GAMER | 1 PLUG | PS4/XBOX/PC ROJO",
    
    image: "https://www.mastecnologia.com.ar/images/productos/18804.png?1653275348",
    category:"HEADPHONES",
    manufacturer:"NETMAK"
  },
  {
    name:
      "MSI H510M-A PRO (1200) MOTHER95",
    price: 3223,
    description:
      "MSI H510M-A PRO (1200) MOTHER95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/11718.png?1654036644",
    category:"PC COMPONENTS",
    manufacturer:"MSI"
  },
  {
    name:
      "MOUSE GENIUS DX-120 USB95",
    price: 23,
    description:
      "MOUSE GENIUS DX-120 USB95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/17018.png?1652450347",
    category:"MOUSE",
    manufacturer:"GENIUS"
  },
  {
    name:
      "TECLADO+MOUSE LOGITECH MK235 INALAMBRICO WS95",
    price: 4523,
    description:
      "TECLADO+MOUSE LOGITECH MK235 INALAMBRICO WS95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/17765.png?1653275296",
    category:"KEYBOARDS",
    manufacturer:"LOGITECH"
  },
  {
    name:
      "TECLADO LOGITECH K400 PLUS TOUCHPAD WS95",
    price: 5523,
    description:
      "TECLADO LOGITECH K400 PLUS TOUCHPAD WS95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/17791.png?1652450395",
    category:"KEYBOARDS",
    manufacturer:"LOGITECH"
  },
  {
    name:
      "AURICULAR GAMER ST-CONQUER | 2 PLUG 95",
    price: 5523,
    description:
      "AURICULAR GAMER ST-CONQUER | 2 PLUG 95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/18836.png?1653275353",
    category:"HEADPHONES",
    manufacturer:"HYPERX"
  },
  {
    name:
      "GEFORCE NVIDIA PNY RTX2060 12GB DDR6 VCG206012DFPPB GFORCE 95",
    price: 67823,
    description:
      "GEFORCE NVIDIA PNY RTX2060 12GB DDR6 VCG206012DFPPB GFORCE 95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/12508.png?1653274955",
    category:"GRAPHICS CARDS",
    manufacturer:"XFX"
  },
  {
    name:
      "IMPRESORA EPSON L3210 (MF) MULTIFUNCION ECOTANK + COMBO TINTA",
    price: 55523,
    description:
      "IMPRESORA EPSON L3210 (MF) MULTIFUNCION ECOTANK + COMBO TINTA",
    
    image: "https://www.mastecnologia.com.ar/images/productos/15645.png?1652450296",
    category:"PRINTERS",
    manufacturer:"EPSON"
  },
  {
    name:
      "SILLA GAMER NOGA STORMER TYPHON RGB ANJ-1175 NEGRA95",
    price: 65523,
    description:
      "SILLA GAMER NOGA STORMER TYPHON RGB ANJ-1175 NEGRA95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/97750.png?1653748859",
    category: "GAMERS",
    manufacturer: "HYPERX"
  },
  {
    name:
      "SILLA GAMER NETMAK NM-PHONTUM AZUL",
    price: 65523,
    description:
      "SILLA GAMER NETMAK NM-PHONTUM AZUL",
    
    image: "https://www.mastecnologia.com.ar/images/productos/97756.png?1653275811",
    category: "GAMERS",
    manufacturer: "NETMAK"
  },
  {
    name:
      "KIT ALARMA MARSHALL GO PLUS PANEL MARSHALL GO+ 1 SENSOR INALAMBRICO + 1 SENSOR MAGNETICO",
    price: 6523,
    description:
      "KIT ALARMA MARSHALL GO PLUS PANEL MARSHALL GO+ 1 SENSOR INALAMBRICO + 1 SENSOR MAGNETICO + CONTROL + BATERIA + SIRENA + ROTULA95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/97756.png?1653275811",
    category: "MODEM ROUTER",
    manufacturer: "MARSHALL"
  },
  {
    name:
      "PEN DRIVE 32GB KINGSTON EXODIA 3.2 NARANJA95",
    price: 6523,
    description:
      "PEN DRIVE 32GB KINGSTON EXODIA 3.2 NARANJA95",
    
    image: "https://www.mastecnologia.com.ar/images/productos/15734.png?1655225629",
    category: "PC COMPONENTS",
    manufacturer: "KINGSTON"
  },
];

const users = [
  {
      name: "Bettina",
      email: "bettinaigamboa@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "Enzo",
      email: "enz997.ing.ind@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "Lucas",
      email: "lucassebastianbattaglia@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "Nicolas",
      email: "nicolasexeburgos@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "FedeF",
      email: "federicofaraz@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "FedeR",
      email: "romerof14@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "Gabriel",
      email: "gabrielpitrella@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "Horacio",
      email: "ahabitu@gmail.com",
      password: "123456",
      admin: true,
      isactive: true
  },
  {
      name: "Juan",
      email: "Juan@gmail.com",
      password: "123456",
      admin: false,
      isactive: true
  },
  {
      name: "Pedro",
      email: "Pedro@gmail.com",
      password: "123456",
      admin: false,
      isactive: true
  },
]

const catego = [
  {
    name: "PC COMPONENTS"
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
    name: "MODEM ROUTER"
  },
  {
    name: "PRINTERS"
  },
  {
    name: "GAMERS"
  },
]

const manu = [
  {
    name: "AMD",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/amd.png",
  },
  {
    name: "INTEL",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/intel.png",
  },
  {
    name: "TENDA",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/tenda.png",
  },
  {
    name: "GLC",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/glc.png",
  },
  {
    name: "TPLINK",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/tplink.png",
  },
  {
    name: "KINGSTON",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/kingston.jpg",
  },
  {
    name: "HP",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Logo_HP.PNG/640px-Logo_HP.PNG",
  },
  {
    name: "GIGABYTE",
    image: "https://1000marcas.net/wp-content/uploads/2020/02/Logo-Gigabyte.png",
  },
  {
    name: "HYPERX",
    image: "https://iconape.com/wp-content/png_logo_vector/hyperx.png",
  },
  {
    name: "XFX",
    image: "https://www.logolynx.com/images/logolynx/b3/b35406e70030781a1dd16734e9f1c802.jpeg",
  },
  {
    name: "DAHUA",
    image: "https://www.camaras-termograficas.org/wp-content/uploads/2021/03/camaras-termicas-dahua.jpg",
  },
  {
    name: "MARSHALL",
    image: "https://www.gmkfreelogos.com/logos/M/img/marshall_logo.gif",
  },{
    name: "APPLE",
    image: "https://thephonemarket.com.co/wp-content/uploads/2020/07/apple.jpg",
  },
  {
    name: "GENIUS",
    image: "https://www.vector-logo.net/logo_preview/eps/g/Genius(167).png",
  },
  {
    name: "asus",
    image: "https://www.mastecnologia.com.ar/assets/images/brands/asus.png",
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
    name: "ACER",
    image: "https://www.brandemia.org/wp-content/uploads/2011/04/acer1.jpg",
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
  
  {
    name: "SANDISK",
    image: "https://www.qloud.ar/SITES/IMG/celsus-store-05-2022/262_13-05-2022-02-05-22-sandisk.jpg",
  },{
    name: "NETMAK",
    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/156/703/products/logo-netmak1-b6a07641acec682d0916014783019192-640-0.png",
  },
  {
    name: "LOGITECH",
    image: "https://ih1.redbubble.net/image.2253355026.1487/st,small,507x507-pad,600x600,f8f8f8.jpg",
  },
  {
    name: "MSI",
    image: "https://guide-images.cdn.ifixit.com/igi/2T1loyBcOBV1hKNu.large",
  },
  {
    name: "EPSON",
    image: "https://i.pinimg.com/originals/33/77/64/3377649c5b68ee7ca92d217f9a6040d6.jpg",
  },
]

const createUsers = async () => {
  for (let i = 0; i < users.length; i++) {
        
    let passwordcrypt = bcrypt.hashSync(users[i].password, Number.parseInt(10));
        // Crear un usuario
        await User.create({
            name: users[i].name,
            email: users[i].email,
            password: passwordcrypt,
            admin: users[i].admin,
            isactive: users[i].isactive
        })
        console.log(`Usuario: ${users[i].name} - PASS:${users[i].password} CREADO...`)
  }

}

const createProducts = async (name, price, description, image, category, manufacturer) => {
  let newProduct = await Product.create({
        name: name,
        price: price,
        discount: 10,
        stock: 150,
        description: description,
        image: image
  })
  if (category) {category = category.toUpperCase();
    let categoryDb = await Categories.findAll({ where: { name: category } });
    await newProduct.addCategories(categoryDb);}
      
    if (manufacturer) {manufacturer = manufacturer.toUpperCase();
    let manufacturerDb = await Manufacturer.findAll({where: { name: manufacturer },});
    await newProduct.addManufacturer(manufacturerDb);}
   
};

createCategories = async () => {
  for(let i = 0; i < catego.length; i++){
    await Categories.create({
                    name: catego[i].name
                    })
  }
};

createManufacturers = async () => {
  for(let i = 0; i < manu.length; i++){
    await Manufacturer.create({
                      name: manu[i].name,
                      image: manu[i].image
                    })
  }
};


  await createUsers();
  console.log('USUARIOS CREADOS');
  await createManufacturers();
  console.log("termine manu")
  await createCategories();
  console.log("termine cate")
  for (let i = 0; i < products.length; i++) {
    let price = products[i].price;
    let name = products[i].name
    let image = products[i].image;
    let descrpition = products[i].description;
    let manufacturer = products[i].manufacturer;
    let category = products[i].category;
    await createProducts(name, price, descrpition, image, category, manufacturer);
  }
    console.log("termine products")
}
module.exports={
  initDb
}