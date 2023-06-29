import mysql from "mysql";
import db from "../index.js";

//Connection to MySQL database

export const postUser = (req, res) => {
  let newEmployee = { ...req.body };

  db.query("INSERT INTO employees SET ?", newEmployee, (error, result) => {
    if (error) {
      return res.status(500).json({ status: "ERROR", error });
    }
    return res.json({ status: "SUCCESS" });
  });
};

export const getUser = (req, res) => {
  db.query("SELECT * from employees", (error, data) => {
    if (error) {
      return res.json({ status: "ERROR", error });
    }
    return res.json(data);
  });
};

export const getUserById = (req, res) => {
  const employeeId = req.params.id;

  db.query(
    "SELECT * FROM employees WHERE id = ?",
    [employeeId],
    (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: "ERROR", error });
      }

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: "NOT FOUND", message: "Employee not found" });
      }
      return res.json(data[0]);
    }
  );
};

export const updateUserById = (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = { ...req.body };

  db.query(
    "UPDATE employees SET ? WHERE id = ?",
    [updatedEmployee, employeeId],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: "ERROR", error });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ status: "NOT FOUND", message: "Employee not found" });
      }

      return res.json({ status: "SUCCESS" });
    }
  );
};
export const deleteUserById = (req, res) => {
  const employeeId = req.params.id;

  db.query(
    "DELETE FROM employees WHERE id = ?",
    [employeeId],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: "ERROR", error });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ status: "NOT FOUND", message: "Employee not found" });
      }
      return res.json({ status: "SUCCESS" });
    }
  );
};
export const routeOutBound = (req, res) => {
  res.status(404).send("Route not found");
};

//authentication and authorization section only

//authorize the subsiquent request after successful login or signup...
export const authorizeUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, "YOUR_SECRET_KEY");
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

//chekcks for user in database and if found returns jwt cookie for further request
export const authenticateUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //hash the password before saving to database
  const user = { username, password: hashedPassword };

  const token = jwt.sign(user, "YOUR_SECRET_KEY");
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
};

//clears the cookie session and user have to login again !!
export const terminateUser = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};
