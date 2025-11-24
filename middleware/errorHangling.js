export const errorHandling = (error, req, res, next) => {
  if (error) {
    return res.status(error['cause'] || 500).json({
      success: false,
      message: error?.message || "Internal Server Error",
      stack: error.stack,
    })
  }
}