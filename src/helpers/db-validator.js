import User from '../user/user.model.js'
import Category from '../category/category.model.js'
import Company from '../company/company.model.js'

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email })
    if (existe) {
        throw new Error(`Email: ${email}, is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({ username })
    if (existe) {
        throw new Error(`Username: ${username}, is already registered`)
    }
}

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid)
    if (!existe) {
        throw new Error("The user with the entered ID does not exist")
    }
}

export const categoryExists = async (name = "") => {
    const existe = await Category.findOne({ name })
    if (existe) {
        throw new Error(`Category: ${name}, is already registered`)
    }
}

export const CompanyExists = async (name = "") => {
    const existe = await Company.findOne({ name })
    if (existe) {
        throw new Error(`Company: ${name}, is already registered`)
    }
}

export const telephoneExists = async (telephone = "") => {
    const existe = await Company.findOne({ telephone })
    if (existe) {
        throw new Error(`Company: ${telephone}, is already registered`)
    }
}