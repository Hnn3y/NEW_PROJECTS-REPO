name= input("Enter name: ")
income = float(input("Enter income: "))

rent = float(input ("Enter rent: "))
food = float(input("Enter food expense: "))
transport = float(input("Enter transport expense: "))

total_expenses = rent + food + transport
balance= income - total_expenses

print("\n--- Summary ---")
print(f"Name: {name}")
print(f"Total Income: ${income}")
print(f"Total Expenses: ${total_expenses}")
print(f"Remaining Balance: ${balance}")