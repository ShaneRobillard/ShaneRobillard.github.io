from typing import Counter

first = {'a':100, 'b':200,'c':300}
second = {'a': 300, 'b': 200, 'd': 400}

combined = Counter(first) + Counter(second)
print(combined)