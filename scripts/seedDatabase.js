const mongoose = require('mongoose');
const axios = require('axios');
const BookModel = require('../models/bookModel.js');

const urlsArr = [
    "https://covers.openlibrary.org/b/id/7222246-L.jpg",  // The Great Gatsby
    "https://covers.openlibrary.org/b/id/153778-L.jpg",   // 1984
    "https://covers.openlibrary.org/b/id/8222156-L.jpg",  // To Kill a Mockingbird
    "https://covers.openlibrary.org/b/id/8222157-L.jpg",  // The Catcher in the Rye
    "https://covers.openlibrary.org/b/id/7984916-L.jpg",  // Pride and Prejudice
    "https://covers.openlibrary.org/b/id/6102168-L.jpg",  // The Hobbit
    "https://covers.openlibrary.org/b/id/6192415-L.jpg",  // Moby Dick
    "https://covers.openlibrary.org/b/id/7222247-L.jpg",  // War and Peace
    "https://covers.openlibrary.org/b/id/8231046-L.jpg",  // The Picture of Dorian Gray
    "https://covers.openlibrary.org/b/id/7984917-L.jpg",  // Brave New World
    "https://covers.openlibrary.org/b/id/8222158-L.jpg",  // The Grapes of Wrath
    "https://covers.openlibrary.org/b/id/7222248-L.jpg",  // Fahrenheit 451
    "https://covers.openlibrary.org/b/id/6192416-L.jpg",  // Animal Farm
    "https://covers.openlibrary.org/b/id/7222249-L.jpg",  // The Chronicles of Narnia
    "https://covers.openlibrary.org/b/id/6152129-L.jpg",  // The Lord of the Rings
    "https://covers.openlibrary.org/b/id/7222250-L.jpg",  // The Alchemist
    "https://covers.openlibrary.org/b/id/7222251-L.jpg",  // The Kite Runner
    "https://covers.openlibrary.org/b/id/6152130-L.jpg",  // The Book Thief
    "https://covers.openlibrary.org/b/id/7222252-L.jpg",  // Life of Pi
    "https://covers.openlibrary.org/b/id/7222253-L.jpg",  // The Fault in Our Stars
    "https://covers.openlibrary.org/b/id/7222254-L.jpg",  // The Road
    "https://covers.openlibrary.org/b/id/7222255-L.jpg",  // The Secret Garden
    "https://covers.openlibrary.org/b/id/7222256-L.jpg",  // The Bell Jar
    "https://covers.openlibrary.org/b/id/7222257-L.jpg",  // The Handmaid's Tale
    "https://covers.openlibrary.org/b/id/7222258-L.jpg",  // The Hunger Games
    "https://covers.openlibrary.org/b/id/7222259-L.jpg",  // Gone with the Wind
    "https://covers.openlibrary.org/b/id/7222260-L.jpg",  // The Da Vinci Code
    "https://covers.openlibrary.org/b/id/7222261-L.jpg",  // The Shining
    "https://covers.openlibrary.org/b/id/7222262-L.jpg",  // The Outsiders
    "https://covers.openlibrary.org/b/id/7222263-L.jpg",  // The Lovely Bones
    "https://covers.openlibrary.org/b/id/7222264-L.jpg",  // The Time Traveler's Wife
    "https://covers.openlibrary.org/b/id/7222265-L.jpg",  // The Night Circus
    "https://covers.openlibrary.org/b/id/7222266-L.jpg",  // The Perks of Being a Wallflower
    "https://covers.openlibrary.org/b/id/7222267-L.jpg",  // The Hitchhiker's Guide to the Galaxy
    "https://covers.openlibrary.org/b/id/7222268-L.jpg",  // The Road Less Traveled
    "https://covers.openlibrary.org/b/id/7222269-L.jpg",  // The Immortal Life of Henrietta Lacks
    "https://covers.openlibrary.org/b/id/7222270-L.jpg",  // The Glass Castle
    "https://covers.openlibrary.org/b/id/7222271-L.jpg",  // The Color Purple
    "https://covers.openlibrary.org/b/id/7222272-L.jpg",  // The Road to Character
    "https://covers.openlibrary.org/b/id/7222273-L.jpg",  // The Brief Wondrous Life of Oscar Wao
    "https://covers.openlibrary.org/b/id/7222274-L.jpg",  // The Nightingale
    "https://covers.openlibrary.org/b/id/7222275-L.jpg",  // A Man Called Ove
    "https://covers.openlibrary.org/b/id/7222276-L.jpg",  // Where the Crawdads Sing
    "https://covers.openlibrary.org/b/id/7222277-L.jpg",  // The Seven Husbands of Evelyn Hugo
    "https://covers.openlibrary.org/b/id/7222278-L.jpg",  // Circe
    "https://covers.openlibrary.org/b/id/7222279-L.jpg",  // The Metamorphosis
    "https://covers.openlibrary.org/b/id/7222280-L.jpg",  // The Wind in the Willows
    "https://covers.openlibrary.org/b/id/7222281-L.jpg",  // Dracula
    "https://covers.openlibrary.org/b/id/7222282-L.jpg",  // The Picture of Dorian Gray
    "https://covers.openlibrary.org/b/id/7222283-L.jpg",  // One Hundred Years of Solitude
    // "https://covers.openlibrary.org/b/id/7222284-L.jpg",  // The Brothers Karamazov
    // "https://covers.openlibrary.org/b/id/7222285-L.jpg",  // The Count of Monte Cristo
    // "https://covers.openlibrary.org/b/id/7222286-L.jpg",  // The Odyssey
    // "https://covers.openlibrary.org/b/id/7222287-L.jpg"   // The Divine Comedy
]

const MONGO_UR = process.env.MONGO_URI;
const MONGO_URI = MONGO_UR;


// Fetch data from the API
async function fetchBooks() {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return [];
  }
}

function generateUniqueCoverImage(id) {
    return urlsArr[id-1];
}

// Seed the database
async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    const books = await fetchBooks();
    const formattedBooks = books.map(book => ({
      title: book.title,
      author: book.author,
      description: book.description,
      publishedYear: String(book.publication_year),
      genre: book.genre,
      coverImage: generateUniqueCoverImage(book.id)
    }));

    await BookModel.insertMany(formattedBooks);
    console.log('Books seeded');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
}

// seedDatabase();
