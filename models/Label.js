//Define Note Collection Schema
const  LabelSchema = new Schema({
    title: { type: String, default: "" },
    createDate:{ type: String, default: Date.now },
    editDate:{ type: String, default: Date.now },
    note:{type:mongoose.Schema.ObjectId, ref:'notes'}
})
module.exports = mongoose.model("labels", LabelSchema);