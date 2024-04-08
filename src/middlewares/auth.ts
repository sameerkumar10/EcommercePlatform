import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";



// Middleware to ensure only admin is allowed permission
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return next(new ErrorHandler("Please log in first", 401));
  
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Invalid user ID", 401));
  
    // Ensure user role is "admin"
    if ((user.role as string) !== "admin") {
        return next(new ErrorHandler("You do not have permission to perform this action", 403));
      }
    next(); // Call next middleware if user is an admin
  });