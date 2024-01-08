import express from 'express';
import { getCompany, getEmployee, getEmployees, updateCompany, updateEmployee, newEmployees, deleteCompany, deleteEmployee, newCompany, getDepartmentEmployees } from '../controllers/company.js';
import { isAdmin, isManager } from '../middleware/auth.js';
const router = express.Router();
// TODO every request made needs auth to makes sure somone from company A cant access company B
// additionally, user roles must be checked in order control permissions to certain requests


// main company page
// I think this will be a redirect to :companyId after login is verified (if super user).
// Otherwise it will redirect to the specific employee
router.get('/', async (req, res) => {
  switch (req.user.role) {
  case 'Admin':
    res.redirect(`/companies/${req.user.companyId}/employees`);
    break;
  case 'Manager':
    // TODO configure department route
    res.redirect(`/companies/${req.user.companyId}/department/${req.user.department.split(' ').join('_')}`);
    break;
  case 'Employee':
    res.redirect(`/companies/${req.user.companyId}/employees/${req.user.employeeId}`);
    break;
  default:
    res.status(400).json({message: `unable to determine route`,
                          error: `undefined role!`});
  }
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

router.put('/:companyId', isAdmin, async (req, res) => {
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

router.delete('/:companyId', isAdmin, async (req, res) => {
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

router.get('/:companyId/employees', isAdmin, async (req, res) => {
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
router.post('/:companyId/employees', isAdmin, async (req, res) => {
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
    res.status(200).json({employee: employee});
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

router.delete('/:companyId/employees/:employeeId', async (req, res) => {
  const companyId = req.params.companyId;
  const employeeId = req.params.employeeId;
  try {
    const deleteResult = await deleteEmployee(companyId, employeeId);
    res.status(200).json({result: deleteResult});
  } catch (err) {
    res.status(500).json({message: `There was an error deleting employee ${employeeId}`,
                          error: `${err}`});
  }
});

// list of departments?? TODO
router.get('/:companyId/department/:departmentName', isManager, async (req, res) => {
  const companyId = req.params.companyId;
  // departmentName will be snake_case
  
  let departmentName = req.params.departmentName;
  departmentName = departmentName.split('_').join(' ');
  
  try {
    const department = await getDepartmentEmployees(departmentName);
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({
      message: `unable to get employees from department ${departmentName} in company ${companyId}`,
      error: `${err}`
    });
  }
});


export default router;
