const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { // 유저 이름 정보
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    token: { // 연결 id정보
        type: String,
    },
    online: { // 유저의 온/오프라인 정보
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose.model("User", userSchema);