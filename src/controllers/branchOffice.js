const { Branch_office } = require("../db");
const { Op } = require("sequelize");

async function getNearestbranchOffice() {
  return "getNearestbranchOffice";
}
async function getAllbranchOffices() {
  let branchOffices = await Branch_office.findAll();
  return branchOffices;
}
async function createBranchOffice(data) {
  if(data == {}) throw new Error ("you must enter the data") 
  let {name, direction, latitude, longitude} = data

  if(!name) throw new Error ("you must enter a name")
  if(!direction) throw new Error ("you must enter a direction")
  if(!latitude) throw new Error ("you must enter the latitude")
  if(!longitude) throw new Error ("you must enter the longitude")

  let BranchOfficeInDb = await Branch_office.findOne({ where: {[Op.or] : [{ direction },{ name }]}});
  if (BranchOfficeInDb){
  if (BranchOfficeInDb.direction === direction) throw new Error(`the branchOffice direction already exists`);
  if (BranchOfficeInDb.name === name) throw new Error(`the branchOffice name already exists`);}

  const newBranchOffice = await Branch_office.create({name, direction, latitude, longitude})
  return newBranchOffice;
}
async function getByIdBranchOffice(id) {
  if (!id) throw new Error("you must provide a branch office id");

  let BranchOfficeInDb = await Branch_office.findByPk(id);

  if (!BranchOfficeInDb) throw new Error("the id does not correspond to an existing branch office");

  return BranchOfficeInDb;
}
async function updateBranchOffice(id, data) {
  await getByIdBranchOffice(id);

  let {name, direction, latitude, longitude} = data

await Branch_office.update(
  {name, direction, latitude, longitude},
  { where: { id } }
  );
  return "the branch office was changed";
}
async function deleteBranchOffice(id) {
  await getByIdBranchOffice(id);
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
