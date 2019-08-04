export default (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
