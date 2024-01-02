import express from 'express';
import { getCompany, getEmployee, getEmployees, updateCompany, updateEmployee, newEmployees, deleteCompany, deleteEmployee, newCompany } from '../controllers/company.js';

const router = express.Router();
// TODO every request made needs auth to makes sure somone from company A cant access company B
// additionally, user roles must be checked in order control permissions to certain requests


// main company page
// I think this will be a redirect to :companyId after login is verified (if super user).
// Otherwise it will redirect to the specific employee
router.get('/', async (req, res) => {
  // if auth has not taken place, reroute to login
  // on auth, retrieve companyId, employeeId, and role permissions from DB
  // then decide where to route to
});

// root route gets redirected here after auth
// don't know if I want to have a high level overview of the company (like metrics)
// or if 
router.get('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const company = await getCompany(companyId);
    res.status(200).json(company);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `error in retrieving company: ${companyId}`,
      error: `${err}`
    });
  }
});

router.put('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  const payload = req.body;
  try {
    const updatedCompany = await updateCompany(companyId, payload);
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(500).json({
      message: `unable to update company: ${companyId}`,
      error: `${err}`
    });
  }
});

router.delete('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  const payload = req.body;
  try {
    const deleteResult = await deleteCompany(companyId);
    res.status(200).json(deleteResult);
  } catch (err) {
    res.status(500).json({
      message: `unable to delete companyId: ${companyId}`,
      error: `${err}`
    });
  }
});

router.get('/:companyId/employees', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const employees = await getEmployees(companyId);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({
      message: `error retreiving employees from ${companyId}`,
      error: `${err}`
    });
  }
});

// add one or many employees
router.post('/:companyId/employees', async (req, res) => {
  const payload = req.body;
  const companyId = req.params.companyId;
  try {
    const result = await newEmployees(companyId, payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: `unable to add new employees`,
      error: `${err}`
    });
  }
});



// this will be specific employee page
router.get('/:companyId/employees/:employeeId', async (req, res) => {
  const companyId = req.params.companyId;
  const employeeId = req.params.employeeId;
  try {
    let employee = await getEmployee(companyId, employeeId);
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({
      message: `unable to get employee with id ${employeeId} in company ${companyId}`,
      error: `${err}`
    });
  }
});

// update employee
router.put('/:companyId/employees/:employeeId', async (req, res) => {
  const payload = req.body;
  const companyId = req.params.companyId;
  const employeeId = req.params.employeeId;
  try {
    let employee = await updateEmployee(companyId, employeeId, payload);
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({
      message: `unable to update employee ${employeeId} in company ${companyId}`,
      error: `${err}`
    });
  }
});

// list of departments?? TODO
router.get('/:companyId/departments/', async (req, res) => {
  const companyId = req.params.companyId;
});


export default router;
