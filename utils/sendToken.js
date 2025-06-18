// exports.sendToken = (register, statusCode, res) => {
//     const token = register.getJwtToken();



//     // const options = {
//     //     exipres:new Date(
//     //         Date.now() + process.env.COOKIE_EXIPRES  *24 * 60 * 60 * 1000// 1 hour
//     //     ),
//     //     httpOnly: true,

//     // }

//     const expiresInMs = parseDuration(process.env.COOKIE_EXPIRES || '1h');

//     const options = {
//         expires: new Date(Date.now() + expiresInMs),
//         httpOnly: true,
//     };
//     const { username, email } = register
//     res.status(statusCode).cookie("token", token, options).json({
//         success: true,
//         id: register._id, token, username: username, email: email
//     })



// }


const ms = require('ms');

exports.sendToken = (register, statusCode, res) => {
  const token = register.getJwtToken();

  const expiresInMs = ms(process.env.COOKIE_EXPIRES || '1h');

  const options = {
    expires: new Date(Date.now() + expiresInMs),
    httpOnly: true,
  };

  const { username, email } = register;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      id: register._id,
      token,
      username,
      email,
    });
};
