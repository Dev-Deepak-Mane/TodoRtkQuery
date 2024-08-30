import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });

  //res
  // .status(statusCode)
  // // .cookie("token", token, {
  // //   httpOnly: true,
  // //   maxAge: 15 * 60 * 1000,
  // //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
  // //   secure: process.env.NODE_ENV === "Development" ? false : true,
  // // })
  // .json({
  //   success: true,
  //   message,
  //   token,
  // });
};
