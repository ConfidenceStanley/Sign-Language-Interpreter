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
        "image_url": "/signs/a.png"
    },
    {
        "name": "B",
        "category": "Alphabet",
        "description": "The letter B in American Sign Language.",
        "how_to": "Hold your hand flat with all four fingers pointing up and pressed together. Tuck your thumb across your palm.",
        "image_url": "/signs/b.png"
    },
    {
        "name": "C",
        "category": "Alphabet",
        "description": "The letter C in American Sign Language.",
        "how_to": "Curve your fingers and thumb to form the shape of the letter C. Keep your hand relaxed and open.",
        "image_url": "/signs/c.png"
    },
    {
        "name": "D",
        "category": "Alphabet",
        "description": "The letter D in American Sign Language.",
        "how_to": "Point your index finger straight up. Touch your thumb to your middle finger, ring finger, and pinky which are curled down.",
        "image_url": "/signs/d.png"
    },
    {
        "name": "E",
        "category": "Alphabet",
        "description": "The letter E in American Sign Language.",
        "how_to": "Curl all four fingers down toward your palm. Place your thumb across the front of your curled fingers.",
        "image_url": "/signs/e.png"
    },
    {
        "name": "F",
        "category": "Alphabet",
        "description": "The letter F in American Sign Language.",
        "how_to": "Touch the tip of your index finger to the tip of your thumb forming a circle. Extend your middle, ring, and pinky fingers straight up.",
        "image_url": "/signs/f.png"
    },
    {
        "name": "G",
        "category": "Alphabet",
        "description": "The letter G in American Sign Language.",
        "how_to": "Point your index finger and thumb sideways parallel to each other. Curl your other fingers into your palm.",
        "image_url": "/signs/g.png"
    },
    {
        "name": "H",
        "category": "Alphabet",
        "description": "The letter H in American Sign Language.",
        "how_to": "Extend your index and middle fingers together pointing sideways. Curl your other fingers and thumb into your palm.",
        "image_url": "/signs/h.png"
    },
    {
        "name": "I",
        "category": "Alphabet",
        "description": "The letter I in American Sign Language.",
        "how_to": "Make a fist and extend only your pinky finger straight up. Keep your thumb across your other fingers.",
        "image_url": "/signs/i.png"
    },
    {
        "name": "J",
        "category": "Alphabet",
        "description": "The letter J in American Sign Language.",
        "how_to": "Start with the I handshape with your pinky extended. Trace the letter J in the air by moving your pinky downward and curving it.",
        "image_url": "/signs/j.png"
    },
    {
        "name": "K",
        "category": "Alphabet",
        "description": "The letter K in American Sign Language.",
        "how_to": "Point your index and middle fingers upward in a V shape. Place your thumb between them touching your middle finger.",
        "image_url": "/signs/k.png"
    },
    {
        "name": "L",
        "category": "Alphabet",
        "description": "The letter L in American Sign Language.",
        "how_to": "Extend your index finger pointing up and your thumb pointing sideways to form an L shape. Curl other fingers down.",
        "image_url": "/signs/l.png"
    },
    {
        "name": "M",
        "category": "Alphabet",
        "description": "The letter M in American Sign Language.",
        "how_to": "Place your thumb under your first three fingers which are draped over the thumb. Your pinky stays tucked in.",
        "image_url": "/signs/m.png"
    },
    {
        "name": "N",
        "category": "Alphabet",
        "description": "The letter N in American Sign Language.",
        "how_to": "Place your thumb under your first two fingers which are draped over the thumb. Ring finger and pinky stay tucked in.",
        "image_url": "/signs/n.png"
    },
    {
        "name": "O",
        "category": "Alphabet",
        "description": "The letter O in American Sign Language.",
        "how_to": "Curve all your fingers and thumb to touch at the tips forming a round O shape.",
        "image_url": "/signs/o.png"
    },
    {
        "name": "P",
        "category": "Alphabet",
        "description": "The letter P in American Sign Language.",
        "how_to": "Make the K handshape but point it downward. Your index and middle finger point down with thumb between them.",
        "image_url": "/signs/p.png"
    },
    {
        "name": "Q",
        "category": "Alphabet",
        "description": "The letter Q in American Sign Language.",
        "how_to": "Make the G handshape but point it downward. Your index finger and thumb point down parallel to each other.",
        "image_url": "/signs/q.png"
    },
    {
        "name": "R",
        "category": "Alphabet",
        "description": "The letter R in American Sign Language.",
        "how_to": "Cross your index finger over your middle finger pointing upward. Curl your other fingers and thumb down.",
        "image_url": "/signs/r.png"
    },
    {
        "name": "S",
        "category": "Alphabet",
        "description": "The letter S in American Sign Language.",
        "how_to": "Make a fist with your thumb placed over the front of your curled fingers.",
        "image_url": "/signs/s.png"
    },
    {
        "name": "T",
        "category": "Alphabet",
        "description": "The letter T in American Sign Language.",
        "how_to": "Make a fist and place your thumb between your index and middle fingers.",
        "image_url": "/signs/t.png"
    },
    {
        "name": "U",
        "category": "Alphabet",
        "description": "The letter U in American Sign Language.",
        "how_to": "Extend your index and middle fingers together pointing upward pressed side by side. Curl other fingers and tuck your thumb.",
        "image_url": "/signs/u.png"
    },
    {
        "name": "V",
        "category": "Alphabet",
        "description": "The letter V in American Sign Language.",
        "how_to": "Extend your index and middle fingers upward spread apart in a V shape. Curl other fingers and tuck your thumb.",
        "image_url": "/signs/v.png"
    },
    {
        "name": "W",
        "category": "Alphabet",
        "description": "The letter W in American Sign Language.",
        "how_to": "Extend your index, middle, and ring fingers upward spread apart. Tuck your pinky under your thumb.",
        "image_url": "/signs/w.png"
    },
    {
        "name": "X",
        "category": "Alphabet",
        "description": "The letter X in American Sign Language.",
        "how_to": "Make a fist and bend your index finger into a hook shape. Keep all other fingers and thumb closed.",
        "image_url": "/signs/x.png"
    },
    {
        "name": "Y",
        "category": "Alphabet",
        "description": "The letter Y in American Sign Language.",
        "how_to": "Extend your thumb and pinky finger outward while curling your index, middle, and ring fingers down.",
        "image_url": "/signs/y.png"
    },
    {
        "name": "Z",
        "category": "Alphabet",
        "description": "The letter Z in American Sign Language.",
        "how_to": "Point your index finger forward and trace the letter Z in the air. Move right, then diagonally down left, then right again.",
        "image_url": "/signs/z.png"
    },
    {
        "name": "Hello",
        "category": "Greetings",
        "description": "The sign for Hello in American Sign Language.",
        "how_to": "Place your open hand near your forehead with your palm facing outward. Move your hand away from your forehead in a small wave motion.",
        "image_url": "/signs/hello.png"
    },
    {
        "name": "Thank You",
        "category": "Greetings",
        "description": "The sign for Thank You in American Sign Language.",
        "how_to": "Touch your chin or lips with the fingertips of your flat hand. Move your hand forward and slightly downward away from your face.",
        "image_url": "/signs/thank_you.png"
    },
    {
        "name": "Please",
        "category": "Common Phrases",
        "description": "The sign for Please in American Sign Language.",
        "how_to": "Place your flat open hand on your chest. Move your hand in a circular motion on your chest.",
        "image_url": "/signs/please.png"
    },
    {
        "name": "Sorry",
        "category": "Common Phrases",
        "description": "The sign for Sorry in American Sign Language.",
        "how_to": "Make a fist with your dominant hand and place it on your chest. Rub it in a circular motion.",
        "image_url": "/signs/sorry.png"
    },
    {
        "name": "Yes",
        "category": "Common Phrases",
        "description": "The sign for Yes in American Sign Language.",
        "how_to": "Make a fist and nod it up and down at the wrist as if your hand is nodding yes.",
        "image_url": "/signs/yes.png"
    },
    {
        "name": "No",
        "category": "Common Phrases",
        "description": "The sign for No in American Sign Language.",
        "how_to": "Extend your index and middle fingers together. Snap them down to meet your thumb in a quick pinching motion.",
        "image_url": "/signs/no.png"
    },
    {
        "name": "Help",
        "category": "Common Phrases",
        "description": "The sign for Help in American Sign Language.",
        "how_to": "Place your flat non dominant hand palm up. Make a thumbs up with your dominant hand and place it on the open palm. Lift both hands together upward.",
        "image_url": "/signs/help.png"
    },
    {
        "name": "I Love You",
        "category": "Common Phrases",
        "description": "The sign for I Love You in American Sign Language.",
        "how_to": "Extend your thumb, index finger, and pinky finger while keeping your middle and ring fingers down. Hold your hand up facing outward.",
        "image_url": "/signs/i_love_you.png"
    },
    {
        "name": "Good Morning",
        "category": "Greetings",
        "description": "The sign for Good Morning in American Sign Language.",
        "how_to": "Sign Good by touching your chin with your flat hand and moving it forward. Then sign Morning by placing your non dominant arm flat and raising your dominant hand above it like a rising sun.",
        "image_url": "/signs/good_morning.png"
    },
    {
        "name": "Goodbye",
        "category": "Greetings",
        "description": "The sign for Goodbye in American Sign Language.",
        "how_to": "Open your hand with your palm facing outward. Fold your fingers down and up repeatedly as in a waving goodbye motion.",
        "image_url": "/signs/goodbye.png"
    },
    {
        "name": "Water",
        "category": "Common Words",
        "description": "The sign for Water in American Sign Language.",
        "how_to": "Make a W handshape with three fingers extended. Tap your chin or the side of your mouth with your index finger twice.",
        "image_url": "/signs/water.png"
    },
    {
        "name": "Food",
        "category": "Common Words",
        "description": "The sign for Food or Eat in American Sign Language.",
        "how_to": "Bring your flattened O hand to your mouth as if you are putting food in your mouth. Tap your lips a couple of times.",
        "image_url": "/signs/food.png"
    },
    {
        "name": "Family",
        "category": "Common Words",
        "description": "The sign for Family in American Sign Language.",
        "how_to": "Make an F handshape with both hands in front of you. Move them in a circle away from each other until the pinkies touch forming a complete circle.",
        "image_url": "/signs/family.png"
    },
    {
        "name": "Friend",
        "category": "Common Words",
        "description": "The sign for Friend in American Sign Language.",
        "how_to": "Lock your index fingers together with one on top. Then reverse and lock them with the other on top.",
        "image_url": "/signs/friend.png"
    },
    {
        "name": "School",
        "category": "Common Words",
        "description": "The sign for School in American Sign Language.",
        "how_to": "Clap your hands together twice as if a teacher is clapping to get attention.",
        "image_url": "/signs/school.png"
    },
    {
        "name": "Home",
        "category": "Common Words",
        "description": "The sign for Home in American Sign Language.",
        "how_to": "Touch the tips of your fingers on your flattened O hand to the side of your chin. Move your hand up to near your ear and touch again.",
        "image_url": "/signs/home.png"
    },
]


async def seed():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB_NAME]

    count = await db.signs.count_documents({})
    if count > 0:
        print(f"Signs collection already has {count} documents. Skipping seed.")
        client.close()
        return

    result = await db.signs.insert_many(signs)
    print(f"Seeded {len(result.inserted_ids)} signs into the database.")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())