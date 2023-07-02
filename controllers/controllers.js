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



