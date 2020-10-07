#Just needed some way to get the list from my phone to a javascript ready line of code

list = """[  ] Pirates
[  ] Iced tea
[  ] The office
[  ] First few minutes of waking up
[  ] Whisky
[  ] Mohawks
[  ] Kanye
[  ] Quarantine
[  ] Spanish
[  ] Winter
[  ] Mint ice cream
[  ] Six pack abs
[  ] The moon
[  ] Books you read in highschool
[  ] The number 7
[  ] Smoothies
[  ] Finding Nemo
[  ] Disney world
[  ] Movie theatres
[  ] Subway
[  ] Tom Hanks
[  ] New York
[  ] Ghost stories
[  ] Campfires
[  ] Foosball
[  ] Sunrise
[  ] Facebook
[  ] The seven deadly sins
[  ] The Olympics
[  ] Scavenger hunts
[  ] John Mulaney
[  ] Italy
[  ] Thanksgiving
[  ] Dinosaurs
[  ] Youtube
[  ] French kissing
[  ] Friends (TV show)
[  ] Purple
[  ] Cupcakes
[  ] Plastic surgery
[  ] Harry Potter
[  ] Air travel
[  ] Road trips
[  ] Chex mix
[  ] Punk music
[  ] Yoga
[  ] Star wars
[  ] Harvard
[  ] Horseback riding
[  ] Turtlenecks
[  ] Apple (company)
[  ] Hot dogs
[  ] Mirrors
[  ] Trail mix
[  ] Pigeons
[  ] Pokemon
[  ] Marvel movies
[  ] Gatorade
[  ] Frozen pizza"""

splitList = list.split("[  ]")
strippedList = map(str.strip, splitList)
joinedList = '\', \''.join(strippedList)
print(joinedList)


