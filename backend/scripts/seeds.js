//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require("mongoose");
require('../models/User.js');
require('../models/Item.js');
require('../models/Comment.js');
const { model, connect, connection } = mongoose;
const User = model("User");
const Item = model("Item");
const Comment = model("Comment");

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const users = [];
const items = [];
const comments = [];

// Create 100 mock users
for (let i = 0; i < 100; i++) {
  console.log(i)
  const user = new User({
    username: `user${i}`,
    email: `user${i}@example.com`,
    password: `password${i}`
  });

  user.setPassword(`password${i}`);
  users.push(user);
}

// Save all users to DB
User.insertMany(users, function(err, savedUsers) {
  if (err) throw err;

  // Create 100 mock items
  for (let i = 0; i < 100; i++) {
    console.log(i)
    const item = new Item({
      title: `Item ${i}`,
      description: `Description for Item ${i}`,
      seller: savedUsers[i]._id
    });

    items.push(item);
  }

  // Save all items to DB
  Item.insertMany(items, function(err, savedItems) {
    if (err) throw err;

    // Create 100 mock comments
    for (let i = 0; i < 100; i++) {
        console.log(i)
      const comment = new Comment({
        body: `Comment ${i} for Item ${i}`,
        seller: savedUsers[i]._id,
        item: savedItems[i]._id
      });

      comments.push(comment);
    }

    // Save all comments to DB
    Comment.insertMany(comments, function(err) {
      if (err) throw err;

      console.log("Mock data created successfully!");
      connection.close();
    });
  });
});
