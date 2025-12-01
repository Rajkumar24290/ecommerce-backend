module.exports = {
  success: (res, data) => res.json({ success: true, data }),
  error: (res, msg) => res.status(400).json({ success: false, msg }),
};
