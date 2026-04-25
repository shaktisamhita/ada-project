#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int id;
    string name;
    float price;
};

int main() {
    vector<Item> items = {
        {101, "Milk", 50},
        {102, "Bread", 25},
        {103, "Eggs", 60},
        {104, "Butter", 42}
    };

    sort(items.begin(), items.end(), [](Item a, Item b) {
        if (a.price == b.price)
            return a.name < b.name;
        return a.price < b.price;
    });

    for (auto &i : items) {
        cout << i.name << " ₹" << i.price << endl;
    }

    return 0;
}
