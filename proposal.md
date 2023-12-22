# Payroll app
## lucidChart
https://lucid.app/lucidchart/36c264e4-af92-4c1a-82f8-d3cd8033b8fe/edit?invitationId=inv_78455d2e-4df5-4c7d-a6ea-de2e5d25ac17&page=0_0#
## trello
https://trello.com/b/RZhRVg68/payroll-api-user-stories

## routes
### URL
www.mywebsite.com
### Routes

/
- login page

/company
- GET company page with list of departments that contain list of employees

/company/:department_id
- GET singular department page with list of employees
- DELETE (empty) department

/company/:employee_id
- GET view singular employee in company (route to their department?)
- POST create new employee
- DELETE employee
- PUT update employee data

/company/department/:employee_id
- GET view singular employee in department
- POST create new employee
- DELETE employee
- PUT update employee data

/company/positions/
- GET view all positions in company
- POST new position in company
- PUT update position data
- DELETE position (if not referenced by position_id in employees collection)

/company/positions/employees/:position_id
- GET view all employees with the same position in the company
