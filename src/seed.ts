import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Leader from './models/Leader';

dotenv.config();

const leaders = [
  {
    name: 'Raghav Chadha',
    description: 'Young MP (AAP), articulate face of youth in politics',
    imageUrl: 'https://epic.uchicago.edu/wp-content/uploads/sites/5/2025/01/1638647506_raghav-chadha.jpg',
  },
  {
    name: 'Sachin Pilot',
    description: 'Senior Congress leader',
    imageUrl: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/12/pilot1-1545029631.jpg',
  },
  {
    name: 'Tejasvi Surya',
    description: 'BJP MP, President of Bharatiya Janata Yuva Morcha',
    imageUrl: 'https://pbs.twimg.com/profile_images/1826819616355856384/0UyEk-zl_400x400.jpg',
  },
  {
    name: 'Aaditya Thackeray',
    description: 'Shiv Sena (UBT) leader, ex-minister in Maharashtra',
    imageUrl: 'https://images.mid-day.com/images/images/2025/jan/aaditya-thackeray-file_d_d.jpg',
  },
  {
    name: 'Kanhaiya Kumar',
    description: 'Former JNUSU President, now Congress leader; vocal on youth & student issues.',
    imageUrl: 'https://static.toiimg.com/thumb/msid-122106578,imgsize-1055161,width-400,resizemode-4/122106578.jpg',
  },
  {
    name: 'Hardik Patel',
    description: 'Patidar agitation leader, now active in politics; known for youth mobilization',
    imageUrl: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/04/hardikpatel-1650627109.jpg',
  },
  {
    name: 'Chinmayi Sripada',
    description: 'Singer & activist; #MeToo voice in India.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Chinmayi_Sripada_at_film_fare_festival_for_winning_96s_best_singer_of_the_year_2018_(cropped).jpg/250px-Chinmayi_Sripada_at_film_fare_festival_for_winning_96s_best_singer_of_the_year_2018_(cropped).jpg',
  },
  {
    name: 'Trisha Shetty',
    description: 'Gender equality activist, founder of SheSays; Forbes 30 under 30.',
    imageUrl: 'https://femina.wwmindia.com/content/2021/aug/gendertrishashettybcclinsta-21629219706.jpg',
  },
  {
    name: 'Ridhima Pandey',
    description: 'Climate activist, dubbed “India’s Greta Thunberg”',
    imageUrl: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201912/IMG20190920124909_-_Copy.jpeg',
  },
  {
    name: 'Sonu Sood',
    description: 'Actor-turned-humanitarian, became a youth icon for COVID relief work.',
    imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/1656656216-Myproject42.jpg',
  },
];

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

const seedDB = async () => {
  await mongoose.connect(mongoUri);
  await Leader.deleteMany({});
  await Leader.insertMany(leaders);
  await mongoose.connection.close();
  console.log('Database seeded!');
};

seedDB();
