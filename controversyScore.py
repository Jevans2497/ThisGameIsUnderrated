def determineScore(wordData):
	underratedCount, properlyratedCount, overratedCount = wordData[0], wordData[1], wordData[2]
	total = underratedCount + properlyratedCount + overratedCount

	# Get the percentage for each of the three options
	percentages = map(lambda x: float(x) / total, [underratedCount, properlyratedCount, overratedCount])

	# Get the difference between all possible combinations
	difference1 = abs(percentages[0] - percentages[1])
	difference2 = abs(percentages[0] - percentages[2])
	difference3 = abs(percentages[1] - percentages[2])

	# Sum the total difference between them and divide by 2 so it's between 0 and 1. 
	finalScore =  1 - (difference1 + difference2 + difference3) / 2
	return finalScore

# TESTS
# print(determineScore([3, 3, 3]) == 1.0) # Maximum controversy
# print(determineScore([2, 3, 3]) == 0.875) # Highly controversial
# print(determineScore([2, 5, 3]) == 0.7) # Somewhat controversial
# print(determineScore([1, 4, 1]) == 0.5) # Medium
# print(determineScore([1, 10, 1]) == 0.25) # Somewhat lower controversy
# print(determineScore([1, 0, 0]) == 0.0) # No controversy

print(determineScore([74, 113, 23]))