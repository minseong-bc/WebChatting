const User = require("../Moders/user");
const userController = {}

module.exports.saveUser = async(userName, soid)=>{ // 이미 있는 유저인지 확인 -> 1. 있다면 연결정보 token값만 변경 2. 없다면 새로 유저정보 만들기
    let user = await User.findOne({ name: userName});
    if (!user) {
        user = new User({
            name: userName,
            token: soid,
            online: true,
        });
    }
    user.token = soid;
    user.online = true;
    
    await user.save();
    return user;
};

userController.checkUser = async(soid) => {
    const user = await User.findOne({token:soid})
    if(!user) throw new Error("user is not found");
    return user;
};

module.exports = userController