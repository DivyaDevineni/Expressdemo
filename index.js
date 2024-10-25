const Joi = require("@hapi/joi");
const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  { id: 1, name: "AWS" },
  { id: 2, name: "Azure" },
  { id: 3, name: "Devops" },
  { id: 4, name: "Cloud" },
];
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  //res.send(['AWS', 'DEVOPS', 'AZURE']);
  res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// })

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validatecourse(req.body);
  if (error) return res.status(400).send(error);

  // if (!req.body.name || req.body.name.length < 3) {
  //     res.status(400).send('Name is required');
  //     return;
  // }

  //instead of using above manual validation you can use Joi

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//To update course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id was not found");
  // const result = validatecourse(req.body);
  const { error } = validatecourse(req.body); //use object destructing

  if (error) return res.status(400).send(error);
  course.name = req.body.name;
  res.send(course);
});

function validatecourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course.body, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id was not found");

  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(course);
});
const port = process.env.PORT || 3000;
app.listen("3000", () => console.log(`App listening on port ${port}....`));
