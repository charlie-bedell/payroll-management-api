# Payroll app
## permissions
- profile type / user type
- get an email with a specific login that is created for you in the backend
- jwt auth for validating user logins and roles
- expose routes per user type (considered protecting your routes)
- verification happens in the middleware
- if they have the admin role we can expose our write routes
- employee only has read routes

## make sure to focus on front end (get crafty)

## backend seems solid, might need to scale down in order to have enought time
## to do front end

## make (5) dummy pages and get used to linking pages together
- seperate dircotry (with js/css/html) for each page
- make sure to avoid name collisions (everything gets hoisted in the browser!)
- BEM method (block element modifier)

## git branch a lot
- main branch
- compose feature branches often to keep track of work

## lucidChart
https://lucid.app/lucidchart/36c264e4-af92-4c1a-82f8-d3cd8033b8fe/edit?invitationId=inv_78455d2e-4df5-4c7d-a6ea-de2e5d25ac17&page=0_0#
## trello
https://trello.com/b/RZhRVg68/payroll-api-user-stories
## public trello
https://trello.com/invite/b/RZhRVg68/ATTIda0433143f3a02412ecb557d443fe2d2028566E1/payroll-api-user-stories
## routes
### URL
www.mywebsite.com
### Routes

`/`
- login page

`/company`
- GET company page with list of departments that contain list of employees

`/company/:department_id`
- GET singular department page with list of employees
- DELETE (empty) department

`/company/:employee_id`
- GET view singular employee in company (route to their department?)
- POST create new employee
- DELETE employee
- PUT update employee data

`/company/department/:employee_id`
- GET view singular employee in department
- POST create new employee
- DELETE employee
- PUT update employee data

`/company/positions/`
- GET view all positions in company
- POST new position in company
- PUT update position data
- DELETE position (if not referenced by position_id in employees collection)

`/company/positions/employees/:position_id`
- GET view all employees with the same position in the company
