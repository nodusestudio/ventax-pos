// Mapeo de nombre de categoría a id
const CAT_MAP = {
  "BURGER CLÁSICAS": "c1",
  "BURGER PREMIUM": "c2",
  "PEPITOS VENEZOLANOS": "c3",
  "PERROS CALIENTES": "c4",
  "SALCHIPAPAS": "c5",
  "ENTRADAS PA' PICAR": "c6",
  "COMBOS": "c7",
  "BEBIDAS Y ADICIONALES": "c8",
  "COMBOS BURGER CLÁSICA": "c9",
  "COMBOS PERROS": "c10",
  "COMBOS EXPRESS": "c11",
  "COMBOS FAMILIARES": "c12",
  "COMBOS TEMPORADA": "c13",
};

export const INIT_PRODS = [
  // BURGER CLÁSICAS
  {id: 1, name: "Burger Clásica Normal (1 Carne) Pequeña", price: 14000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Incluye carne de res, queso, tocineta, ripio, vegetales y salsas."},
  {id: 2, name: "Burger Clásica Normal (1 Carne) Mediana", price: 17000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Incluye carne de res, queso, tocineta, ripio, vegetales y salsas."},
  {id: 3, name: "Burger Clásica Normal (1 Carne) Grande", price: 22000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Incluye carne de res, queso, tocineta, ripio, vegetales y salsas."},
  {id: 4, name: "Burger Clásica Normal (2 Carnes) Pequeña", price: 18000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Doble carne de res, queso, tocineta, ripio, vegetales y salsas."},
  {id: 5, name: "Burger Clásica Normal (2 Carnes) Mediana", price: 22000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Doble carne de res, queso, tocineta, ripio, vegetales y salsas."},
  {id: 6, name: "Burger Clásica Normal (2 Carnes) Grande", price: 30000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Doble carne de res, queso, tocineta, ripio, vegetales y salsas."},
  {id: 7, name: "Burger Clásica Súper Mediana", price: 19000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Incluye carne de res, queso, tocineta, ripio, huevos de codorniz, vegetales y salsas."},
  {id: 8, name: "Burger Clásica Súper Grande", price: 25000, catId: CAT_MAP["BURGER CLÁSICAS"], description: "Incluye carne de res, queso, tocineta, ripio, huevos de codorniz, vegetales y salsas."},

  // BURGER PREMIUM
  {id: 9, name: "Cordillera", price: 34000, catId: CAT_MAP["BURGER PREMIUM"], description: "Carne jugosa, queso fundido, maduritos fritos, pepinillos dulces, lechuga fresca, exquisite topping de chuleta ahumada y salsas artesanales."},
  {id: 10, name: "Ranchera", price: 30000, catId: CAT_MAP["BURGER PREMIUM"], description: "Carne jugosa, salchicha dorada, coronada con maíz dulce, plátano maduro, ripio de papa, vegetales y salsas de la casa."},
  {id: 11, name: "Plus", price: 30000, catId: CAT_MAP["BURGER PREMIUM"], description: "Carne jugosa, queso, topping de chorizo artesanal, ripio de papa, plátano maduro, huevos de codorniz, vegetales y salsas de la casa."},
  {id: 12, name: "Triplete", price: 29000, catId: CAT_MAP["BURGER PREMIUM"], description: "Combinación de carne, pollo y chorizo bien dorados, con queso fundido, tocineta crocante, ripio crujiente, vegetales frescos y salsas irresistibles."},
  {id: 13, name: "Caracas", price: 26000, catId: CAT_MAP["BURGER PREMIUM"], description: "Carne artesanal, chorizo jugoso y queso fundido, acompañados de tocineta crocante, huevo a la plancha, aguacate, vegetales y salsas tradicionales."},
  {id: 14, name: "Papuda", price: 20000, catId: CAT_MAP["BURGER PREMIUM"], description: "Carne jugosa con queso fundido y tocineta crocante, cargada de papas a la francesa, plátano maduro dorado, con vegetales frescos y salsas de la casa."},

  // PEPITOS VENEZOLANOS
  {id: 15, name: "Pepito Plus", price: 36000, catId: CAT_MAP["PEPITOS VENEZOLANOS"], description: "Pepito ultra cargado con cuatro carnes jugosas, tocineta crocante, queso fundido, ripio crujiente, vegetales frescos y salsas de la casa."},
  {id: 16, name: "Pepito Ranchero", price: 34000, catId: CAT_MAP["PEPITOS VENEZOLANOS"], description: "Explosión de carnes con salchicha, queso fundido, ripio crujiente y maíz dulce, acompañado de vegetales frescos y salsas venezolanas."},
  {id: 17, name: "Pepito Urbano", price: 30000, catId: CAT_MAP["PEPITOS VENEZOLANOS"], description: "Pepito cargado con una poderosa combinación de carnes, queso fundido, ripio crujiente, aguacate fresco, vegetales y salsas."},
  {id: 18, name: "Pepito Mix", price: 29000, catId: CAT_MAP["PEPITOS VENEZOLANOS"], description: "Mezcla de carnes jugosas con queso fundido, papas a la francesa, huevo, vegetales frescos y salsas de la casa."},

  // PERROS CALIENTES
  {id: 19, name: "Perro Súper", price: 16000, catId: CAT_MAP["PERROS CALIENTES"], description: "Salchicha americana con queso fundido, huevos de codorniz, ripio crujiente, vegetales frescos y salsas clásicas."},
  {id: 20, name: "Perro Especial", price: 15000, catId: CAT_MAP["PERROS CALIENTES"], description: "Salchicha americana, queso fundido, ripio crujiente, papas a la francesa, vegetales frescos y salsas clásicas."},
  {id: 21, name: "Perro Normal", price: 12000, catId: CAT_MAP["PERROS CALIENTES"], description: "Salchicha americana, queso fundido, ripio crujiente, vegetales frescos y salsas clásicas."},

  // SALCHIPAPAS
  {id: 22, name: "Salchi Súper Pequeña", price: 19000, catId: CAT_MAP["SALCHIPAPAS"], description: "Papas a la francesa cargadas con salchicha, chorizo jugoso, queso fundido, huevos de codorniz, plátano maduro, maíz y salsas venezolanas."},
  {id: 23, name: "Salchi Súper Grande", price: 34000, catId: CAT_MAP["SALCHIPAPAS"], description: "Papas a la francesa cargadas con salchicha, chorizo jugoso, queso fundido, huevos de codorniz, plátano maduro, maíz y salsas venezolanas."},
  {id: 24, name: "Salchi Normal Pequeña", price: 14000, catId: CAT_MAP["SALCHIPAPAS"], description: "Papas a la francesa, salchicha, queso fundido y salsas de la casa aparte."},
  {id: 25, name: "Salchi Normal Grande", price: 21000, catId: CAT_MAP["SALCHIPAPAS"], description: "Papas a la francesa, salchicha, queso fundido y salsas de la casa aparte."},

  // ENTRADAS PA' PICAR
  {id: 26, name: "Tequeños", price: 11000, catId: CAT_MAP["ENTRADAS PA' PICAR"], description: "5 tequeños rellenos de queso."},
  {id: 27, name: "Empanadas", price: 9000, catId: CAT_MAP["ENTRADAS PA' PICAR"], description: "5 empanaditas sabores varios."},
  {id: 28, name: "Papas Fritas Pequeñas", price: 7000, catId: CAT_MAP["ENTRADAS PA' PICAR"], description: "Papas fritas."},
  {id: 29, name: "Papas Fritas Medianas", price: 11000, catId: CAT_MAP["ENTRADAS PA' PICAR"], description: "Papas fritas."},
  {id: 30, name: "Papas Fritas Grandes", price: 16000, catId: CAT_MAP["ENTRADAS PA' PICAR"], description: "Papas fritas."},

  // COMBOS (resumen)
  {id: 31, name: "Combo Burger Clásica 1", price: 21000, catId: CAT_MAP["COMBOS BURGER CLÁSICA"], description: "1 Burger Clásica, papas y bebida."},
  {id: 32, name: "Combo Burger Clásica 2", price: 39000, catId: CAT_MAP["COMBOS BURGER CLÁSICA"], description: "2 Burgers Clásicas, papas y bebida."},
  {id: 33, name: "Combo Burger Clásica 3", price: 57000, catId: CAT_MAP["COMBOS BURGER CLÁSICA"], description: "3 Burgers Clásicas, papas y bebida."},
  {id: 34, name: "Combo Burger Clásica 4", price: 73000, catId: CAT_MAP["COMBOS BURGER CLÁSICA"], description: "4 Burgers Clásicas, papas y bebida."},
  {id: 35, name: "Combo Perros 1", price: 17000, catId: CAT_MAP["COMBOS PERROS"], description: "1 Perro, papas y bebida."},
  {id: 36, name: "Combo Perros 2", price: 33000, catId: CAT_MAP["COMBOS PERROS"], description: "2 Perros, papas y bebida."},
  {id: 37, name: "Combo Perros 3", price: 43000, catId: CAT_MAP["COMBOS PERROS"], description: "3 Perros, papas y bebida."},
  {id: 38, name: "Combo Perros 4", price: 49000, catId: CAT_MAP["COMBOS PERROS"], description: "4 Perros, papas y bebida."},
  {id: 39, name: "Combo Express Burger", price: 16000, catId: CAT_MAP["COMBOS EXPRESS"], description: "Burger, papas y bebida."},
  {id: 40, name: "Combo Express Salchi", price: 15000, catId: CAT_MAP["COMBOS EXPRESS"], description: "Salchi, papas y bebida."},
  {id: 41, name: "Combo Express Perro", price: 14000, catId: CAT_MAP["COMBOS EXPRESS"], description: "Perro, papas y bebida."},
  {id: 42, name: "Combo Familiar #4", price: 44000, catId: CAT_MAP["COMBOS FAMILIARES"], description: "Combo familiar para 4 personas."},
  {id: 43, name: "Combo Familiar #3", price: 48000, catId: CAT_MAP["COMBOS FAMILIARES"], description: "Combo familiar para 3 personas."},
  {id: 44, name: "Combo de la Casa", price: 49000, catId: CAT_MAP["COMBOS TEMPORADA"], description: "Combo especial de la casa."},
  {id: 45, name: "Combo Emparejado", price: 45000, catId: CAT_MAP["COMBOS TEMPORADA"], description: "Combo emparejado."},

  // BEBIDAS Y ADICIONALES
  {id: 46, name: "Agua", price: 2500, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Agua embotellada."},
  {id: 47, name: "Coca Cola 1.5L", price: 9000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Coca Cola 1.5L."},
  {id: 48, name: "Postobón", price: 4000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Bebida Postobón."},
  {id: 49, name: "Hit", price: 4000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Bebida Hit."},
  {id: 50, name: "Malta Polar", price: 5000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Malta Polar."},
  {id: 51, name: "Carne adicional", price: 6000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Adición de carne."},
  {id: 52, name: "Filete de pollo", price: 7000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Adición de filete de pollo."},
  {id: 53, name: "Chorizo", price: 5000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Adición de chorizo."},
  {id: 54, name: "Tocineta", price: 4000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Adición de tocineta."},
  {id: 55, name: "Huevo", price: 2000, catId: CAT_MAP["BEBIDAS Y ADICIONALES"], description: "Adición de huevo."},
];
