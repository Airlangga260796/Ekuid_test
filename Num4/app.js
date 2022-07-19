const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { User, Book, Transaction } = require("./models/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//will be place in .env
let secret = "secret";

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userLog = await User.findOne({
      where: {
        email: email,
      },
    });
    const compareHash = bcrypt.compareSync(password, userLog.password);
    const payload = {
      email,
      user_name: userLog.user_name,
    };
    const access_token = jwt.sign(payload, secret);
    if (!compareHash) {
      throw new Error(`not_valid`);
    }
    res.status(200).json({
      statusCode: 200,
      message: `Success Login`,
      access_token: access_token,
    });
  } catch (err) {
    next(err);
  }
});
app.get("/listBook", async (req, res, next) => {
  try {
    const { book_name } = req.query;
    let opts = {
      where: {},
      attributes: { exclude: ["createdAt", "updatedAt"] },
    };
    if (book_name) {
      opts.where = {
        ...opts.where,
        book_name: { [Op.iLike]: `%${book_name}%` },
      };
    }
    const bookList = await Book.findAndCountAll(opts);
    if (bookList.count === 0) {
      throw Error(`not_found`);
    }
    res.status(200).json({
      statusCode: 200,
      message: `all List Book`,
      data: bookList,
    });
  } catch (err) {
    next(err);
  }
});
app.get("/transaction", async (req, res, next) => {
  try {
    const transaction = await Transaction.findAndCountAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (transaction.count === 0) {
      throw Error(`not_found`);
    }
    res.status(200).json({
      statusCode: 200,
      message: `all transaction`,
      data: transaction.rows,
    });
  } catch (err) {
    next(err);
  }
});
app.patch("/transaction/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const date = new Date();

    if (!status) {
      throw new Error(`bad_request`);
    }

    const statusRes = await Transaction.findOne({
      include: { model: Book, foreignKey: "id_book" },
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const statusUpdate = await Transaction.update(
      { status: status, date: date },
      { where: { id: id } }
    );
    // const date = new Date()
    const data = {
      book_name: statusRes.Book.book_name,
      author: statusRes.Book.author,
      photo: statusRes.Book.photo,
      status_before: statusRes.status,
      status_After: status,
      date: new Date(),
    };
    res.status(200).json({
      statusCode: 200,
      message: `all transaction`,
      data: data,
    });
  } catch (err) {
    next(err);
  }
});
app.use((err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";
  console.log(err, "Error from middleware");
  console.log(err.message);
  if (err.message === `not_found`) {
    code = 404;
    msg = "Data Not Found";
  } else if (err.message === `bad_request`) {
    code = 400;
    msg = "Bad Request";
  } else if (err.message === `not_valid`) {
    code = 401;
    msg = "Unauthorized";
  }
  res.status(code).json({
    statusCode: code,
    error: { message: msg },
  });
});

app.listen(port, () => {
  console.log(`Project EKUID listening on port ${port}`);
});
