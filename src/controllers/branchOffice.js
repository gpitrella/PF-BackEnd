const { BranchOffice } = require("../db");

async function getNearestbranchOffice() {
  return "getNearestbranchOffice";
}
async function getAllbranchOffices() {
  return "getAllbranchOffices";
}
async function createBranchOffice(data) {
  if(data == {}) throw new Error ("you must enter the data") 
  console.log(data)
  let {name, direction, latitude, longitude} = data
  if(!name) throw new Error ("you must enter a name")
  if(!direction) throw new Error ("you must enter a direction")
  if(!latitude) throw new Error ("you must enter the latitude")
  if(!longitude) throw new Error ("you must enter the longitude")

  const newBranchOffice = await BranchOffice.create({name, direction, latitude, longitude})
  return newBranchOffice;
}
async function getByIdBranchOffice() {
  return "getByIdBranchOffice";
}
async function updateBranchOffice() {
  return "updateBranchOffice";
}
async function deleteBranchOffice() {
  return "deleteBranchOffice";
}

module.exports = {
  getNearestbranchOffice,
  getAllbranchOffices,
  createBranchOffice,
  getByIdBranchOffice,
  updateBranchOffice,
  deleteBranchOffice,
};
