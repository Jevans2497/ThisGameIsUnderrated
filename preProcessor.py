#Just needed some way to get the list from my phone to a javascript ready line of code
wordList = """[  ] Pirates
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
[  ] The name Katie
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
[  ] The 1990s
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
[  ] The Word Bro
[  ] Soccer
[  ] Calling Soccer Futbol
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
[  ] The Moon
[  ] Trick or Treating
[  ] Febreeze
[  ] Motorcycles
[  ] Tacos
[  ] Vitamins
[  ] Starbucks
[  ] Jazz
[  ] Single-use Plastics
[  ] Crossing the Country in an RV
[  ] Greek Mythology
[  ] Nascar
[  ] Roses
[  ] Shakespeare
[  ] Hide and Seek
[  ] Popcorn
[  ] Craft Beer
[  ] Fishing
[  ] Love Seat
[  ] Donuts
[  ] The Grateful Dead
[  ] Corn
[  ] Deep Dish Pizza
[  ] Sequels
[  ] The Internet
[  ] Tennis
[  ] The Eiffel Tower
[  ] The Statue of Liberty
[  ] Fraternities and Sororities
[  ] Nickelback
[  ] Dreams
[  ] Jewelry
[  ] Pumpkin Spice
[  ] Antique Shops
[  ] Fanny Packs
[  ] Summer
[  ] Autumn
[  ] Spring
[  ] Yellow Gatorade
[  ] Red Gatorade
[  ] Tylenol
[  ] Salmon
[  ] The Grand Canyon
[  ] Hot Tubs
[  ] The Only Thing We Have to Fear is Fear Itself
[  ] George Washington
[  ] Spiders
[  ] Umbrellas
[  ] Carving Pumpkins
[  ] Perseverance
[  ] Giraffes
[  ] Courage
[  ] Brunch
[  ] Breakfast
[  ] Memes
[  ] Uber/Lyft
[  ] Shrek
[  ] Aviator Sunglasses
[  ] Sailing
[  ] Magic Tricks
[  ] Roller Blading
[  ] Ice Skating
[  ] Coconut Water
[  ] Dr. Suess Books
[  ] Vampire Weekend
[  ] Mini Golf
[  ] Getting a Drivers License
[  ] Southern Accents
[  ] Mr. Brightside
[  ] Shel Silverstein
[  ] Poetry
[  ] Curse Words
[  ] Pig Latin
[  ] British Accents
[  ] Glow in the Dark Star Stickers
[  ] Moving to a New City
[  ] Christmas Music
[  ] Reality TV
[  ] Garage Sales
[  ] Ripped Jeans
[  ] Ventriloquism
[  ] Mustaches
[  ] Pretzel Buns
[  ] Craigslist
[  ] Moon Bounces
[  ] Birthday Cake
[  ] Veggie Burgers
[  ] Indian Food
[  ] Money
[  ] Ice Cream
[  ] Dippin Dots
[  ] Will Ferrell Movies
[  ] Groundhogs Day
[  ] Making Your Bed
[  ] Bug Spray
[  ] Sumo Wrestling
[  ] James Bond
[  ] Penguins
[  ] Dolphins
[  ] Quentin Tarantino Films
[  ] Wes Anderson Films
[  ] Bumble Bees
[  ] The Simpsons
[  ] Succulents
[  ] The Lion King
[  ] LEGO
[  ] Vanity Plates
[  ] The Sky
[  ] Cotton Eye Joe
[  ] Ghosts
[  ] Vampires
[  ] Vanilla
[  ] Chocolate
[  ] Smores
[  ] Getting Dressed Up
[  ] July 4th
[  ] Survivor
[  ] Flannels
[  ] Cowboys
[  ] Corgis
[  ] The Wild West
[  ] Beards
[  ] Chipotle
[  ] Lime
[  ] Violins
[  ] Islands
[  ] World Peace
[  ] Guinness Book of Records
[  ] Taco Tuesday
[  ] Thursdays
[  ] Cheerleading
[  ] Theatre
[  ] Musical Theatre
[  ] Brownies
[  ] Philosophy
[  ] Rings
[  ] Pedicures
[  ] Competition
[  ] Toy Story
[  ] Rubiks Cube
[  ] Dr. Pepper
[  ] Australian Accents
[  ] First Dates
[  ] Calendars
[  ] Airplane Food
[  ] Going to Mars
[  ] Pluto
[  ] Texting
[  ] Treadmills
[  ] Making Plans
[  ] Fire
[  ] Creativity
[  ] The Dictionary
[  ] GIFs
[  ] Dessert
[  ] Corndogs
[  ] Zoom"""

nsfwList = """[  ] French kissing
[  ] The Constitution
[  ] Marijuana
[  ] Vice Presidents
[  ] Abraham Lincoln
[  ] George W. Bush
[  ] Edward Snowden"""

splitList = wordList.split("[  ]")
strippedList = map(str.strip, splitList)
# joinedList = '\', \''.join(strippedList)
# print(joinedList)
for word in strippedList:
	print(word)

