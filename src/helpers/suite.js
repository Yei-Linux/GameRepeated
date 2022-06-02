const handler = {
  add: (a, b) => a + b,
  operations: (type, a, b) => {
    switch (type) {
      case 'suma':
        return handler.add(a, b)

      default:
        return
    }
  },
}

module.exports = handler
