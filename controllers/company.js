import { Company, Employee } from '../models/payroll-models.js';

function getCompany(companyId) {
	let company = Company
		.findById(companyId)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});

	return company;
}

function getEmployee(companyId, employeeId) {
	let employee = Employee
		.find({ _id: employeeId, companyId: companyId })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
	return employee;
}

function getEmployees(companyId) {
	let employees = Employee
		.find({ companyId: companyId })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
	return employees;
}

function updateCompany(companyId, payload) {
	let updatedCompany = Company.findByIdAndUpdate(companyId, { companyName: payload.companyName }, { new: true })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
	return updatedCompany;
}

function updateEmployee(companyId, employeeId, payload) {
	let query = { _id: employeeId, companyId: companyId };
	let updatedEmployee = Employee.findOneAndUpdate(query, payload, { new: true })
		.then((res) => {
			return res;
		}).catch((err) => {
			throw err;
		});
	return updatedEmployee;
}

function validateNewEmployeeCompanyId(companyId, payload) {
  for (let employee of payload) {
    if (employee.companyId !== companyId) {
      throw new Error(`a new employee (${employee.firstName} ${employee.lastName}) has an incorrect or invalid companyId employee companyId ${employee.companyId} correct companyId: ${companyId}`);
    }
  }
}

function newEmployees(companyId, payload) {
  // payload should be an array of employees to add
	if (Array.isArray(payload)) {
    validateNewEmployeeCompanyId(companyId, payload);
	} else {
    validateNewEmployeeCompanyId(companyId, [payload]);
  }
	let newEmployees = Employee
		.create(payload)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
  return newEmployees;
}

function newCompany() {
  // TODO implement functionality for newCompany
  throw new Error("function 'newCompany' does not have any functionality");
}

async function deleteCompany(companyId) {
	let company = await Company.findById(companyId);
	let employee = await Employee.findOne({ companyId: companyId });
  try {
    if (employee) {
      const employeesStillExistError = new Error(`there are still employees associated with ${company.companyName}. In order to remove this company, you need to remove all associated employees`);
      throw employeesStillExistError;
	  } else {
      let result = await Company.findByIdAndDelete(companyId);
      return result;
    }
  } catch (err) {
    throw err;
  }
}

function deleteEmployee(companyId, employeeId) {
	let query = { _id: employeeId, companyId: companyId };
	let result = Employee
		.findOneAndDelete(query)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
	return result;
}

export { getCompany, getEmployee, getEmployees, updateCompany, updateEmployee, newEmployees, deleteCompany, deleteEmployee, newCompany }
