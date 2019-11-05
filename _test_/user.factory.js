module.exports = dependencies => async userModel => {
    const { persistuser } = dependencies


if(!userModel.username || userModel.username.trim().length < 2){
    throw new Error('invalid user name');
    
}

 await persistuser(userModel)
  return userModel
}