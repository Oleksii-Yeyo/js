function calculateTeamFinanceReport(salaries, team) {

    function salaryBeforeTax(salaryAfterTax, tax) {
        return salaryAfterTax / (1 - tax / 100);
    }
    
    let report = {
        "totalBudgetTeam": 0,
    }

    const listOfTeamsSpecialization = Object.keys(salaries);
	
    for (const employee of team) {
        const employeeSpecialization = employee.specialization;

        if (!listOfTeamsSpecialization.includes(employeeSpecialization)) {
            continue;
        }

        if (!report[`totalBudget${employeeSpecialization}`]) {
            report[`totalBudget${employeeSpecialization}`] = 0;
        }

        const salaryBeforeTaxOfEmployee = salaryBeforeTax(salaries[employeeSpecialization].salary, parseInt(salaries[employeeSpecialization].tax)) + 1e-10;
        report[`totalBudget${employeeSpecialization}`] += salaryBeforeTaxOfEmployee;
        report.totalBudgetTeam += salaryBeforeTaxOfEmployee;
    }

    report = Object.entries(report)
    report.map(record => record[1] = Math.trunc(record[1]));
	
    const ReportObject = {};
    report.forEach(record => ReportObject[record[0]] = record[1])

    return ReportObject;
 }

 
// TEAM 1
const salaries1 = {
    Manager: { salary: 1000, tax: "10%" },
    Designer: { salary: 600, tax: "30%" },
    Artist: { salary: 1500, tax: "15%" },}

const team1 = [
    { name: "Misha", specialization: "Manager" },
    { name: "Max", specialization: "Designer" },
    { name: "Vova", specialization: "Designer"},
    { name: "Leo", specialization: "Artist"},]
    
    const financeReport1 = calculateTeamFinanceReport(salaries1, team1)
    console.log(JSON.stringify(financeReport1))


// TEAM 2

    const salaries2 = {
        TeamLead: { salary: 1000, tax: "99%" },
        Architect: { salary: 9000, tax: "34%" },}

        const team2 = [
        { name: "Alexander", specialization: "TeamLead" },
        { name: "Gaudi", specialization: "Architect" },
        { name: "Koolhas", specialization: "Architect" },
        { name: "Foster", specialization: "Architect" },
        { name: "Napoleon", specialization: "General" },]
    

        const financeReport2 = calculateTeamFinanceReport(salaries2, team2)
        console.log(JSON.stringify(financeReport2))
        
    
