# Basket-data-model

This is Framework-agnostic Shopping Basket data model.

## How it works

Model is built using producer and consumer concept:

1. Database - Producer
   In memory database that is single source of truth for the whole app
2. Shopping Basket - Consumer
   Consumer that acts as a Facade inteface for Shopping Bakset operations

## How to run

Run the following commands in order.

```bash
git clone https://github.com/zobla-kv/Basket-data-model.git
cd Basket-data-model
cd app
npm install
npm run dev
```
