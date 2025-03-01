import { Schema, model } from "mongoose"

const companySchema = new Schema(
{
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    foundedYear: {
        type: Number,
        required: true,
        min: 1800
    },
    yearsOfExperience: {
        type: Number,
        default: 0,
        required: true,
    },
    impactLevel: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    telephone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "telephone is required"]

    },
    representative: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location: {
        type: String,
        default: "Not specified",
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true,
}
)

companySchema.pre("save", function(next) {
    const currentYear = new Date().getFullYear()
    this.yearsOfExperience = currentYear - this.foundedYear
    next()
})

companySchema.methods.toJSON = function () {
    const { __v, _id, ...company } = this.toObject()
    company.cid = _id
    return company
}

export default model("Company", companySchema)
