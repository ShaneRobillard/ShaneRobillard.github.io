start_num = input("What is your starting number: ")
end_num = input("What is your ending number: ")

for num in range(int(start_num), int(end_num)):
    if (num%7 == 0) and (num%5 != 0):
        print(num,",",end = " ")