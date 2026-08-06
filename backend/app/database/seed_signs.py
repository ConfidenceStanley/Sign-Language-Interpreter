import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

signs = [
    {
        "name": "A",
        "category": "Alphabet",
        "description": "The letter A in American Sign Language.",
        "how_to": "Make a fist with your thumb resting on the side of your index finger. Keep all fingers closed tightly.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/a.gif"
    },
    {
        "name": "B",
        "category": "Alphabet",
        "description": "The letter B in American Sign Language.",
        "how_to": "Hold your hand flat with all four fingers pointing up and pressed together. Tuck your thumb across your palm.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/b.gif"
    },
    {
        "name": "C",
        "category": "Alphabet",
        "description": "The letter C in American Sign Language.",
        "how_to": "Curve your fingers and thumb to form the shape of the letter C.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/c.gif"
    },
    {
        "name": "D",
        "category": "Alphabet",
        "description": "The letter D in American Sign Language.",
        "how_to": "Point your index finger straight up. Touch your thumb to your middle, ring, and pinky fingers which are curled down.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/d.gif"
    },
    {
        "name": "E",
        "category": "Alphabet",
        "description": "The letter E in American Sign Language.",
        "how_to": "Curl all four fingers down toward your palm. Place your thumb across the front of your curled fingers.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/e.gif"
    },
    {
        "name": "F",
        "category": "Alphabet",
        "description": "The letter F in American Sign Language.",
        "how_to": "Touch the tip of your index finger to the tip of your thumb. Extend your middle, ring, and pinky fingers straight up.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/f.gif"
    },
    {
        "name": "G",
        "category": "Alphabet",
        "description": "The letter G in American Sign Language.",
        "how_to": "Point your index finger and thumb sideways parallel to each other. Curl your other fingers into your palm.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/g.gif"
    },
    {
        "name": "H",
        "category": "Alphabet",
        "description": "The letter H in American Sign Language.",
        "how_to": "Extend your index and middle fingers together pointing sideways. Curl other fingers and thumb into your palm.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/h.gif"
    },
    {
        "name": "I",
        "category": "Alphabet",
        "description": "The letter I in American Sign Language.",
        "how_to": "Make a fist and extend only your pinky finger straight up.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/i.gif"
    },
    {
        "name": "J",
        "category": "Alphabet",
        "description": "The letter J in American Sign Language.",
        "how_to": "Start with the I handshape then trace the letter J in the air by moving your pinky downward and curving it.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/j.gif"
    },
    {
        "name": "K",
        "category": "Alphabet",
        "description": "The letter K in American Sign Language.",
        "how_to": "Point your index and middle fingers upward in a V shape. Place your thumb between them touching your middle finger.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/k.gif"
    },
    {
        "name": "L",
        "category": "Alphabet",
        "description": "The letter L in American Sign Language.",
        "how_to": "Extend your index finger pointing up and your thumb pointing sideways to form an L shape.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/l.gif"
    },
    {
        "name": "M",
        "category": "Alphabet",
        "description": "The letter M in American Sign Language.",
        "how_to": "Place your thumb under your first three fingers which are draped over the thumb.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/m.gif"
    },
    {
        "name": "N",
        "category": "Alphabet",
        "description": "The letter N in American Sign Language.",
        "how_to": "Place your thumb under your first two fingers which are draped over the thumb.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/n.gif"
    },
    {
        "name": "O",
        "category": "Alphabet",
        "description": "The letter O in American Sign Language.",
        "how_to": "Curve all your fingers and thumb to touch at the tips forming a round O shape.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/o.gif"
    },
    {
        "name": "P",
        "category": "Alphabet",
        "description": "The letter P in American Sign Language.",
        "how_to": "Make the K handshape but point it downward.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/p.gif"
    },
    {
        "name": "Q",
        "category": "Alphabet",
        "description": "The letter Q in American Sign Language.",
        "how_to": "Make the G handshape but point it downward.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/q.gif"
    },
    {
        "name": "R",
        "category": "Alphabet",
        "description": "The letter R in American Sign Language.",
        "how_to": "Cross your index finger over your middle finger pointing upward.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/r.gif"
    },
    {
        "name": "S",
        "category": "Alphabet",
        "description": "The letter S in American Sign Language.",
        "how_to": "Make a fist with your thumb placed over the front of your curled fingers.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/s.gif"
    },
    {
        "name": "T",
        "category": "Alphabet",
        "description": "The letter T in American Sign Language.",
        "how_to": "Make a fist and place your thumb between your index and middle fingers.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/t.gif"
    },
    {
        "name": "U",
        "category": "Alphabet",
        "description": "The letter U in American Sign Language.",
        "how_to": "Extend your index and middle fingers together pointing upward pressed side by side.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/u.gif"
    },
    {
        "name": "V",
        "category": "Alphabet",
        "description": "The letter V in American Sign Language.",
        "how_to": "Extend your index and middle fingers upward spread apart in a V shape.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/v.gif"
    },
    {
        "name": "W",
        "category": "Alphabet",
        "description": "The letter W in American Sign Language.",
        "how_to": "Extend your index, middle, and ring fingers upward spread apart.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/w.gif"
    },
    {
        "name": "X",
        "category": "Alphabet",
        "description": "The letter X in American Sign Language.",
        "how_to": "Make a fist and bend your index finger into a hook shape.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/x.gif"
    },
    {
        "name": "Y",
        "category": "Alphabet",
        "description": "The letter Y in American Sign Language.",
        "how_to": "Extend your thumb and pinky finger outward while curling your index, middle, and ring fingers down.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/y.gif"
    },
    {
        "name": "Z",
        "category": "Alphabet",
        "description": "The letter Z in American Sign Language.",
        "how_to": "Point your index finger forward and trace the letter Z in the air.",
        "image_url": "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/z.gif"
    },
    {
        "name": "Hello",
        "category": "Greetings",
        "description": "The sign for Hello in American Sign Language.",
        "how_to": "Place your open hand near your forehead with your palm facing outward. Move your hand away from your forehead in a small wave motion.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/hello.jpg"
    },
    {
        "name": "Thank You",
        "category": "Greetings",
        "description": "The sign for Thank You in American Sign Language.",
        "how_to": "Touch your chin with the fingertips of your flat hand. Move your hand forward and slightly downward away from your face.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/thank-you.jpg"
    },
    {
        "name": "Please",
        "category": "Common Phrases",
        "description": "The sign for Please in American Sign Language.",
        "how_to": "Place your flat open hand on your chest and move it in a circular motion.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/please.jpg"
    },
    {
        "name": "Sorry",
        "category": "Common Phrases",
        "description": "The sign for Sorry in American Sign Language.",
        "how_to": "Make a fist with your dominant hand and place it on your chest. Rub it in a circular motion.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/sorry.jpg"
    },
    {
        "name": "Yes",
        "category": "Common Phrases",
        "description": "The sign for Yes in American Sign Language.",
        "how_to": "Make a fist and nod it up and down at the wrist as if your hand is nodding yes.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/yes.jpg"
    },
    {
        "name": "No",
        "category": "Common Phrases",
        "description": "The sign for No in American Sign Language.",
        "how_to": "Extend your index and middle fingers together. Snap them down to meet your thumb in a quick pinching motion.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/no.jpg"
    },
    {
        "name": "Help",
        "category": "Common Phrases",
        "description": "The sign for Help in American Sign Language.",
        "how_to": "Place your flat non dominant hand palm up. Make a thumbs up with your dominant hand and place it on the open palm. Lift both hands together upward.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/help.jpg"
    },
    {
        "name": "I Love You",
        "category": "Common Phrases",
        "description": "The sign for I Love You in American Sign Language.",
        "how_to": "Extend your thumb, index finger, and pinky finger while keeping your middle and ring fingers down.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/i-love-you.jpg"
    },
    {
        "name": "Good Morning",
        "category": "Greetings",
        "description": "The sign for Good Morning in American Sign Language.",
        "how_to": "Sign Good by touching your chin with your flat hand and moving it forward. Then sign Morning by raising your dominant forearm like a rising sun.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/good-morning.jpg"
    },
    {
        "name": "Goodbye",
        "category": "Greetings",
        "description": "The sign for Goodbye in American Sign Language.",
        "how_to": "Open your hand with your palm facing outward. Fold your fingers down and up repeatedly in a waving motion.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/goodbye.jpg"
    },
    {
        "name": "Water",
        "category": "Common Words",
        "description": "The sign for Water in American Sign Language.",
        "how_to": "Make a W handshape with three fingers extended. Tap the side of your mouth with your index finger twice.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/water.jpg"
    },
    {
        "name": "Food",
        "category": "Common Words",
        "description": "The sign for Food or Eat in American Sign Language.",
        "how_to": "Bring your flattened O hand to your mouth as if putting food in. Tap your lips a couple of times.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/food.jpg"
    },
    {
        "name": "Family",
        "category": "Common Words",
        "description": "The sign for Family in American Sign Language.",
        "how_to": "Make an F handshape with both hands. Move them in a circle away from each other until the pinkies touch.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/family.jpg"
    },
    {
        "name": "Friend",
        "category": "Common Words",
        "description": "The sign for Friend in American Sign Language.",
        "how_to": "Lock your index fingers together with one on top then reverse and lock them with the other on top.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/friend.jpg"
    },
    {
        "name": "School",
        "category": "Common Words",
        "description": "The sign for School in American Sign Language.",
        "how_to": "Clap your hands together twice as if a teacher is clapping to get attention.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/school.jpg"
    },
    {
        "name": "Home",
        "category": "Common Words",
        "description": "The sign for Home in American Sign Language.",
        "how_to": "Touch the tips of your fingers to the side of your chin then move your hand up near your ear and touch again.",
        "image_url": "https://media.signbsl.com/videos/asl/startasl/img/home.jpg"
    },
]


async def seed():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB_NAME]

    count = await db.signs.count_documents({})
    if count > 0:
        print(f"Dropping existing signs and reseeding...")
        await db.signs.drop()

    result = await db.signs.insert_many(signs)
    print(f"Seeded {len(result.inserted_ids)} signs successfully.")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())