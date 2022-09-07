first = input("Please enter a string: ")
length = len(first)

if length > 2:
    print(first[0:2] + first[-2:])
else:
    print("Your string is too short!")