const { Branch_office } = require("../db");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

function distanceCalculator(userLat ,userLong, branchLat, branchLong) {
  var degtorad = 0.01745329;
  var radtodeg = 57.29577951;
  var lat1h = userLat;
  var lat2h = branchLat;
  var long1h = userLong;
  var long2h = branchLong;
  var lat1 = parseFloat(lat1h);
  var lat2 = parseFloat(lat2h);
  var long1 = parseFloat(long1h);
  var long2 = parseFloat(long2h);
  var dlong = (long1 - long2);
  var dvalue = (Math.sin(lat1 * degtorad) * Math.sin(lat2 * degtorad))
   + (Math.cos(lat1 * degtorad) * Math.cos(lat2 * degtorad)
   * Math.cos(dlong * degtorad));
  var dd = Math.acos(dvalue) * radtodeg;
  var km = (dd * 111.302);
  var distance = (km * 100)/100;
  return distance
 }

const excludeTimeStamps = {attributes: {exclude: ['updatedAt','createdAt']}}

function verifybBranchOfficeData(data) {
  let { name, direction, latitude, longitude } = data;

  if (!name) throw new Error("you must enter a name");
  if (!direction) throw new Error("you must enter a direction");
  verifyLatAndLong(latitude, longitude);

  data.name = data.name.toUpperCase()
  data.direction = data.direction.toUpperCase()
  return data;
}

function verifyLatAndLong(latitude, longitude) {
  if (!latitude) throw new Error("you must enter the latitude");
  if (!longitude) throw new Error("you must enter the longitude");
}

async function verifyDuplicateBranchOffice(name, direction) {
  let BranchOfficeInDb = await Branch_office.findOne({
    where: { [Op.or]: [{ direction }, { name }] },
  });
  if (BranchOfficeInDb) {
    if (BranchOfficeInDb.direction === direction)
      throw new Error(`the direction ${BranchOfficeInDb.direction} already exists`);
    if (BranchOfficeInDb.name === name)
      throw new Error(`the name ${BranchOfficeInDb.name} already exists`);
  }
}

async function verifyBranchOfficeId(id) {
  if (!id) throw new Error("you must provide a branch office id");
  if(!/^[0-9]*$/.test(id)) throw new Error("the id must be a number");

  let BranchOfficeInDb = await Branch_office.findByPk(id, excludeTimeStamps);

  if (!BranchOfficeInDb)
    throw new Error("the id does not correspond to an existing branch office");

  return BranchOfficeInDb;
}

async function getNearestbranchOffice(lat, long) {
  verifyLatAndLong(lat, long);
  let branchOffices = await getAllbranchOffices()
  let nearestbranchOffice;
  let distance = Infinity;
  for(branchOffice of branchOffices) {
    let distanceAux = distanceCalculator(lat ,long,branchOffice.latitude,branchOffice.longitude)
    if(distanceAux < distance ) {
      nearestbranchOffice = branchOffice
      distance = distanceAux
    }
  }
  return nearestbranchOffice;
}

async function getAllbranchOffices() {
  let branchOffices = await Branch_office.findAll(excludeTimeStamps);
  return branchOffices;
}

async function createBranchOffice(data) {
  let { name, direction, latitude, longitude } = verifybBranchOfficeData(data);
  await verifyDuplicateBranchOffice(name, direction);

  var newBranchOffice = await Branch_office.create({
    name,
    direction,
    latitude,
    longitude,
  });
  
  delete newBranchOffice.dataValues.createdAt;
  delete newBranchOffice.dataValues.updatedAt;
  return newBranchOffice;
}

async function getByIdBranchOffice(id) {
  let branchOfficeInDb = await verifyBranchOfficeId(id);
  return branchOfficeInDb;
}

async function updateBranchOffice(id, data) {
  await verifyBranchOfficeId(id);

  let { name, direction, latitude, longitude } = verifybBranchOfficeData(data);

  await verifyDuplicateBranchOffice(name, direction);

  await Branch_office.update(
    { name, direction, latitude, longitude },
    { where: { id } }
  );
  return "the branch office was changed";
}

async function deleteBranchOffice(id) {
  await verifyBranchOfficeId(id);
  //cuando se una con las ordendes de pago, habria que verificar que no tuviera ninguna antes de eliminarla
  await Branch_office.destroy({ where: { id } });
  return "the branch office was removed";
}

module.exports = {
  getNearestbranchOffice,
  getAllbranchOffices,
  createBranchOffice,
  getByIdBranchOffice,
  updateBranchOffice,
  deleteBranchOffice,
};
