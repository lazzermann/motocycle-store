module.exports = {
  async up(db, client) {
    const faker = require('faker')
    const mongoose = require('mongoose')
    const typeId = mongoose.Types.ObjectId
    
    const categories = []
    categories.push({
      _id: mongoose.Types.ObjectId(),
      name: 'Classic',
      description: 'This is Classic'
    })
    categories.push({
      _id: mongoose.Types.ObjectId(),
      name: 'Sport',
      description: 'This is Sport'
    })
    categories.push({
      _id: mongoose.Types.ObjectId(),
      name: 'Super sport',
      description: 'This is Super sport'
    })
    categories.push({
      _id: mongoose.Types.ObjectId(),
      name: 'Chopper',
      description: 'This is Chopper'
    })

    const users = []
    for(let i = 0; i < 100; i++){
      users.push({
        _id: mongoose.Types.ObjectId(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        role: 'user',
        password: faker.internet.password(),
        image: 'https://robohash.org/' + faker.internet.password()
      })
    }

    const products = []
    for(let i = 0; i < 100; i++){
      products.push({
        _id: mongoose.Types.ObjectId(),
        category: [categories[faker.random.number({'min': 0, 'max' : 3})]._id, categories[faker.random.number({'min': 0, 'max' : 3})]._id],
        user: users[i]._id,
        reviews: [],
        name: faker.vehicle.vehicle(),
        price: faker.commerce.price(),
        fuelType: 'gasoline',
        description: faker.lorem.sentence(),
        image: 'https://robohash.org/' + faker.internet.password()
      })
    }

    console.log(products[20])
    await db.collection('products').insertMany(products)
    await db.collection('users').insertMany(users)
    await db.collection('categories').insertMany(categories)
    //await db.collection('categories').insertOne(categories[0])
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
