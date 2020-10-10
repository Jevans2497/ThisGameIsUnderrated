#Just needed some way to get the list from my phone to a javascript ready line of code
list = """[  ] Pirates
[  ] Iced Tea
[  ] The Office
[  ] First Few Minutes of Waking Up
[  ] Whisky
[  ] Mohawks
[  ] Kanye
[  ] Quarantine
[  ] Spanish
[  ] Winter
[  ] Mint ice cream
[  ] Six Pack Abs
[  ] The Moon
[  ] Books you Read in Highschool
[  ] The Number 13
[  ] Smoothies
[  ] Finding Nemo
[  ] Disney World
[  ] Movie Theatres
[  ] Subway
[  ] Tom Hanks
[  ] New York
[  ] Ghost stories
[  ] Campfires
[  ] Foosball
[  ] Sunrise
[  ] Facebook
[  ] The 7 Deadly Sins
[  ] The Olympics
[  ] Scavenger Hunts
[  ] John Mulaney
[  ] Italy
[  ] Thanksgiving
[  ] Dinosaurs
[  ] Youtube
[  ] French kissing
[  ] Friends (TV show)
[  ] Purple
[  ] Cupcakes
[  ] Plastic Surgery
[  ] Harry Potter
[  ] Air Travel
[  ] Road Trips
[  ] Chex Mix
[  ] Punk Music
[  ] Yoga
[  ] Star Wars
[  ] Harvard
[  ] Horseback Riding
[  ] Turtlenecks
[  ] Apple (company)
[  ] Hot Dogs
[  ] Mirrors
[  ] Trail Mix
[  ] Pigeons
[  ] Pokemon
[  ] Marvel Movies
[  ] Gatorade
[  ] Frozen pizza
[  ] The Beatles
[  ] The name "Katie"
[  ] The Constitution
[  ] IKEA
[  ] Lighthouses
[  ] Live Music
[  ] Love
[  ] The Beach
[  ] Top Hats
[  ] Gravy
[  ] Johnny Appleseed
[  ] Going as a Cat for Halloween
[  ] Times New Roman
[  ] Bears
[  ] Beets
[  ] SNL
[  ] Optical Illusions
[  ] Kaleidescopes
[  ] Baseball
[  ] Mayonnaise
[  ] Monopoly
[  ] Marijuana
[  ] Mosquitos
[  ] Silver
[  ] Jeopardy
[  ] August
[  ] The Macarena
[  ] Cruises
[  ] The Search for Big Foot
[  ] The Bachelor
[  ] Cards Against Humanity
[  ] Costco
[  ] Taco Bell
[  ] Blue Eyes
[  ] Haircuts
[  ] Trampolines
[  ] Skiing / Snowboarding
[  ] Jupiter
[  ] Emojis
[  ] The 1990's
[  ] Britney Spears
[  ] Exploring Space
[  ] Elon Musk
[  ] Overalls
[  ] Jean Shorts
[  ] Constellations
[  ] Canada
[  ] Ballet
[  ] Oatmeal Raisin Cookies
[  ] Peanut Butter
[  ] Julius Caesar
[  ] Owning a Home
[  ] Feudalism
[  ] Proper Grammar.
[  ] Time Travel
[  ] Mullets
[  ] Werewolves
[  ] Highschool
[  ] College
[  ] Balconies
[  ] Pharmaceutical Drug Commercials
[  ] Indian Curry
[  ] Ketchup
[  ] Classical Music
[  ] Hawaii
[  ] Crying
[  ] Axe Body Spray
[  ] Sleeping on a Couch
[  ] Rain
[  ] Marriage
[  ] Mouthwash
[  ] Camp Songs
[  ] Trap Music
[  ] Lebron James
[  ] The Word "Bro"
[  ] Soccer
[  ] Calling Soccer "Futbol"
[  ] Snoop Dogg
[  ] Hard Seltzer
[  ] Roundabouts (Driving)
[  ] Minecraft
[  ] Participation Trophies
[  ] Polaroid Cameras
[  ] Microwave Meals
[  ] Asparagus
[  ] Breaking Bad
[  ] Dating Apps
[  ] Borat
[  ] Karate
[  ] The Japanese Flag
[  ] Meaningless Tattoos
[  ] Staring Contests
[  ] Shark Tooth Necklaces
[  ] Rock Paper Scissors
[  ] Sparknotes
[  ] Bumper Stickers
[  ] Truck Stops
[  ] Watches
[  ] Flip Flops
[  ] Vice Presidents
[  ] Slinkys
[  ] Wildlife
[  ] Electric Cars
[  ] Podcasts
[  ] Kayaking
[  ] Spoons
[  ] Inspirational Quotes
[  ] Coasters
[  ] Roller Coasters
[  ] Volcanoes
[  ] Art Museums
[  ] Fairy Tales
[  ] Pepsi
[  ] Vinyl
[  ] Candles
[  ] Hamilton
[  ] Hummus
[  ] Ping Pong
[  ] Billiards
[  ] Chess
[  ] Cheese
[  ] Guitar Hero
[  ] Snapchat Filters
[  ] Music Festivals
[  ] Thrift Stores
[  ] Waffles
[  ] Pancakes
[  ] Running a Marathon
[  ] Coffee
[  ] The American Midwest
[  ] Gardening
[  ] Archery
[  ] Swimming in a Lake
[  ] Hard-Cover Books
[  ] Llamas
[  ] Lord of the Rings
[  ] Improv Comedy
[  ] American Idol
[  ] Bowling
[  ] Taking a Bath
[  ] Twitter
[  ] Babies
[  ] Graduation Ceremonies
[  ] Car Commercials
[  ] AC/DC
[  ] Reading
[  ] Jogging
[  ] Social Media
[  ] Cats
[  ] Dogs
[  ] Pet Fish
[  ] Zoos
[  ] Aquariums
[  ] Amusement parks
[  ] Toast
[  ] Rye Bread
[  ] Breakfast Cereal
[  ] Bottled Water
[  ] Pulling an All-Nighter
[  ] Vegetables
[  ] Fruits
[  ] Carrots
[  ] Onions
[  ] Tomatoes
[  ] Bananas
[  ] Pineapples
[  ] Apples
[  ] Pears
[  ] Cucumbers
[  ] Hotels
[  ] Birthdays
[  ] Colored Pencils
[  ] Watching TV
[  ] Alcohol
[  ] Sleeping
[  ] Refrigerators
[  ] Water Parks
[  ] Computers
[  ] Headphones
[  ] Swimming Pools
[  ] Hiking
[  ] Saran Wrap
[  ] Forks
[  ] The Sun
[  ] The Moon"""

splitList = list.split("[  ]")
strippedList = map(str.strip, splitList)
joinedList = '\', \''.join(strippedList)
print(joinedList)

