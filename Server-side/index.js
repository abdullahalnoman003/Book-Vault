require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ko3ml0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .send({ message: "Unauthorized Access! You can not get the data boss" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({
        message: "Unauthorized Access! You can not get the data Boss :)",
      });
  }
};

async function run() {
  try {
    const BooksCollection = client.db("BookDB").collection("BooksInfo");
    const reviewsCollection = client.db("BookDB").collection("reviews");

    //Get requests

    app.get("/bookshelf", async (req, res) => {
      try {
        const { category, search, sort } = req.query;
        const query = {};
        if (category && category !== "All") {
          query.book_category = category;
        }
        if (search) {
          query.$or = [
            { book_title: { $regex: search, $options: "i" } },
            { book_author: { $regex: search, $options: "i" } },
          ];
        }
        let sortOption = {};
        if (sort === "title-asc") sortOption.book_title = 1;
        else if (sort === "title-desc") sortOption.book_title = -1;
        else if (sort === "upvote-desc") sortOption.upvote = -1;
        else if (sort === "upvote-asc") sortOption.upvote = 1;
        const books = await BooksCollection.find(query)
          .sort(sortOption)
          .toArray();

        res.send(books);
      } catch (error) {
        res.status(500).send({ message: "Error fetching books" });
      }
    });

    app.get("/top-liked-books", async (req, res) => {
      const sortBooks = await BooksCollection.find({})
        .sort({ upvote: -1 })
        .limit(6)
        .toArray();
      res.send(sortBooks);
    });

    app.get("/book-details/:id", async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const book = await BooksCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(book);
    });
    app.get("/reviews/:bookId", async (req, res) => {
      const bookId = req.params.bookId;
      const result = await reviewsCollection
        .find({ book_id: bookId })
        .toArray();
      res.send(result);
    });

    app.get("/my-books/:email", verifyFireBaseToken, async (req, res) => {
      const { email } = req.params;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "Hey!! You are not Allowed!" });
      }
      const books = await BooksCollection.find({ user_email: email }).toArray();
      res.send(books);
    });

    app.get("/categories-summary", async (req, res) => {
      const books = await BooksCollection.find().toArray();
      const summary = {};
      books.forEach((book) => {
        const category = book.book_category || "Unknown";
        if (summary[category]) {
          summary[category]++;
        } else {
          summary[category] = 1;
        }
      });
      const result = [];
      for (let category in summary) {
        result.push({ category, count: summary[category] });
      }
      res.send(result);
    });

    //Post Requests
    app.post("/add-book", verifyFireBaseToken, async (req, res) => {
      const newBook = req.body;
      const result = await BooksCollection.insertOne(newBook);
      res.send(result);
    });

    app.get("/my-books", verifyFireBaseToken, async (req, res) => {
      const email = req.query.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "Hey!! You are not Allowed!" });
      }

      const books = await BooksCollection.find({ user_email: email }).toArray();
      res.send(books);
    });

    app.post("/add-review", async (req, res) => {
      const review = req.body;
      const exists = await reviewsCollection.findOne({
        book_id: review.book_id,
        user_email: review.user_email,
      });

      if (exists) {
        return res.status(400).send({ message: "Review already exists" });
      }

      review.created_at = new Date();
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    //PATCH Requests
    app.patch("/upvote/:id", async (req, res) => {
      const id = req.params.id;
      const { upvote } = req.body;
      const result = await BooksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { upvote: upvote } }
      );
      res.send(result);
    });
    app.patch("/update-status/:id", async (req, res) => {
      const bookId = req.params.id;
      const { reading_status } = req.body;
      const filter = { _id: new ObjectId(bookId) };
      const updateDoc = { $set: { reading_status } };

      const result = await BooksCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.patch("/update-review/:id", async (req, res) => {
      const id = req.params.id;
      const { review_text } = req.body;

      const result = await reviewsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { review_text: review_text, edited_at: new Date() } }
      );

      res.send(result);
    });

    // PUT Requests
    app.put("/update-book/:id", async (req, res) => {
      const { id } = req.params;
      const updatedBook = req.body;
      const result = await BooksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedBook }
      );
      res.send(result);
    });
    // Delete Request
    app.delete("/delete-book/:id", verifyFireBaseToken, async (req, res) => {
      const id = req.params.id;
      const result = await BooksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    app.delete("/delete-review/:id", async (req, res) => {
      const id = req.params.id;
      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`Book Vault Server is Running:: `);
});

app.listen(port, () => {
  console.log(`Book Vault Server is running in port: ${port}`);
});
