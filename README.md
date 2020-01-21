


DEPLOIEMENT QUORUM

1.téléchargement quorum

$ git clone https://github.com/jpmorganchase/quorum.git
$ cd quorum
$ make all
$ export PATH=$(pwd)/build/bin:$PATH

2. démarer les noeuds tessera
Dans le répertoire du projet:
cd node-1 
copier la commande java -jar ~/path/to/tessera.jar -configfile config.json >> tessera.log 2>&1 &
demarer les 2 autres noeuds avec la meme commande dans leurs répertoires respectifs
cd ../node-2 java -jar ~/path/to/tessera.jar -configfile config.json >> tessera.log 2>&1 &
cd ../node-3 java -jar ~/path/to/tessera.jar -configfile config.json >> tessera.log 2>&1 &

3. démarer les noeuds quorum
cd network
exécuter les scripts de démarage des noeuds 

./startnode1.sh
./startnode2.sh
./startnode3.sh

## Available Scripts

Dans le répertoire du projet:

### `npm start`


=======
# projet-BAO
token-BAO

