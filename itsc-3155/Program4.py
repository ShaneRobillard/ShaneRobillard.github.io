itemlist = []
number_items = int(input("Number of Items: "))

for x in range(0,number_items):
    item_type = input("Input item and price: ")
    itemprice = item_type.split(' ')
    itemlist.append(itemprice)
    
for i in range(number_items -1):
    for j in range(number_items - i - 1):
        if(itemlist[j][1] > itemlist[j+1][1]):
            temp = itemlist[j]
            itemlist[j] = itemlist[j+1]
            itemlist[j+1] = temp

print(itemlist)