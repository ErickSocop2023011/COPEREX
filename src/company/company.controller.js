import Company from "../company/company.model.js"
import Category from "../category/category.model.js"
import User from "../user/user.model.js"
import ExcelJS from "exceljs"
import path from "path"
import fs from "fs"

export const addCompany = async (req, res) => {
    try {
        const data = req.body

        const representative = await User.findById(data.representative)

        const categoria = await Category.findById(data.category)

        if(!representative){
            return res.status(400).json({
                success: false,
                msg: "the User does not exist"
            })
        }

        if(!categoria){
            return res.status(400).json({
                success: false,
                msg: "the category does not exist"
            })
        }

        const comp = await Company.create(data)

        return res.status(201).json({
            message: "Company has been registered",
            Company: comp
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error registering the company",
            error:err
        })
    }
}

export const generateCompaniesReport = async (req, res) => {
    try {
        const { order, minYear, maxYear, category, impactLevel } = req.body;
        let filter = {};

        if (minYear && maxYear) {
            const currentYear = new Date().getFullYear();
            filter.foundedYear = { 
                $gte: currentYear - maxYear, 
                $lte: currentYear - minYear 
            };
        }

        if (category) {
            filter.category = category;
        }

        const validImpactLevels = ["Low", "Medium", "High"];
        if (impactLevel && validImpactLevels.includes(impactLevel)) {
            filter.impactLevel = impactLevel;
        }

        let sort = {};
        if (order === "A-Z") sort.name = 1;
        if (order === "Z-A") sort.name = -1;
        sort.foundedYear = 1;

        const companies = await Company.find(filter)
            .sort(sort)
            .populate("category", "name") 
            .populate("representative", "name surname email");

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: "Company Name", key: "name", width: 30 },
            { header: "Years of Experience", key: "yearsOfExperience", width: 15 },
            { header: "Impact Level", key: "impactLevel", width: 15 },
            { header: "Category", key: "category", width: 20 },
            { header: "Representative", key: "representative", width: 30 },
            { header: "Location", key: "location", width: 20 },
            { header: "Status", key: "status", width: 10 },
        ];

        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                yearsOfExperience: new Date().getFullYear() - company.foundedYear,
                impactLevel: company.impactLevel,
                category: company.category?.name || "Unknown",
                representative: company.representative 
                    ? `${company.representative.name} ${company.representative.surname} - ${company.representative.email}`
                    : "Unknown", 
                location: company.location,
                status: company.status ? "Active" : "Inactive"
            });
        });

        const directoryPath = path.join(path.resolve(), 'reports');
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath); 
        }

        const filePath = path.join(directoryPath, `Companies_Report_${Date.now()}.xlsx`);

        await workbook.xlsx.writeFile(filePath);
        res.status(200).json({
            success: true,
            message: "Companies filtered successfully, the file is located in the reports folder"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting companies",
            error: error.message
        });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { cid } = req.params
        const data = req.body

        const company = await Company.findById(cid)

        if (!company) {
            return res.status(400).json({
                success: false,
                msg: "Company not found",
            })
        }

        if (data.foundedYear) {
            const currentYear = new Date().getFullYear()
            data.yearsOfExperience = currentYear - data.foundedYear
        }

        const updatedCompany = await Company.findByIdAndUpdate(cid, data, { new: true })

        res.status(200).json({
            success: true,
            msg: "Company updated",
            company: updatedCompany,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error updating company",
            error: err.message,
        })
    }
}
