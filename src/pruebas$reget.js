// Al introducirle la funcion /P/m a la instruccion $regex me tiene que encontrar las filas que empizan por P en el apartado de descripcion. En este caso buscamos las ciudades con PLAZAS y PATIOS

db.ciudades.find( { description: { $regex: /P/m } } )

//{ "_id" : 100, "Nombre" : "Sevilla", "Millones de habitantes" : 1.9, "descripcion" : "catedral de sevilla \n Plaza España\n Rio guadalquivir." }
//{ "_id" : 105, "Nombre" : "Jaen", "Millones de habitantes" : 0.6, "descripcion" : "Rio guadalquivir\n Patios andaluces" }
//{ "_id" : 107, "Nombre" : "Huelva", "Millones de habitantes" : 0.5, "descripcion" : "Plaza de las monjas\n catedral de la merced" }*/


// Quiero las ciudades con mas habitantes que 0.5M y que empiecen por C

db.ciudades.find( { $and: [ { "Millones de habitantes": { $gt: 0.5 } }, { Nombre: { $regex: /C/ } } ] } )
//{ "_id" : 101, "Nombre" : "Cadiz", "Millones de habitantes" : 1.2, "descripcion" : " Teatro Falla \n catedral de Cadiz" }
//{ "_id" : 103, "Nombre" : "Cordoba", "Millones de habitantes" : 0.8, "descripcion" : "Mezquita de cordoba\n Rio guadalquivir" }

// $in encuentra los valores que coinciden con los introducidos en el []. 

db.ciudades.find( { "Millones de habitantes": { $in: [ 0.1, 0.8 ] } } )
 //{ "_id" : 103, "Nombre" : "Cordoba", "Millones de habitantes" : 0.8, "descripcion" : "Mezquita de cordoba\n Rio guadalquivir" }


//te muestra los valores igual a un numero de un campo correspondiente

db.ciudades.find( { "_id": { $eq: 101 } } )
//{ "_id" : 101, "Nombre" : "Cadiz", "Millones de habitantes" : 1.2, "descripcion" : " Teatro Falla \n catedral de Cadiz" }


// me muestra tanto las ciudades con el id menor que 104, como las que superan el millon de habitantes

db.ciudades.find( { $or: [ { "_id": { $lt: 104 } }, { "Millones de habitantes":{ $gt: 1 }} ] } )
//{ "_id" : 100, "Nombre" : "Sevilla", "Millones de habitantes" : 1.9, "descripcion" : "catedral de sevilla \n Plaza España\n Rio guadalquivir." }
//{ "_id" : 101, "Nombre" : "Cadiz", "Millones de habitantes" : 1.2, "descripcion" : " Teatro Falla \n catedral de Cadiz" }
//{ "_id" : 102, "Nombre" : "Granada", "Millones de habitantes" : 0.9, "descripcion" : "Alhambra \n plaza nueva" }
//{ "_id" : 103, "Nombre" : "Cordoba", "Millones de habitantes" : 0.8, "descripcion" : "Mezquita de cordoba\n Rio guadalquivir" }
//{ "_id" : 106, "Nombre" : "Malaga", "Millones de habitantes" : 1.6, "descripcion" : "Catedral de malaga\n alcazaba" }



//Las ciudades que no son sevilla, y tienen alguna plaza en su descripcion. la i es para no discriminar entre mayusculas y minusculas

db.ciudades.find( { $and: [{ "Nombre": { $ne: "Sevilla" } }, { descripcion: { $regex: /plaza/i } }]} )

//{ "_id" : 102, "Nombre" : "Granada", "Millones de habitantes" : 0.9, "descripcion" : "Alhambra \n plaza nueva" }
//{ "_id" : 107, "Nombre" : "Huelva", "Millones de habitantes" : 0.5, "descripcion" : "Plaza de las monjas\n catedral de la merced" }


// hace lo opuesto a $in, selecciona todos los documentos excepto los que tienen el valor intruducido en los corchetes [], en este caso queremso todos los valores menos el primero y el ultimo por medio del ID

db.ciudades.find( { "_id": { $nin: [100, 107 ] } } )

//{ "_id" : 101, "Nombre" : "Cadiz", "Millones de habitantes" : 1.2, "descripcion" : " Teatro Falla \n catedral de Cadiz" }
//{ "_id" : 102, "Nombre" : "Granada", "Millones de habitantes" : 0.9, "descripcion" : "Alhambra \n plaza nueva" }
//{ "_id" : 103, "Nombre" : "Cordoba", "Millones de habitantes" : 0.8, "descripcion" : "Mezquita de cordoba\n Rio guadalquivir" }
//{ "_id" : 104, "Nombre" : "Almeria", "Millones de habitantes" : 0.7, "descripcion" : "alcazaba \nCatedral de almeria" }
//{ "_id" : 105, "Nombre" : "Jaen", "Millones de habitantes" : 0.6, "descripcion" : "Rio guadalquivir\n Patios andaluces" }
//{ "_id" : 106, "Nombre" : "Malaga", "Millones de habitantes" : 1.6, "descripcion" : "Catedral de malaga\n alcazaba" }


// busco las ciudades que no sean Huelva y que no pase el rio guadalquivir
db.ciudades.find( { $nor: [ { Nombre: "Huelva" }, { descripcion: { $regex: /Rio/ }} ]})

//{ "_id" : 101, "Nombre" : "Cadiz", "Millones de habitantes" : 1.2, "descripcion" : " Teatro Falla \n catedral de Cadiz" }
//{ "_id" : 102, "Nombre" : "Granada", "Millones de habitantes" : 0.9, "descripcion" : "Alhambra \n plaza nueva" }
//{ "_id" : 104, "Nombre" : "Almeria", "Millones de habitantes" : 0.7, "descripcion" : "alcazaba \nCatedral de almeria" }
//{ "_id" : 106, "Nombre" : "Malaga", "Millones de habitantes" : 1.6, "descripcion" : "Catedral de malaga\n alcazaba" }

// busco las ciudades que NO sean mayores a 0.9 Millones de habitantes

db.ciudades.find( { "Millones de habitantes": { $not: { $gt: 0.9 } } } )

//{ "_id" : 102, "Nombre" : "Granada", "Millones de habitantes" : 0.9, "descripcion" : "Alhambra \n plaza nueva" }
//{ "_id" : 103, "Nombre" : "Cordoba", "Millones de habitantes" : 0.8, "descripcion" : "Mezquita de cordoba\n Rio guadalquivir" }
//{ "_id" : 104, "Nombre" : "Almeria", "Millones de habitantes" : 0.7, "descripcion" : "alcazaba \nCatedral de almeria" }
//{ "_id" : 105, "Nombre" : "Jaen", "Millones de habitantes" : 0.6, "descripcion" : "Rio guadalquivir\n Patios andaluces" }
//{ "_id" : 107, "Nombre" : "Huelva", "Millones de habitantes" : 0.5, "descripcion" : "Plaza de las monjas\n catedral de la merced" }