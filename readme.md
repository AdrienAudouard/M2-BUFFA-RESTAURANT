# TP Restaurant

## Avant tout 

Lancer les commandes:
```
cd front && npm install
cd ..
cd server && npm install
```

### Lancer le projet

Pour lancer le projet il faut lancer 3 terminaux

### Terminal 1

```
mongod
```

### Terminal 2

```
cd server && node serverCrudWithMongo
```

### Terminal 3

```
cd front && npm start
```
## Problème MONGODB MACOS 10.15

Si des problèmes de droits apparaissent au lancement de mongod sur macOS 10.15, lancer la commande:
```
mongod --dbpath /Users/adrien/db-mongo
